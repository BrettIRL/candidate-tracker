import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const ambassadors = pgTable('ambassadors', {
  id: serial('id').notNull().primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  idNumber: text('id_number').notNull().unique(),
});

export type Ambassador = typeof ambassadors.$inferSelect;
export type NewAmbassador = typeof ambassadors.$inferInsert;
