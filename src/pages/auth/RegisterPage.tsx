import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, User } from "lucide-react";
import { AppHeader } from "@/components/layout/AppHeader";

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/catalog");
  };

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <AppHeader showBack title="Регистрация" />

      <div className="flex flex-1 flex-col px-6 pb-10 pt-6">
        <form className="flex flex-1 flex-col" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-foreground">Имя</span>
              <div className="relative">
                <User
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
                  aria-hidden
                />
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Как к вам обращаться"
                  className="w-full rounded-2xl border border-border bg-surface py-3.5 pl-12 pr-4 text-foreground shadow-card outline-none transition-colors placeholder:text-muted focus:border-accent"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-foreground">
                Электронная почта
              </span>
              <div className="relative">
                <Mail
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
                  aria-hidden
                />
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-border bg-surface py-3.5 pl-12 pr-4 text-foreground shadow-card outline-none transition-colors placeholder:text-muted focus:border-accent"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-foreground">Пароль</span>
              <div className="relative">
                <Lock
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
                  aria-hidden
                />
                <input
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  placeholder="Не менее 8 символов"
                  className="w-full rounded-2xl border border-border bg-surface py-3.5 pl-12 pr-4 text-foreground shadow-card outline-none transition-colors placeholder:text-muted focus:border-accent"
                />
              </div>
            </label>
          </div>

          <button
            type="submit"
            className="mt-8 w-full rounded-2xl bg-accent py-4 text-base font-semibold text-surface shadow-card transition-transform active:scale-[0.98]"
          >
            Создать аккаунт
          </button>

          <p className="mt-auto pt-10 text-center text-sm text-muted">
            Уже есть аккаунт?{" "}
            <Link to="/login" className="font-semibold text-accent">
              Войти
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
