import { DashboardHeader } from '@/components/dashboard-header';
import { PageEditor } from '@/components/page-editor';
import { Separator } from '@/components/ui/separator';
import { VideoUrlInput } from '@/components/video-url-input';
import { getSettings } from '@/db/repositories/settings';

export default async function AssessmentSettingsPage() {
  const settings = (await getSettings()) || {};

  return (
    <div className="grid items-start gap-8 px-[1px] lg:max-w-2xl">
      <DashboardHeader
        heading="Assessment"
        text="Settings related to candidate assessment"
      />
      <Separator />
      <div>
        <h3 className="text-lg font-medium">Overview Video</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Video displayed at the bottom of the overview page
        </p>
        <VideoUrlInput
          name="assessment-overview-video"
          value={settings['assessment-overview-video']}
        />
      </div>
      <div>
        <h3 className="text-lg font-medium">Overview Page</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Role overview shown to all candidates prior to pre-screening questions
        </p>
        <PageEditor
          name="assessment-overview"
          value={settings['assessment-overview']}
        />
      </div>
      <div>
        <h3 className="text-lg font-medium">Complete Page</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Shown to all candidates at the end of the assessment
        </p>
        <PageEditor
          name="assessment-complete"
          value={settings['assessment-complete']}
        />
      </div>
    </div>
  );
}
