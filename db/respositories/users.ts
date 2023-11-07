import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { users } from '@/db/schema/users';
import type { User, NewUser } from '@/db/schema/users';

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);
export const db = drizzle(client);

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const user = await db.select().from(users).where(eq(users.email, email));

    if (user.length <= 0) {
      return null;
    }

    return user[0];
  } catch (error) {
    throw error;
  }
}

export async function insertUser(user: NewUser): Promise<User[]> {
  return db.insert(users).values(user).returning();
}
