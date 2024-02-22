'use server';

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
    return { success: false, error };
  }
}
