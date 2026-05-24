import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";

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
        checked ? "bg-[#556B2F]" : "bg-[#E0E0E0]"
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
  const navigate = useNavigate();
  const { settings, updateSettings, logout } = useApp();

  const handlePushChange = (checked: boolean) => {
    updateSettings({ pushNotifications: checked });
  };

  const handleEmailChange = (checked: boolean) => {
    updateSettings({ emailNotifications: checked });
  };

  const handleSmsChange = (checked: boolean) => {
    updateSettings({ smsNotifications: checked });
  };

  const handleDarkThemeChange = (checked: boolean) => {
    updateSettings({ darkTheme: checked });
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="space-y-8 px-4 py-6">
      <section aria-labelledby="notif-heading">
        <h2 id="notif-heading" className="text-xs font-semibold uppercase tracking-wide text-muted">
          Уведомления
        </h2>
        <div className="mt-4 divide-y divide-border rounded-2xl bg-surface shadow-card ring-1 ring-black/[0.04]">
          <div className="flex items-center justify-between gap-4 px-4 py-4">
            <span className="text-sm font-medium text-foreground">Push-уведомления</span>
            <Toggle
              checked={settings.pushNotifications}
              onChange={handlePushChange}
            />
          </div>
          <div className="flex items-center justify-between gap-4 px-4 py-4">
            <span className="text-sm font-medium text-foreground">Email</span>
            <Toggle
              checked={settings.emailNotifications}
              onChange={handleEmailChange}
            />
          </div>
          <div className="flex items-center justify-between gap-4 px-4 py-4">
            <span className="text-sm font-medium text-foreground">SMS</span>
            <Toggle
              checked={settings.smsNotifications}
              onChange={handleSmsChange}
            />
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
            <Toggle
              checked={settings.darkTheme}
              onChange={handleDarkThemeChange}
            />
          </div>
          <p className="mt-3 text-xs text-muted">
            Активируйте тёмную тему для более комфортного использования ночью. Изменение применяется сразу.
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
            className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left hover:bg-canvas transition-colors"
          >
            <span className="text-sm font-medium text-foreground">Язык приложения</span>
            <span className="inline-flex items-center gap-2 text-sm text-muted">
              Русский
              <ChevronRight className="h-5 w-5 text-muted" aria-hidden />
            </span>
          </button>
          <button
            type="button"
            className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left hover:bg-canvas transition-colors"
          >
            <span className="text-sm font-medium text-foreground">Политика конфиденциальности</span>
            <ChevronRight className="h-5 w-5 text-muted" aria-hidden />
          </button>
          <button
            type="button"
            className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left hover:bg-canvas transition-colors"
          >
            <span className="text-sm font-medium text-foreground">Оценить приложение</span>
            <ChevronRight className="h-5 w-5 text-muted" aria-hidden />
          </button>
        </div>
      </section>

      <section className="space-y-3 pb-6">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full rounded-2xl py-3 text-center text-sm font-medium text-muted hover:bg-surface transition-colors"
        >
          Выйти из аккаунта
        </button>
        <button
          type="button"
          className="w-full rounded-2xl py-3 text-center text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
        >
          Удалить аккаунт
        </button>
      </section>
    </div>
  );
}