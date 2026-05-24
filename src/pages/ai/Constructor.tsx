import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paperclip, Palette, RotateCcw, Type } from "lucide-react";
import { AppHeader } from "@/components/layout/AppHeader";
import { useOrder } from "@/context/OrderContext";
import { useApp } from "@/context/AppContext";

const PREVIEW_IMAGE =
  "https://images.unsplash.com/photo-1576995853123-5a10305d93d0?auto=format&fit=crop&w=1200&q=80";

const TOOLS = [
  { label: "Цвет", Icon: Palette },
  { label: "Детали", Icon: Paperclip },
  { label: "Текст", Icon: Type },
] as const;

export default function Constructor() {
  const navigate = useNavigate();
  const { setLineItem } = useOrder();
  const { addOrder } = useApp();

  const [picked, setPicked] = useState<Record<string, boolean>>({});

  const summary = useMemo(() => {
    const labels = TOOLS.filter((t) => picked[t.label]).map((t) => t.label);
    if (!labels.length) return "Детали конструктора не менялись (демо)";
    return `Выбрано в конструкторе: ${labels.join(", ")}`;
  }, [picked]);

  const toggleTool = (label: string) => {
    setPicked((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const resetTools = () => setPicked({});

  const handleCheckout = () => {
    // Сохраняем заказ в глобальный стейт до оформления
    const newOrder = addOrder({
      orderNumber: `#${Math.floor(Math.random() * 100000)}`,
      serviceTitle: "ИИ-конструктор",
      priceLabel: "15 000 ₸",
      priceAmountKzt: 15000,
      deliveryMethod: "в разработке",
      paymentMethod: "card",
      status: "in_progress",
    });

    // Устанавливаем данные в контекст заказа
    setLineItem({
      serviceId: "constructor",
      serviceTitle: "ИИ-конструктор",
      priceLabel: "15 000 ₸",
      priceAmountKzt: 15000,
      constructorSummary: summary,
    });

    navigate("/delivery");
  };

  return (
    <div className="flex min-h-screen flex-col bg-canvas dark:bg-gray-900">
      <AppHeader showBack title="Конструктор" />

      <div className="flex flex-1 flex-col px-4 pb-8 pt-4">
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-surface dark:bg-gray-800 shadow-card ring-1 ring-black/[0.06]">
            <div className="aspect-[4/3] w-full">
              <img
                src={PREVIEW_IMAGE}
                alt="Превью выбранной вещи для апсайклинга"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={resetTools}
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-foreground dark:text-gray-400 dark:hover:text-gray-200"
          >
            <RotateCcw className="h-4 w-4" strokeWidth={2} aria-hidden />
            Отменить изменения
          </button>
        </div>

        <section
          className="mt-8 rounded-2xl bg-surface dark:bg-gray-800 p-4 shadow-card ring-1 ring-black/[0.04]"
          aria-label="Инструменты редактирования"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-muted dark:text-gray-400">
            Настройки образа
          </p>
          <div className="mt-4 flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {TOOLS.map(({ label, Icon }) => {
              const active = Boolean(picked[label]);
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => toggleTool(label)}
                  className={[
                    "flex min-w-[5.5rem] shrink-0 flex-col items-center gap-2 rounded-2xl border px-4 py-3 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                    active
                      ? "border-accent bg-accent/10 text-accent dark:bg-accent/20"
                      : "border-border bg-canvas text-foreground dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 hover:border-accent hover:text-accent",
                  ].join(" ")}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface dark:bg-gray-700 shadow-inner ring-1 ring-black/[0.06]">
                    <Icon className="h-6 w-6 text-accent" strokeWidth={2} aria-hidden />
                  </span>
                  {label}
                </button>
              );
            })}
          </div>
        </section>

        <button
          type="button"
          onClick={handleCheckout}
          className="mt-6 flex w-full items-center justify-center rounded-2xl bg-accent px-6 py-4 text-center text-base font-semibold text-surface shadow-card transition-transform active:scale-[0.98] hover:brightness-110"
        >
          Готово к заказу — 15 000 ₸
        </button>
      </div>
    </div>
  );
}
