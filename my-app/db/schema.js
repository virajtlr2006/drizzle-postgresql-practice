import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const bankTable = pgTable("bank", {
  upiid: integer().primaryKey().generatedAlwaysAsIdentity(),
  bankname : varchar().notNull(),
  email : varchar().notNull(),
  balance : integer().default(0),
  pin : integer().unique()
});