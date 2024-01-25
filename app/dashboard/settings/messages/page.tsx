import { DashboardHeader } from '@/components/dashboard-header';
import { MessageInput } from '@/components/message-input';
import { Separator } from '@/components/ui/separator';
import { getSettings } from '@/db/repositories/settings';

export default async function MessageSettingsPage() {
  const settings = (await getSettings()) || {};

  return (
    <div className="grid items-start gap-8 px-[1px] lg:max-w-2xl">
      <DashboardHeader
        heading="Message Templates"
        text="SMS message templates"
      />
      <Separator />
      <div>
        <h3 className="text-lg font-medium">Unsuccessful</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Sent to unsuccessful candidates at any stage of the process
        </p>
        <MessageInput
          name="unsuccessful-sms"
          value={settings['unsuccessful-sms']}
        />
      </div>
      <Separator />
      <div>
        <h3 className="text-lg font-medium">Assessment</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Sent to candidates moved to assessment step
        </p>
        <MessageInput
          name="assessment-sms"
          value={settings['assessment-sms']}
        />
      </div>
      <Separator />
      <div>
        <h3 className="text-lg font-medium">Shortlist</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Sent to candidates shortlisted for interviews
        </p>
        <MessageInput name="shortlist-sms" value={settings['shortlist-sms']} />
      </div>
      <Separator />
      <div>
        <h3 className="text-lg font-medium">Successful</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Sent to successful candidates moving to bridging
        </p>
        <MessageInput
          name="successful-sms"
          value={settings['successful-sms']}
        />
      </div>
    </div>
  );
}
