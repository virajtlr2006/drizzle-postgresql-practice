'use server'

import { bankTable } from "@/db/schema"
import { db } from ".."
import { eq } from "drizzle-orm";

// Display all bank accounts of a user 
export const userallAccountAction = async (email) => {
    // console.log(email)
    const useraccounts = await db.select().from(bankTable).where(eq(bankTable.email,email))
    // console.log(useraccounts);
    return useraccounts
}

// Single Account
export const singleAccountAction = async (id) => {
    // console.log("124",id)
    if (!id) return [];

    const single = await db.select().from(bankTable).where(eq(bankTable.id,id))

    console.log(single)
    return single
}

// Create bank User
export const BankAction = async (data) => {

    // console.log(data);

    const newUser = await db.insert(bankTable).values(data)
    // console.log(newUser);
    
    return true
}
