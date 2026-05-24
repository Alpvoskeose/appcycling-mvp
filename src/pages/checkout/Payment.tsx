import { useState } from "react";
import { CreditCard, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "@/components/layout/AppHeader";
import { submitOrder } from "@/api/submitOrder";
import { useOrder } from "@/context/OrderContext";
import { useApp } from "@/context/AppContext";
import type { PaymentMethod } from "@/context/orderTypes";

function formatMoneyKzt(amount: number): string {
  return `${amount.toLocaleString("ru-RU")} ₸`;
}

export default function Payment() {
  const navigate = useNavigate();
  const { order, setPaymentMethod } = useOrder();
  const { addOrder, addNotification } = useApp();

  const [method, setMethod] = useState<PaymentMethod>("card");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalLabel =
    order.priceAmountKzt != null ? formatMoneyKzt(order.priceAmountKzt) : order.priceLabel ?? "—";

  const handlePay = async () => {
    setError(null);

    if (!order.deliveryMethod) {
      setError("Сначала выберите доставку.");
      navigate("/delivery");
      return;
    }

    setLoading(true);

    const snapshot = {
      ...order,
      paymentMethod: method,
    };

    const result = await submitOrder(snapshot);
    setLoading(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setPaymentMethod(method);

    // Генерируем номер заказа
    const orderNumber = `#${Math.floor(Math.random() * 100000)}`;

    // Добавляем заказ в Context (имитация БД)
    addOrder({
      orderNumber,
      serviceTitle: order.serviceTitle ?? "Услуга",
      priceLabel: order.priceLabel ?? "—",
      priceAmountKzt: order.priceAmountKzt ?? 0,
      deliveryMethod: order.deliveryMethod ?? "courier",
      paymentMethod: method,
      status: "pending",
    });

    // Создаём уведомление о новом заказе
    const timeNow = new Date();
    const timeLabel = `${timeNow.toLocaleString("ru-RU", { hour: "2-digit", minute: "2-digit" })}`;

    addNotification({
      title: `Ваш заказ ${orderNumber} успешно оформлен и передан курьеру. Спасибо за доверие!`,
      timeLabel: `сегодня · ${timeLabel}`,
      unread: true,
    });

    // Редирект на статус
    navigate("/status");
  };

  const cardActive = method === "card";
  const codActive = method === "cash_on_delivery";

  return (
    <div className="flex min-h-screen flex-col bg-canvas pb-[calc(6rem+env(safe-area-inset-bottom))]">
      <AppHeader showBack title="Оплата" />

      <div className="flex-1 space-y-6 px-4 pb-6 pt-4">
        <section aria-label="Способ оплаты">
          <p className="text-center text-sm text-muted">
            Выберите способ оплаты. После подтверждения мы отправим сводку заказа в Telegram.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setMethod("card")}
              className={[
                "flex flex-col gap-3 rounded-2xl bg-surface p-5 text-left shadow-card ring-2 transition-colors",
                cardActive ? "ring-accent" : "ring-border hover:ring-accent/40",
              ].join(" ")}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-canvas">
                <CreditCard className="h-7 w-7 text-accent" strokeWidth={2} aria-hidden />
              </span>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Карта</h2>
                <p className="mt-1 text-sm text-muted">Безопасная онлайн-оплата картой.</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setMethod("cash_on_delivery")}
              className={[
                "flex flex-col gap-3 rounded-2xl bg-surface p-5 text-left shadow-card ring-2 transition-colors",
                codActive ? "ring-accent" : "ring-border hover:ring-accent/40",
              ].join(" ")}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-canvas">
                <Wallet className="h-7 w-7 text-accent" strokeWidth={2} aria-hidden />
              </span>
              <div>
                <h2 className="text-lg font-semibold text-foreground">При получении</h2>
                <p className="mt-1 text-sm text-muted">Оплатите курьеру или в пункте выдачи.</p>
              </div>
            </button>
          </div>
        </section>

        <section
          className="rounded-2xl bg-surface p-6 text-center shadow-card ring-1 ring-black/[0.04]"
          aria-label="Итого"
        >
          <p className="text-sm font-medium text-muted">Итоговая сумма</p>
          <p className="mt-3 text-3xl font-bold text-accent">{totalLabel}</p>
          <p className="mt-2 text-xs text-muted">
            В MVP сумма берётся из контекста заказа (услуга или конструктор).
          </p>
        </section>

        {error ? (
          <p className="rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        ) : null}
      </div>

      <div className="fixed inset-x-0 bottom-0 border-t border-border bg-surface px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
        <button
          type="button"
          disabled={loading}
          onClick={handlePay}
          className="flex w-full items-center justify-center rounded-2xl bg-accent px-6 py-4 text-base font-semibold text-surface shadow-card transition-transform enabled:active:scale-[0.98] disabled:opacity-60"
        >
          {loading ? "Отправляем заказ..." : "Оплатить и подтвердить заказ"}
        </button>
      </div>
    </div>
  );
}
