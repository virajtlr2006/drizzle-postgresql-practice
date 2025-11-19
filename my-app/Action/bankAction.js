'use server'

import { bankTable, TransactionTable } from "@/db/schema"
import { db } from ".."
import { eq, or } from "drizzle-orm";

// Display all bank accounts of a user 
export const userallAccountAction = async (email) => {
    // console.log(email)
    const useraccounts = await db.select().from(bankTable).where(eq(bankTable.email, email))
    // console.log(useraccounts);
    return useraccounts
}

// Single Account
export const singleAccountAction = async (id) => {
    // console.log("124",id)
    if (!id) return [];

    const single = await db.select().from(bankTable).where(eq(bankTable.id, id))

    // console.log(single[0])
    return single[0]
}

// Create bank User
export const BankAction = async (data) => {

    // console.log(data);

    const newUser = await db.insert(bankTable).values(data)
    // console.log(newUser);

    return true
}

// Payment
// Required things taken in params
export const PayAction = async (supiid, rupiid, amount, pin,date) => {
    console.log("BAckend ",supiid, rupiid, amount, pin,date)

    const pay = await db.select().from(bankTable).where(eq(bankTable.upiid, supiid)) //User searched in table using upiid
    console.log(pay)
    
    // Verify PIN first
    if (pin != pay[0].pin) throw new Error("Pin Incorrect");//For incoorect PIN
    
    // Balance Checked
    if (amount > pay[0].balance) throw new Error("Balance Insufficient");
    
    // Verify receiver exists before processing
    try {
        const recieve = await db.select().from(bankTable).where(eq(bankTable.upiid, rupiid))
        if (recieve.length === 0) throw new Error("Receiver not found");
    } catch (error) {
        throw new Error("Incorrect UpiID"); //Throw error if UpiID is incoorect
    }
    
    // Balance Updated for sender
    const newbalance = pay[0].balance - amount
    const updatedbalance = await db.update(bankTable).set({ balance: newbalance }).where(eq(bankTable.upiid, supiid));

    // Receiver's end - update balance
    const recieve = await db.select().from(bankTable).where(eq(bankTable.upiid, rupiid))
    const nbalance = recieve[0].balance + Number(amount)
    const ubalance = await db.update(bankTable).set({ balance: nbalance }).where(eq(bankTable.upiid, rupiid));
    
    // Create ONLY ONE transaction record (not separate debit/credit)
    const newTransaction = await db.insert(TransactionTable).values({
        reciverupiid: rupiid,
        senderupiid: supiid,
        amount: amount,
        type: "Transfer", // Generic type, the display logic will determine debit/credit
        date: date
    })
    
    return true
}

// Get all transactions for a user (both sent and received)
export const getUserTransactionsAction = async (email) => {
    if (!email) return [];
    
    try {
        // First, get all UPI IDs for this user's email
        const userAccounts = await db.select().from(bankTable).where(eq(bankTable.email, email));
        
        if (userAccounts.length === 0) return [];
        
        // Extract all UPI IDs for this user
        const userUpiIds = userAccounts.map(account => account.upiid);
        
        // Get all transactions where user is either sender or receiver
        const transactions = await db
            .select({
                id: TransactionTable.id,
                receiver_upiid: TransactionTable.reciverupiid,
                sender_upiid: TransactionTable.senderupiid,
                amount: TransactionTable.amount,
                type: TransactionTable.type,
                date: TransactionTable.date
            })
            .from(TransactionTable)
            .where(
                or(
                    // User is sender (any of their UPI IDs)
                    ...userUpiIds.map(upiid => eq(TransactionTable.senderupiid, upiid)),
                    // User is receiver (any of their UPI IDs)
                    ...userUpiIds.map(upiid => eq(TransactionTable.reciverupiid, upiid))
                )
            );
            
        // Just add user UPI IDs and get other party names for each transaction
        const transactionsWithDetails = await Promise.all(
            transactions.map(async (transaction) => {
                // Determine other party UPI ID
                let otherPartyUpiId;
                if (userUpiIds.includes(transaction.sender_upiid)) {
                    otherPartyUpiId = transaction.receiver_upiid;
                } else {
                    otherPartyUpiId = transaction.sender_upiid;
                }
                
                // Get other party's bank details
                const otherPartyAccount = await db
                    .select()
                    .from(bankTable)
                    .where(eq(bankTable.upiid, otherPartyUpiId));
                
                return {
                    ...transaction,
                    userUpiIds, // Send user's UPI IDs to frontend
                    otherPartyName: otherPartyAccount[0]?.bankname || 'Unknown',
                    otherPartyUpiId
                };
            })
        );
        
        // Sort by date (newest first)
        return transactionsWithDetails.sort((a, b) => new Date(b.date) - new Date(a.date));
        
    } catch (error) {
        console.error('Error fetching user transactions:', error);
        return [];
    }
};