import type { FormEvent } from "react";
import { useState } from "react";
import { Briefcase, Mail, MessageCircle, Phone, Recycle, Shirt } from "lucide-react";
import { BottomSheet } from "@/components/ui/BottomSheet";

type SheetKind = "merch" | "bulk" | "materials";

const SHEETS: Record<
  SheetKind,
  { title: string; subtitle: string; Icon: typeof Shirt }
> = {
  merch: {
    title: "Заявка: корпоративный мерч",
    subtitle: "Униформа и подарочные наборы из вторичных материалов.",
    Icon: Shirt,
  },
  bulk: {
    title: "Заявка: заказ оптом",
    subtitle: "Тиражные партии апсайклинга под ваш бренд.",
    Icon: Briefcase,
  },
  materials: {
    title: "Заявка: продажа материалов",
    subtitle: "Закупка текстильных отходов и ресурс для производства.",
    Icon: Recycle,
  },
};

export default function B2BPortalPage() {
  const [active, setActive] = useState<SheetKind | null>(null);
  const [phase, setPhase] = useState<"form" | "success">("form");

  const open = (kind: SheetKind) => {
    setPhase("form");
    setActive(kind);
  };

  const close = () => {
    setActive(null);
    setPhase("form");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPhase("success");
  };

  const meta = active ? SHEETS[active] : null;

  return (
    <div className="min-h-screen bg-canvas px-4 pb-10 pt-[max(1.25rem,env(safe-area-inset-top))]">
      <header className="mx-auto max-w-lg pt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          Корпоративный хаб
        </p>
        <h1 className="mt-2 text-3xl font-bold text-foreground">Appcycling для бизнеса</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Выберите направление — откроется форма лида. После отправки покажем экран успеха с
          контактами команды (демо без backend).
        </p>
      </header>

      <div className="mx-auto mt-8 flex max-w-lg flex-col gap-4">
        {(Object.keys(SHEETS) as SheetKind[]).map((kind) => {
          const item = SHEETS[kind];
          const Icon = item.Icon;
          return (
            <button
              key={kind}
              type="button"
              onClick={() => open(kind)}
              className="flex items-start gap-4 rounded-2xl bg-surface p-6 text-left shadow-card ring-1 ring-black/[0.04] transition-transform active:scale-[0.99]"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-canvas">
                <Icon className="h-7 w-7 text-accent" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-lg font-semibold text-foreground">
                  {kind === "merch"
                    ? "Корпоративный мерч"
                    : kind === "bulk"
                      ? "Заказ оптом"
                      : "Продажа материалов"}
                </span>
                <span className="mt-2 block text-sm leading-relaxed text-muted">
                  {item.subtitle}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <BottomSheet open={Boolean(active)} title={meta?.title ?? ""} onClose={close}>
        {!meta ? null : phase === "form" ? (
          <>
            <p className="mt-2 text-sm text-muted">{meta.subtitle}</p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-foreground">
                  Название компании
                </span>
                <input
                  required
                  name="company"
                  placeholder="ТОО «Зелёная цепочка»"
                  className="w-full rounded-2xl border border-border bg-canvas px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-foreground">
                  Тираж / объём (кратко)
                </span>
                <input
                  required
                  name="volume"
                  placeholder="Например: 250 единиц / 120 кг текстиля"
                  className="w-full rounded-2xl border border-border bg-canvas px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-foreground">
                  Контактное лицо и телефон
                </span>
                <input
                  required
                  name="contacts"
                  placeholder="Алексей · +7 700 000 00 00"
                  className="w-full rounded-2xl border border-border bg-canvas px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
                />
              </label>

              <button
                type="submit"
                className="mt-2 w-full rounded-2xl bg-accent py-4 text-base font-semibold text-surface shadow-card transition-transform active:scale-[0.98]"
              >
                Отправить заявку
              </button>
            </form>
          </>
        ) : (
          <div className="pb-2 pt-2">
            <p className="text-lg font-semibold text-foreground">
              Спасибо! Наша команда свяжется с вами.
            </p>
            <p className="mt-2 text-sm text-muted">
              Это демо-экран: выберите удобный канал — в продакшене здесь будет автоматический роутинг
              лида.
            </p>

            <div className="mt-6 grid gap-3">
              <a
                href="https://t.me/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-2xl border-2 border-accent bg-surface px-4 py-3 text-sm font-semibold text-accent"
              >
                <MessageCircle className="h-5 w-5" aria-hidden />
                Telegram
              </a>
              <a
                href="mailto:b2b@appcycling.demo"
                className="flex items-center justify-center gap-2 rounded-2xl bg-accent px-4 py-3 text-sm font-semibold text-surface shadow-card"
              >
                <Mail className="h-5 w-5" aria-hidden />
                Mail
              </a>
              <a
                href="tel:+77001234567"
                className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-semibold text-foreground shadow-card"
              >
                <Phone className="h-5 w-5 text-accent" aria-hidden />
                Phone
              </a>
            </div>

            <button
              type="button"
              onClick={close}
              className="mt-6 w-full rounded-2xl py-3 text-sm font-semibold text-muted hover:text-foreground"
            >
              Закрыть
            </button>
          </div>
        )}
      </BottomSheet>
    </div>
  );
}
