import { text, pgTable } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: text('id').notNull().primaryKey(),
  name: text('name'),
  email: text('email').notNull().unique(),
  password: text('password'),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
