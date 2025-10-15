'use server'

import { bankTable } from "@/db/schema"
import { db } from ".."

export const BankAction = async (data) => {
    console.log(data);

    const newUser = await db.insert(bankTable).values(data)
    console.log(newUser);
    
    return true
}