import { integer, pgTable, varchar, sql, date } from "drizzle-orm/pg-core";

export const bankTable = pgTable("bank", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  upiid: varchar("upiid").notNull(),
  bankname: varchar("bankname").notNull(),
  email: varchar("email").notNull(),
  balance: integer("balance").default(0),
  pin: integer("pin").unique(),
  type: varchar("type").default("Savings"),
});

export const TransactionTable = pgTable("transaction", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  reciverupiid: varchar("receiver_upiid").notNull(),
  senderupiid: varchar("sender_upiid").notNull(),
  amount: integer("amount").default(0),
  type: varchar("type").default("Credit"),
  date: date()
});