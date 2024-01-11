import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db, disconnect } from '@/lib/db';

async function runMigrate() {
  await migrate(db, { migrationsFolder: 'db/migrations' });

  // eslint-disable-next-line no-console
  console.log('Migration complete');

  await disconnect();
}

runMigrate();
