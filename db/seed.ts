import { settings } from './schema/settings';
import { db, disconnect } from '@/lib/db';

async function seed() {
  await db.insert(settings).values([
    { name: 'unsuccessful-sms', value: '' },
    { name: 'assessment-sms', value: '' },
    { name: 'shortlist-sms', value: '' },
    { name: 'successful-sms', value: '' },
    { name: 'assessment-overview', value: '' },
    { name: 'assessment-overview-video', value: '' },
    { name: 'assessment-complete', value: '' },
  ]);

  // eslint-disable-next-line no-console
  console.log('Seed Successful');

  await disconnect();
}

seed();
