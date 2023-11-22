import { eq, getTableColumns } from 'drizzle-orm';
import { users } from '@/db/schema/users';
import type { User, NewUser, SafeUser } from '@/db/schema/users';
import { db } from '@/lib/db';

export async function deleteUser(id: string) {
  return db.delete(users).where(eq(users.id, id));
}

export async function getUsers(): Promise<SafeUser[]> {
  const { password, ...rest } = getTableColumns(users);
  return db.select({ ...rest }).from(users);
}

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

export async function updateUser(id: string, data: Partial<User>) {
  const { password, ...rest } = getTableColumns(users);
  return db
    .update(users)
    .set({ ...data })
    .where(eq(users.id, id))
    .returning({
      ...rest,
    });
}
