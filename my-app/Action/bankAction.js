'use server'

import { bankTable } from "@/db/schema"
import { db } from ".."
import { eq } from "drizzle-orm";


// Create bank User
export const BankAction = async (data) => {
    console.log(data);

    const newUser = await db.insert(bankTable).values(data)
    console.log(newUser);
    
    return true
}
