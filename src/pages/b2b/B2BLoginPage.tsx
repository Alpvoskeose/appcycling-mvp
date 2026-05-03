import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Lock, Mail } from "lucide-react";

export default function B2BLoginPage() {
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/b2b-portal");
  };

  return (
    <div className="min-h-screen bg-canvas px-6 pb-10 pt-[max(2rem,env(safe-area-inset-top))]">
      <div className="mx-auto flex w-full max-w-md flex-col">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
            <Building2 className="h-4 w-4" aria-hidden />
            Корпоративный вход
          </div>
          <h1 className="mt-4 text-3xl font-bold text-foreground">Appcycling B2B</h1>
          <p className="mt-2 text-sm text-muted">
            MVP-демо: без реальной авторизации — форма ведёт сразу в портал для презентации.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-foreground">Корпоративная почта</span>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
              <input
                type="email"
                placeholder="partner@company.kz"
                className="w-full rounded-2xl border border-border bg-surface py-3.5 pl-12 pr-4 text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-foreground">Пароль</span>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-2xl border border-border bg-surface py-3.5 pl-12 pr-4 text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
              />
            </div>
          </label>

          <button
            type="submit"
            className="mt-6 w-full rounded-2xl bg-accent py-4 text-base font-semibold text-surface shadow-card transition-transform active:scale-[0.98]"
          >
            Войти в портал
          </button>
        </form>
      </div>
    </div>
  );
}
