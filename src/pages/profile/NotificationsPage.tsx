import { useMemo, useState } from "react";

type NotificationItem = {
  id: string;
  title: string;
  timeLabel: string;
  unread: boolean;
};

const INITIAL: NotificationItem[] = [
  {
    id: "n1",
    title: "Ваши эскизы готовы! ИИ сгенерировал 5 свежих апсайкл-концепций.",
    timeLabel: "сегодня · 09:42",
    unread: true,
  },
  {
    id: "n2",
    title: "Заказ №2048 передан мастерской — проверьте слот доставки.",
    timeLabel: "вчера · 18:10",
    unread: true,
  },
  {
    id: "n3",
    title: "Мы добавили новые фильтры каталога по материалам и цветам.",
    timeLabel: "28 апр.",
    unread: false,
  },
];

export default function NotificationsPage() {
  const [items, setItems] = useState<NotificationItem[]>(() =>
    INITIAL.map((n) => ({ ...n })),
  );

  const hasUnread = useMemo(() => items.some((n) => n.unread), [items]);

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <div className="space-y-4 px-4 py-6">
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm text-muted">
          Непрочитанные подсвечиваются мягким оливковым фоном и точкой слева — как в ТЗ для ленты.
        </p>
        <button
          type="button"
          disabled={!hasUnread}
          onClick={markAllRead}
          className="shrink-0 rounded-2xl border border-accent px-3 py-2 text-xs font-semibold text-accent transition-colors hover:bg-accent/10 disabled:cursor-not-allowed disabled:border-border disabled:text-muted disabled:hover:bg-transparent"
        >
          Прочитать все
        </button>
      </div>

      <ul className="space-y-3">
        {items.map((n) => (
          <li key={n.id}>
            <article
              className={`rounded-2xl px-4 py-4 shadow-card ring-1 ring-black/[0.04] transition-colors ${
                n.unread ? "bg-accent/[0.06]" : "bg-surface"
              }`}
            >
              <div className="flex gap-3">
                <div className="pt-1">
                  <span
                    className={`mt-1 block h-2 w-2 rounded-full ${
                      n.unread ? "bg-accent" : "bg-transparent"
                    }`}
                    aria-hidden
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-sm leading-relaxed ${
                      n.unread ? "font-semibold text-foreground" : "font-normal text-muted"
                    }`}
                  >
                    {n.title}
                  </p>
                  <p className="mt-2 text-xs text-muted">{n.timeLabel}</p>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
