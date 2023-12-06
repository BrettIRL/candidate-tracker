import { serial, text, pgTable } from 'drizzle-orm/pg-core';

export const addresses = pgTable('addresses', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  address1: text('address_1').notNull(),
  address2: text('address_2'),
  city: text('city').notNull(),
  province: text('province').notNull(),
  postalCode: text('postal_code').notNull(),
  contactName: text('contact_name').notNull(),
  contactSurname: text('contact_surname').notNull(),
  contactEmail: text('contact_email').notNull(),
  contactPhone: text('contact_phone'),
});

export type Address = typeof addresses.$inferSelect;
export type NewAddress = typeof addresses.$inferInsert;
