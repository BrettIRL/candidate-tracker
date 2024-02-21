import AfricasTalking from 'africastalking';
import { logger } from './logger';

const client = AfricasTalking({
  apiKey: process.env.SMS_API_KEY || '',
  username: process.env.SMS_USERNAME || '',
});

const sms = client.SMS;

export async function sendSMS(
  to: string,
  template: string,
  variables: { [variable: string]: string },
) {
  const message = Object.entries(variables).reduce(
    (msg, [key, value]) => msg.replace(new RegExp(`{{${key}}}`, 'g'), value),
    template,
  );

  sms
    .send({
      to,
      message,
      from: process.env.SMS_SHORTCODE || '',
    })
    .then(() => logger.info(`Successfully sent SMS to ${to}`))
    .catch(error => logger.warn(`Failed to send SMS to ${to}: ${error}`));
}
