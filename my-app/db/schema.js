import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const bankTable = pgTable("bank", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  upiid: varchar().notNull(),
  bankname : varchar().notNull(),
  email : varchar().notNull(),
  balance : integer().default(0),
  pin : integer().unique()
});