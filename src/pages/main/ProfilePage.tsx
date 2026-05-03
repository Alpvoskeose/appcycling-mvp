import {
  ChevronRight,
  Heart,
  Leaf,
  MapPin,
  Package,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";

const ROW_CLASS =
  "flex items-center gap-4 rounded-2xl bg-surface px-4 py-4 shadow-card ring-1 ring-black/[0.04] transition-colors hover:bg-canvas active:scale-[0.99]";

export default function ProfilePage() {
  return (
    <div className="space-y-6 px-4 py-6">
      <section className="rounded-2xl bg-surface p-6 shadow-card ring-1 ring-black/[0.04]">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-lg font-bold text-accent">
            AC
          </div>
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold text-foreground">Алексей Клиентов</p>
            <p className="truncate text-sm text-muted">alex@appcycling.demo</p>
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
