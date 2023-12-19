export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mb-5 flex items-center text-foreground">
        <h1 className="mr-5 border-r border-muted-foreground pr-5 text-2xl font-bold">
          404
        </h1>
        <h2 className="text-sm">This page could not be found.</h2>
      </div>
    </div>
  );
}
