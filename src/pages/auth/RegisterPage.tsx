import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, User } from "lucide-react";
import { AppHeader } from "@/components/layout/AppHeader";
import { useApp } from "@/context/AppContext";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { registerUser, currentUser } = useApp();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser.email) {
      navigate("/catalog", { replace: true });
    }
  }, [currentUser.email, navigate]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Пожалуйста, заполните все поля");
      setLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Пожалуйста, введите корректный email");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Пароль должен быть не менее 8 символов");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      setLoading(false);
      return;
    }

    // Регистрируем пользователя
    const result = registerUser(name, email, password);
    setLoading(false);

    if (result.success) {
      navigate("/catalog");
    } else {
      setError(result.error || "Ошибка при регистрации");
    }
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  className="w-full rounded-2xl border border-border bg-surface py-3.5 pl-12 pr-4 text-foreground shadow-card outline-none transition-colors placeholder:text-muted focus:border-accent disabled:opacity-50"
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="w-full rounded-2xl border border-border bg-surface py-3.5 pl-12 pr-4 text-foreground shadow-card outline-none transition-colors placeholder:text-muted focus:border-accent disabled:opacity-50"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="w-full rounded-2xl border border-border bg-surface py-3.5 pl-12 pr-4 text-foreground shadow-card outline-none transition-colors placeholder:text-muted focus:border-accent disabled:opacity-50"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-foreground">
                Подтвердите пароль
              </span>
              <div className="relative">
                <Lock
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
                  aria-hidden
                />
                <input
                  type="password"
                  name="confirmPassword"
                  autoComplete="new-password"
                  placeholder="Повторите пароль"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                  className="w-full rounded-2xl border border-border bg-surface py-3.5 pl-12 pr-4 text-foreground shadow-card outline-none transition-colors placeholder:text-muted focus:border-accent disabled:opacity-50"
                />
              </div>
            </label>
          </div>

          {error && (
            <p className="mt-4 rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded-2xl bg-accent py-4 text-base font-semibold text-surface shadow-card transition-transform active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "Регистрация..." : "Зарегистрироваться"}
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
