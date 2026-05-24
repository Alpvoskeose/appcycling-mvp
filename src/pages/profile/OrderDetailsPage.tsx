import { Link, useParams } from "react-router-dom";
import { useApp } from "@/context/AppContext";

const STEPS = ["Принят", "В работе", "Готов", "Доставлен"] as const;

const STATUS_TO_PROGRESS: Record<string, number> = {
  pending: 0,
  in_progress: 1,
  completed: 2,
  cancelled: 0,
};

export default function OrderDetailsPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const { orders } = useApp();
  const order = orderId ? orders.find((o) => o.id === orderId) : undefined;

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  if (!order) {
    return (
      <div className="px-4 py-10 text-center">
        <p className="text-lg font-semibold text-foreground">Заказ не найден</p>
        <p className="mt-2 text-sm text-muted">
          Вернитесь к списку и выберите актуальный апсайкл-заказ.
        </p>
        <Link
          to="/my-orders"
          className="mt-6 inline-flex rounded-2xl bg-accent px-6 py-3 text-sm font-semibold text-surface shadow-card"
        >
          К заказам
        </Link>
      </div>
    );
  }

  const progressIndex = STATUS_TO_PROGRESS[order.status] || 0;

  return (
    <div className="space-y-6 px-4 py-6">
      <section className="overflow-hidden rounded-2xl bg-surface shadow-card ring-1 ring-black/[0.04]">
        <div className="aspect-[16/9] bg-gradient-to-br from-accent/25 via-canvas to-surface" />
        <div className="space-y-2 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            Заказ №{order.orderNumber}
          </p>
          <h1 className="text-xl font-bold text-foreground">{order.serviceTitle}</h1>
          <p className="text-sm text-muted">{order.deliveryMethod}</p>
          <div className="flex flex-wrap gap-3 pt-2 text-sm">
            <span className="font-bold text-accent">{order.priceLabel}</span>
            <span className="text-muted">{formatDate(order.createdAt)}</span>
          </div>
        </div>
      </section>

      <section aria-label="Статус заказа">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          Статус цепочки
        </p>
        <div className="mt-4 flex gap-2">
          {STEPS.map((label, index) => {
            const filled = index <= progressIndex;
            return (
              <div key={label} className="flex-1 space-y-2">
                <div
                  className={`h-2.5 rounded-full ${filled ? "bg-accent" : "bg-border"}`}
                  aria-hidden
                />
                <p
                  className={`text-[11px] font-semibold leading-tight sm:text-xs ${
                    filled ? "text-accent" : "text-muted"
                  }`}
                >
                  {label}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl bg-surface p-5 shadow-card ring-1 ring-black/[0.04]">
        <h2 className="text-sm font-semibold text-foreground">Что дальше</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
          <li>Мастер проверит материалы и подтвердит финальный крой.</li>
          <li>Вы получите уведомление, когда заказ перейдёт в этап «Готов».</li>
          <li>При необходимости можно изменить слот доставки через поддержку.</li>
        </ul>
      </section>
    </div>
  );
}
