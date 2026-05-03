import { useState } from "react";
import { CheckCircle, Store, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "@/components/layout/AppHeader";
import { useOrder } from "@/context/OrderContext";
import type { DeliveryMethod } from "@/context/orderTypes";

const TIME_SLOTS = [
  "10:00–14:00",
  "14:00–18:00",
  "18:00–21:00",
] as const;

export default function Delivery() {
  const navigate = useNavigate();
  const { setDelivery } = useOrder();

  const [method, setMethod] = useState<DeliveryMethod>("courier");
  const [addressLine, setAddressLine] = useState("");
  const [apartmentDetails, setApartmentDetails] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState<string>(TIME_SLOTS[0]);
  const [error, setError] = useState<string | null>(null);

  const handleNext = () => {
    setError(null);

    if (method === "courier") {
      if (!addressLine.trim()) {
        setError("Укажите город и улицу для курьера.");
        return;
      }
      if (!deliveryDate.trim()) {
        setError("Выберите дату доставки.");
        return;
      }
      if (!deliveryTimeSlot.trim()) {
        setError("Выберите интервал времени.");
        return;
      }

      setDelivery({
        deliveryMethod: "courier",
        addressLine: addressLine.trim(),
        apartmentDetails: apartmentDetails.trim() || null,
        deliveryDate: deliveryDate.trim(),
        deliveryTimeSlot: deliveryTimeSlot.trim(),
      });
    } else {
      setDelivery({
        deliveryMethod: "pickup",
        addressLine: "Самовывоз со склада Appcycling",
        apartmentDetails: null,
        deliveryDate: null,
        deliveryTimeSlot: null,
      });
    }

    navigate("/payment");
  };

  const courierActive = method === "courier";
  const pickupActive = method === "pickup";

  return (
    <div className="flex min-h-screen flex-col bg-canvas pb-[calc(6rem+env(safe-area-inset-bottom))]">
      <AppHeader showBack title="Доставка" />

      <div className="flex-1 space-y-6 px-4 pb-6 pt-4">
        <section aria-label="Способ получения">
          <p className="text-center text-sm text-muted">
            Выберите способ получения заказа — мы сохраним его для оплаты и уведомления в Telegram.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setMethod("courier")}
              className={[
                "relative flex flex-col gap-4 rounded-2xl bg-surface p-5 text-left shadow-card ring-2 transition-colors",
                courierActive ? "ring-accent" : "ring-border hover:ring-accent/40",
              ].join(" ")}
            >
              {courierActive ? (
                <CheckCircle
                  className="absolute right-4 top-4 h-6 w-6 text-accent"
                  strokeWidth={2}
                  aria-hidden
                />
              ) : null}
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-canvas">
                <Truck className="h-7 w-7 text-accent" strokeWidth={2} aria-hidden />
              </span>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Курьер</h2>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  Привезём аккуратно упакованный апсайкл по указанному адресу.
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setMethod("pickup")}
              className={[
                "relative flex flex-col gap-4 rounded-2xl bg-surface p-5 text-left shadow-card ring-2 transition-colors",
                pickupActive ? "ring-accent" : "ring-border hover:ring-accent/40",
              ].join(" ")}
            >
              {pickupActive ? (
                <CheckCircle
                  className="absolute right-4 top-4 h-6 w-6 text-accent"
                  strokeWidth={2}
                  aria-hidden
                />
              ) : null}
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-canvas">
                <Store className="h-7 w-7 text-accent" strokeWidth={2} aria-hidden />
              </span>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Самовывоз</h2>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  Заберите заказ из нашего пункта выдачи без ожидания курьера.
                </p>
              </div>
            </button>
          </div>
        </section>

        {method === "courier" ? (
          <section
            className="space-y-4 rounded-2xl bg-surface p-5 shadow-card ring-1 ring-black/[0.04]"
            aria-label="Адрес и время доставки"
          >
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
              Адрес и слот
            </h3>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-foreground">
                Город и улица
              </span>
              <input
                value={addressLine}
                onChange={(e) => setAddressLine(e.target.value)}
                placeholder="Например: Алматы, ул. Абая 150"
                className="w-full rounded-2xl border border-border bg-canvas px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-foreground">
                Квартира / подъезд / домофон
              </span>
              <input
                value={apartmentDetails}
                onChange={(e) => setApartmentDetails(e.target.value)}
                placeholder="Например: кв. 12, подъезд 2"
                className="w-full rounded-2xl border border-border bg-canvas px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-foreground">Дата</span>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full rounded-2xl border border-border bg-canvas px-4 py-3 text-foreground outline-none transition-colors focus:border-accent"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-foreground">
                  Интервал времени
                </span>
                <select
                  value={deliveryTimeSlot}
                  onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                  className="w-full rounded-2xl border border-border bg-canvas px-4 py-3 text-foreground outline-none transition-colors focus:border-accent"
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </section>
        ) : null}

        {error ? (
          <p className="rounded-2xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        ) : null}
      </div>

      <div className="fixed inset-x-0 bottom-0 border-t border-border bg-surface px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
        <button
          type="button"
          onClick={handleNext}
          className="flex w-full items-center justify-center rounded-2xl bg-accent px-6 py-4 text-base font-semibold text-surface shadow-card transition-transform active:scale-[0.98]"
        >
          Далее
        </button>
      </div>
    </div>
  );
}
