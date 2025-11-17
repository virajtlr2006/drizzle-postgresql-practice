'use server'

import { bankTable } from "@/db/schema"
import { db } from ".."
import { eq } from "drizzle-orm";

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
export const PayAction = async (supiid, rupiid, amount, pin) => {
    // console.log(id)

    const pay = await db.select().from(bankTable).where(eq(bankTable.upiid, supiid)) //User searched in table using upiid
    console.log(pay[0].pin)
    // Balance Checked
    if (amount > pay[0].balance) throw new Error("Balance Insufficient");
    // Balance Updated
    const newbalance = pay[0].balance - amount
    // console.log(newbalance);
    const updatedbalance = await db.update(bankTable).set({ balance: newbalance }).where(eq(bankTable.upiid, supiid));
    // console.log(newbalance)

    if (pin != pay[0].pin) throw new Error("Pin Incorrect");//For incoorect PIN


    // Reciever's end
    try {
        // Find reciever using upiid inserted by a sender
        const recieve = await db.select().from(bankTable).where(eq(bankTable.upiid, rupiid))
        // console.log(recieve);
        // console.log(recieve[0].balance)

        // Balance updated
        const nbalance = recieve[0].balance + Number(amount)
        // console.log(Number(recieve[0].balance) + Number(amount))
        const ubalance = await db.update(bankTable).set({ balance: nbalance }).where(eq(bankTable.upiid, rupiid));
        // console.log(ubalance);
    } catch (error) {
        throw new Error("Incorrect UpiID"); //Throw error if UpiID is incoorect
    }
    return
}

