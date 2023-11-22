import { Separator } from '@/components/ui/separator';

interface FormHeaderProps {
  heading: string;
  text?: string;
}

export function FormHeader({ heading, text }: FormHeaderProps) {
  return (
    <div className="space-y-6 pt-6">
      <div>
        <h3 className="pb-0.5 text-lg font-medium">{heading}</h3>
        {text && <p className="text-sm text-muted-foreground">{text}</p>}
      </div>
      <Separator />
    </div>
  );
}
