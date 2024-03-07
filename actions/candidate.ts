'use server';

import { getCandidatePrescreeningAnswers } from '@/db/repositories/assessments';
import {
  getUnsuccessfulCandidates,
  updateOpportunityCandidates,
} from '@/db/repositories/candidates';
import { getSetting } from '@/db/repositories/settings';
import { logger } from '@/lib/logger';
import { sendSMS } from '@/lib/sms';
import { SMSTemplate } from '@/ts/enums';

export async function fetchCandidatePrescreeningAnswers(
  candidateId: number,
  opportunityId: number,
) {
  try {
    const data = await getCandidatePrescreeningAnswers(
      candidateId,
      opportunityId,
    );
    return { success: true, data: data[0] };
  } catch (error) {
    logger.error(error);
    return { success: false };
  }
}

export async function sendUnsuccessfulSMS(opportunityId: number) {
  try {
    const candidatesToSMS = await getUnsuccessfulCandidates(opportunityId);
    const template = await getSetting(SMSTemplate.Unsuccessful);

    if (!candidatesToSMS.length || !template) {
      return;
    }

    candidatesToSMS.forEach(candidate => {
      sendSMS(candidate.candidates.phone, template, {
        name: candidate.candidates.firstName,
      });
    });

    const candidateIds = candidatesToSMS.map(
      candidate => candidate.candidates.id,
    );
    await updateOpportunityCandidates(candidateIds, opportunityId, {
      unsuccessfulSMSSentAt: new Date(),
    });

    return { success: true };
  } catch (error) {
    logger.error(error);
    return { success: false };
  }
}
