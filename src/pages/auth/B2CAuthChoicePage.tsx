import { Link } from "react-router-dom";
import { AppHeader } from "@/components/layout/AppHeader";

export default function B2CAuthChoicePage() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <AppHeader showBack title="Для клиентов" />

      <div className="flex flex-1 flex-col px-6 pb-10 pt-8">
        <p className="text-center text-sm text-muted">
          Войдите в аккаунт или создайте новый, чтобы заказывать апсайкл и следить за
          заказами.
        </p>

        <div className="mt-10 flex flex-1 flex-col justify-center gap-3">
          <Link
            to="/login"
            className="flex w-full items-center justify-center rounded-2xl bg-accent px-6 py-4 text-center text-base font-semibold text-surface shadow-card transition-transform active:scale-[0.98]"
          >
            Войти
          </Link>
          <Link
            to="/register"
            className="flex w-full items-center justify-center rounded-2xl border-2 border-accent bg-surface px-6 py-4 text-center text-base font-semibold text-accent shadow-card transition-transform active:scale-[0.98]"
          >
            Создать аккаунт
          </Link>
        </div>
      </div>
    </div>
  );
}
