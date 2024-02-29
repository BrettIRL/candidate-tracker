'use server';

import {
  changeProviderStatus,
  updateOpportunityByProviderId,
} from '@/db/repositories/opportunities';
import { Opportunity } from '@/db/schema/opportunities';
import { logger } from '@/lib/logger';

export async function getSAYOpportunityUrl(saYouthId: string) {
  const url =
    process.env.SAYOUTH_API_URL + '/opportunity?opportunityId=' + saYouthId;
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-VERSION': process.env.SAYOUTH_API_VERSION || '1.0',
        'X-API-KEY': process.env.SAYOUTH_API_KEY || '',
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    logger.error(error);
    return { success: false };
  }
}

export async function pauseSAYOpportunity(saYouthId: string, reason: string) {
  const url = process.env.SAYOUTH_API_URL + '/opportunity/pause';
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-API-VERSION': process.env.SAYOUTH_API_VERSION || '1.0',
        'X-API-KEY': process.env.SAYOUTH_API_KEY || '',
      },
      body: JSON.stringify({ opportunity_id: saYouthId, reason }),
    });

    if (!response.ok) {
      const result = await response.json();
      throw new Error(
        `Request failed with status ${response.status}. ${result.errorResponseMessage}`,
      );
    }

    await updateOpportunityByProviderId(saYouthId, {
      providerStatus: 'paused',
    });

    return { success: true };
  } catch (error) {
    logger.error(error);
    return { success: false };
  }
}

export async function resumeSAYOpportunity(
  saYouthId: string,
  closingDate: Date,
) {
  const url = process.env.SAYOUTH_API_URL + '/opportunity/resume';
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        accepts: 'application/json',
        'X-API-VERSION': process.env.SAYOUTH_API_VERSION || '1.0',
        'X-API-KEY': process.env.SAYOUTH_API_KEY || '',
      },
      body: JSON.stringify({
        opportunity_id: saYouthId,
        closing_date: closingDate.toISOString(),
      }),
    });

    if (!response.ok) {
      const result = await response.json();
      throw new Error(
        `Request failed with status ${response.status}. ${result.errorResponseMessage}`,
      );
    }

    await updateOpportunityByProviderId(saYouthId, {
      providerStatus: 'active',
      closingDate: closingDate.toISOString(),
    });

    return { success: true };
  } catch (error) {
    logger.error(error);
    return { success: false };
  }
}
