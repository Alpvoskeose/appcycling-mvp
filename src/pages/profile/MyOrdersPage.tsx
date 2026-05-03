import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { MOCK_ORDERS } from "@/data/mockOrders";

export default function MyOrdersPage() {
  return (
    <div className="space-y-4 px-4 py-6">
      <p className="text-sm text-muted">
        Здесь собраны апсайкл-заказы: от ИИ-превью до передачи курьеру.
      </p>

      <ul className="space-y-3">
        {MOCK_ORDERS.map((order) => (
          <li key={order.id}>
            <Link
              to={`/order-details/${order.id}`}
              className="flex items-center gap-4 rounded-2xl bg-surface p-4 shadow-card ring-1 ring-black/[0.04] transition-colors hover:bg-canvas active:scale-[0.99]"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold uppercase tracking-wide text-muted">
                  №{order.id}
                </p>
                <p className="mt-1 truncate font-semibold text-foreground">{order.title}</p>
                <p className="mt-1 truncate text-sm text-muted">{order.subtitle}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                  <span className="font-bold text-accent">{order.totalLabel}</span>
                  <span className="text-muted">·</span>
                  <span className="text-muted">{order.createdAtLabel}</span>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 shrink-0 text-muted" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
