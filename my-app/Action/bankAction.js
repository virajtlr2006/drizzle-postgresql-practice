'use server'

import { bankTable } from "@/db/schema"
import { db } from ".."
import { eq } from "drizzle-orm";

export const BankAction = async (data) => {
    console.log(data);

    const newUser = await db.insert(bankTable).values(data)
    console.log(newUser);
    
    return true
}

export const deleteBankAction = async (input) => {
    // console.log(upiid)
    const upiid = input.upiid;
    const deleteBankAccount = await db.delete(bankTable).where(eq(bankTable.upiid,upiid))
    // console.log(deleteBankAccount)
    return true
    
}