import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "@/context/AppContext";

export default function MyOrdersPage() {
  const { orders } = useApp();

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  return (
    <div className="space-y-4 px-4 py-6">
      <p className="text-sm text-muted">
        Здесь собраны апсайкл-заказы: от ИИ-превью до передачи курьеру.
      </p>

      {orders.length === 0 ? (
        <p className="py-8 text-center text-muted">Нет активных заказов</p>
      ) : (
        <ul className="space-y-3">
          {orders.map((order) => (
            <li key={order.id}>
              <Link
                to={`/order-details/${order.id}`}
                className="flex items-center gap-4 rounded-2xl bg-surface p-4 shadow-card ring-1 ring-black/[0.04] transition-colors hover:bg-canvas active:scale-[0.99]"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold uppercase tracking-wide text-muted">
                    №{order.orderNumber}
                  </p>
                  <p className="mt-1 truncate font-semibold text-foreground">{order.serviceTitle}</p>
                  <p className="mt-1 truncate text-sm text-muted">{order.deliveryMethod}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                    <span className="font-bold text-accent">{order.priceLabel}</span>
                    <span className="text-muted">·</span>
                    <span className="text-muted">{formatDate(order.createdAt)}</span>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 shrink-0 text-muted" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
