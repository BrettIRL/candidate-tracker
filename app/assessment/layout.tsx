interface DashboardProps {
  children?: React.ReactNode;
}

export default async function AssessmentLayout({ children }: DashboardProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="container flex-1">
        <main className="grid w-full gap-12 overflow-hidden px-1 py-6 md:grid-cols-[200px_1fr]">
          {children}
        </main>
      </div>
    </div>
  );
}
