type ScreenStubProps = {
  title: string;
  pathLabel: string;
};

export function ScreenStub({ title, pathLabel }: ScreenStubProps) {
  return (
    <main className="min-h-screen bg-canvas p-6 shadow-none">
      <p className="text-xs uppercase tracking-wide text-muted">{pathLabel}</p>
      <h1 className="mt-2 text-2xl font-bold text-foreground">{title}</h1>
      <p className="mt-2 text-sm text-muted">
        Заглушка экрана — маршрут зарезервирован под Appcycling.
      </p>
    </main>
  );
}
