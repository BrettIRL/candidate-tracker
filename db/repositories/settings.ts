import { eq } from 'drizzle-orm';
import { Setting, settings } from '@/db/schema/settings';
import { db } from '@/lib/db';

export async function getSettings() {
  const allSettings = await db.select().from(settings);
  return allSettings.reduce((acc: { [key: string]: string }, setting) => {
    acc[setting.name] = setting.value;
    return acc;
  }, {});
}

export async function getSetting(name: string) {
  const setting = await db
    .select()
    .from(settings)
    .where(eq(settings.name, name));
  return setting[0]?.value || undefined;
}

export async function updateSetting(name: string, value: string) {
  return db.update(settings).set({ value }).where(eq(settings.name, name));
}
