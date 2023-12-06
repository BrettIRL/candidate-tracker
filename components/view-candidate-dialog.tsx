import { Icons } from '@/components/icons';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import type { Candidate } from '@/db/schema/candidates';

interface ViewCandidateDialogProps {
  candidate?: Candidate;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export function ViewCandidateDialog({
  candidate,
  open,
  onOpenChange,
}: ViewCandidateDialogProps) {
  //TODO: Implement opportunities candidate applied for

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full space-y-4 overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>
            {candidate?.firstName} {candidate?.lastName}
          </SheetTitle>
          <SheetDescription>
            {candidate?.age}, {candidate?.gender}, {candidate?.race}
          </SheetDescription>
        </SheetHeader>
        <Separator />
        <div className="space-y-2">
          <h4 className="flex items-center pt-4 font-medium">
            <Icons.pin className="mr-2 h-5 w-5" />
            Address
          </h4>
          <div className="pl-7 text-muted-foreground">{candidate?.suburb}</div>
          <div className="pl-7 text-muted-foreground">{candidate?.city}</div>
          <div className="pl-7 text-muted-foreground">
            {candidate?.province}
          </div>
          <div className="pl-7 text-muted-foreground">
            {candidate?.postalCode}
          </div>
          <h4 className="flex items-center pt-4 font-medium">
            <Icons.car className="mr-2 h-5 w-5" />
            License
          </h4>
          <div className="pl-7 text-muted-foreground">
            {candidate?.hasLicense ? 'Yes' : 'No'}
          </div>
          <h4 className="flex items-center pt-4 font-medium">
            <Icons.accessibility className="mr-2 h-5 w-5" />
            Disability
          </h4>
          <div className="pl-7 text-muted-foreground">
            {candidate?.disability}
          </div>
          <h4 className="flex items-center pt-4 font-medium">
            <Icons.education className="mr-2 h-5 w-5" />
            Matric
          </h4>
          <div className="pl-7 text-muted-foreground">
            {candidate?.hasMatric ? 'Yes' : 'No'}
          </div>
          <h4 className="flex items-center pt-4 font-medium">
            <Icons.education className="mr-2 h-5 w-5" />
            Tertiary Education
          </h4>
          <div className="pl-7 text-muted-foreground">
            {candidate?.tertiaryEducation || 'no'}
          </div>
          {candidate?.tertiaryName && (
            <div className="pl-7 text-muted-foreground">
              Name: {candidate?.tertiaryName}
            </div>
          )}
          {candidate?.tertiaryLevel && (
            <div className="pl-7 text-muted-foreground">
              Level: {candidate?.tertiaryLevel}
            </div>
          )}
          {candidate?.tertiaryField && (
            <div className="pl-7 text-muted-foreground">
              Field: {candidate?.tertiaryField}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
