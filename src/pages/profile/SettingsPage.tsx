import { useState } from "react";
import { ChevronRight } from "lucide-react";

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-8 w-[52px] shrink-0 items-center rounded-full transition-colors ${
        checked ? "bg-accent" : "bg-border"
      }`}
    >
      <span
        className={`inline-block h-7 w-7 rounded-full bg-surface shadow-card transition-transform ${
          checked ? "translate-x-[22px]" : "translate-x-1"
        }`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const [pushOn, setPushOn] = useState(true);
  const [emailOn, setEmailOn] = useState(false);
  const [smsOn, setSmsOn] = useState(true);
  const [darkOn, setDarkOn] = useState(false);

  return (
    <div className="space-y-8 px-4 py-6">
      <section aria-labelledby="notif-heading">
        <h2 id="notif-heading" className="text-xs font-semibold uppercase tracking-wide text-muted">
          Уведомления
        </h2>
        <div className="mt-4 divide-y divide-border rounded-2xl bg-surface shadow-card ring-1 ring-black/[0.04]">
          <div className="flex items-center justify-between gap-4 px-4 py-4">
            <span className="text-sm font-medium text-foreground">Push-уведомления</span>
            <Toggle checked={pushOn} onChange={setPushOn} />
          </div>
          <div className="flex items-center justify-between gap-4 px-4 py-4">
            <span className="text-sm font-medium text-foreground">Email</span>
            <Toggle checked={emailOn} onChange={setEmailOn} />
          </div>
          <div className="flex items-center justify-between gap-4 px-4 py-4">
            <span className="text-sm font-medium text-foreground">SMS</span>
            <Toggle checked={smsOn} onChange={setSmsOn} />
          </div>
        </div>
      </section>

      <section aria-labelledby="appearance-heading">
        <h2
          id="appearance-heading"
          className="text-xs font-semibold uppercase tracking-wide text-muted"
        >
          Внешний вид
        </h2>
        <div className="mt-4 rounded-2xl bg-surface px-4 py-4 shadow-card ring-1 ring-black/[0.04]">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-medium text-foreground">Тёмная тема</span>
            <Toggle checked={darkOn} onChange={setDarkOn} />
          </div>
          <p className="mt-3 text-xs text-muted">
            Полноценная тёмная тема для MVP пока не подключена — переключатель демонстрирует UX.
          </p>
        </div>
      </section>

      <section aria-labelledby="general-heading">
        <h2 id="general-heading" className="text-xs font-semibold uppercase tracking-wide text-muted">
          Общие
        </h2>
        <div className="mt-4 divide-y divide-border rounded-2xl bg-surface shadow-card ring-1 ring-black/[0.04]">
          <button
            type="button"
            className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left hover:bg-canvas"
          >
            <span className="text-sm font-medium text-foreground">Язык приложения</span>
            <span className="inline-flex items-center gap-2 text-sm text-muted">
              Русский
              <ChevronRight className="h-5 w-5 text-muted" aria-hidden />
            </span>
          </button>
          <button
            type="button"
            className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left hover:bg-canvas"
          >
            <span className="text-sm font-medium text-foreground">Политика конфиденциальности</span>
            <ChevronRight className="h-5 w-5 text-muted" aria-hidden />
          </button>
          <button
            type="button"
            className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left hover:bg-canvas"
          >
            <span className="text-sm font-medium text-foreground">Оценить приложение</span>
            <ChevronRight className="h-5 w-5 text-muted" aria-hidden />
          </button>
        </div>
      </section>

      <section className="space-y-3 pb-6">
        <button
          type="button"
          className="w-full rounded-2xl py-3 text-center text-sm font-medium text-muted hover:bg-surface"
        >
          Выйти из аккаунта
        </button>
        <button
          type="button"
          className="w-full rounded-2xl py-3 text-center text-sm font-medium text-red-600 hover:bg-red-50"
        >
          Удалить аккаунт
        </button>
      </section>
    </div>
  );
}
