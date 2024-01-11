import { pgTable, text } from 'drizzle-orm/pg-core';

export const settings = pgTable('settings', {
  name: text('name').notNull(),
  value: text('value').notNull(),
});

export type Setting = typeof settings.$inferSelect;
