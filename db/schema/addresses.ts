import { serial, text, pgTable } from 'drizzle-orm/pg-core';

export const addresses = pgTable('addresses', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  address1: text('address1').notNull(),
  address2: text('address2'),
  city: text('city').notNull(),
  province: text('province').notNull(),
  postalCode: text('postalCode').notNull(),
  contactName: text('contactName').notNull(),
  contactSurname: text('contactSurname').notNull(),
  contactEmail: text('contactEmail').notNull(),
  contactPhone: text('contactPhone'),
});

export type Address = typeof addresses.$inferSelect;
export type NewAddress = typeof addresses.$inferInsert;
