import {
  ChevronRight,
  Heart,
  Leaf,
  MapPin,
  Package,
  Settings,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";

const ROW_CLASS =
  "flex items-center gap-4 rounded-2xl bg-surface px-4 py-4 shadow-card ring-1 ring-black/[0.04] transition-colors hover:bg-canvas active:scale-[0.99]";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { currentUser, logout } = useApp();

  // Инициалы пользователя или дефолтные
  const initials = currentUser.name
    ? currentUser.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "AC";

  const displayName = currentUser.name || "";
  const displayEmail = currentUser.email || "";

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="space-y-6 px-4 py-6">
      <section className="rounded-2xl bg-surface p-6 shadow-card ring-1 ring-black/[0.04]">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-lg font-bold text-accent">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold text-foreground">{displayName}</p>
            <p className="truncate text-sm text-muted">{displayEmail}</p>
          </div>
        </div>
        <Link
          to="/eco-impact"
          className="mt-5 flex items-center justify-between rounded-2xl bg-canvas px-4 py-3 text-sm font-semibold text-accent"
        >
          <span className="inline-flex items-center gap-2">
            <Leaf className="h-4 w-4" aria-hidden />
            Посмотреть эко-вклад
          </span>
          <ChevronRight className="h-5 w-5 text-muted" aria-hidden />
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="mt-4 w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-destructive shadow-card transition-transform active:scale-[0.99]"
        >
          Выйти
        </button>
      </section>

      <nav className="space-y-3" aria-label="Разделы профиля">
        <Link to="/my-orders" className={`${ROW_CLASS} block`}>
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-canvas">
            <Package className="h-6 w-6 text-accent" aria-hidden />
          </span>
          <span className="flex-1">
            <span className="block font-semibold text-foreground">Мои заказы</span>
            <span className="block text-sm text-muted">Статусы и детали апсайклинга</span>
          </span>
          <ChevronRight className="h-5 w-5 text-muted" aria-hidden />
        </Link>

        <Link to="/favorites" className={`${ROW_CLASS} block`}>
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-canvas">
            <Heart className="h-6 w-6 text-accent" aria-hidden />
          </span>
          <span className="flex-1">
            <span className="block font-semibold text-foreground">Избранное</span>
            <span className="block text-sm text-muted">ИИ-идеи и образы</span>
          </span>
          <ChevronRight className="h-5 w-5 text-muted" aria-hidden />
        </Link>

        <Link to="/addresses-cards" className={`${ROW_CLASS} block`}>
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-canvas">
            <MapPin className="h-6 w-6 text-accent" aria-hidden />
          </span>
          <span className="flex-1">
            <span className="block font-semibold text-foreground">Адреса и карты</span>
            <span className="block text-sm text-muted">Доставка и способы оплаты</span>
          </span>
          <ChevronRight className="h-5 w-5 text-muted" aria-hidden />
        </Link>

        <Link to="/settings" className={`${ROW_CLASS} block`}>
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-canvas">
            <Settings className="h-6 w-6 text-accent" aria-hidden />
          </span>
          <span className="flex-1">
            <span className="block font-semibold text-foreground">Настройки</span>
            <span className="block text-sm text-muted">Уведомления и приложение</span>
          </span>
          <ChevronRight className="h-5 w-5 text-muted" aria-hidden />
        </Link>
      </nav>
    </div>
  );
}
