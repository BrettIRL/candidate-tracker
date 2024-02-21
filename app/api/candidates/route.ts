import { NextResponse } from 'next/server';
import {
  changeStep,
  getOpportunityCandidateById,
  updateOpportunityCandidates,
} from '@/db/repositories/candidates';
import { getSetting } from '@/db/repositories/settings';
import { logger } from '@/lib/logger';
import { sendSMS } from '@/lib/sms';
import { SMSTemplate } from '@/ts/enums';

async function sendCandidateSMS(
  candidateId: number,
  opportunityId: number,
  smsType: SMSTemplate,
) {
  try {
    const candidate = await getOpportunityCandidateById(
      candidateId,
      opportunityId,
    );
    const template = await getSetting(smsType);

    if (candidate.length && template) {
      const smsData: { name: string; link?: string } = {
        name: candidate[0].candidates.firstName,
      };
      let timestamp: { [key: string]: Date } = {
        shortlistSMSSentAt: new Date(),
      };

      if (smsType === SMSTemplate.Assessment) {
        // TODO: generate full link
        smsData.link = `${opportunityId}`;
        timestamp = { assesmentSMSSentAt: new Date() };
      }

      sendSMS(candidate[0].candidates.phone, template, smsData);
      await updateOpportunityCandidates(
        [candidateId],
        opportunityId,
        timestamp,
      );
    }
  } catch (error) {
    logger.error(error);
  }
}

export async function PATCH(req: Request) {
  const { candidateId, opportunityId, step } = await req.json();

  if (!candidateId || !opportunityId || step === undefined) {
    return NextResponse.json(
      { message: 'Missing required fields' },
      { status: 400 },
    );
  }

  try {
    await changeStep(candidateId, opportunityId, step);

    if (step === 1) {
      sendCandidateSMS(candidateId, opportunityId, SMSTemplate.Assessment);
    } else if (step === 3) {
      sendCandidateSMS(candidateId, opportunityId, SMSTemplate.Shortlist);
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    logger.error(error);
    return NextResponse.json(
      { message: 'Error changing candidate step' },
      { status: 422 },
    );
  }
}
