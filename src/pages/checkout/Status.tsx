import { useMemo } from "react";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useOrder } from "@/context/OrderContext";

const STEPS = ["Принят", "В работе", "Готов", "Доставлен"] as const;

export default function Status() {
  const { resetOrder } = useOrder();

  const orderNumber = useMemo(
    () => Math.floor(1000 + Math.random() * 9000),
    [],
  );

  return (
    <div className="flex min-h-screen flex-col bg-canvas px-4 pb-[max(2rem,env(safe-area-inset-bottom))] pt-16">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center text-center">
        <CheckCircle
          className="h-28 w-28 text-emerald-600 drop-shadow-sm"
          strokeWidth={1.75}
          aria-hidden
        />

        <h1 className="mt-8 text-2xl font-bold text-foreground">Заказ принят!</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Мы уже передали данные команде и скоро свяжемся с вами для уточнения деталей апсайклинга.
        </p>

        <p className="mt-8 font-mono text-lg font-semibold tracking-wide text-foreground">
          №{orderNumber}
        </p>

        <section className="mt-10 w-full" aria-label="Статус выполнения заказа">
          <div className="flex gap-2">
            {STEPS.map((label, index) => (
              <div key={label} className="flex-1 space-y-2">
                <div
                  className={`h-2.5 rounded-full ${index === 0 ? "bg-accent" : "bg-border"}`}
                  aria-hidden
                />
                <p
                  className={`text-[11px] font-medium leading-tight sm:text-xs ${
                    index === 0 ? "text-accent" : "text-muted"
                  }`}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-auto w-full pt-14">
          <Link
            to="/home"
            onClick={() => resetOrder()}
            className="flex w-full items-center justify-center rounded-2xl border-2 border-accent bg-surface px-6 py-4 text-base font-semibold text-accent shadow-card transition-transform active:scale-[0.98]"
          >
            Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
}
