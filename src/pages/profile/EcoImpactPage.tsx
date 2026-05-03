import { Share2 } from "lucide-react";

export default function EcoImpactPage() {
  return (
    <div className="space-y-6 px-4 py-6">
      <section className="overflow-hidden rounded-2xl bg-gradient-to-br from-accent/25 via-surface to-canvas p-6 shadow-card ring-1 ring-black/[0.04]">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent">
          Эко-геймификация
        </p>
        <h1 className="mt-2 text-2xl font-bold text-foreground">Ваш вклад в цикл второй жизни</h1>
        <p className="mt-2 text-sm text-muted">
          Каждый апсайкл заказ экономит ресурсы и сокращает выбросы по сравнению с покупкой нового.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-surface/90 p-4 shadow-inner ring-1 ring-black/[0.05] backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              Текстиль спасено
            </p>
            <p className="mt-2 text-3xl font-bold text-accent">12.5 кг</p>
          </div>
          <div className="rounded-2xl bg-surface/90 p-4 shadow-inner ring-1 ring-black/[0.05] backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              Вода сэкономлена
            </p>
            <p className="mt-2 text-3xl font-bold text-accent">4500 л</p>
          </div>
        </div>

        <button
          type="button"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-accent bg-surface px-4 py-3 text-sm font-semibold text-accent shadow-card transition-transform active:scale-[0.98] sm:w-auto"
        >
          <Share2 className="h-5 w-5" aria-hidden />
          Поделиться вкладом
        </button>
      </section>

      <section className="rounded-2xl bg-surface p-6 shadow-card ring-1 ring-black/[0.04]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-foreground">Путь к эко-бейджу</p>
            <p className="mt-1 text-sm text-muted">8 из 10 заказов до следующего уровня</p>
          </div>
          <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-bold text-accent">
            80%
          </span>
        </div>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-border">
          <div className="h-full w-4/5 rounded-full bg-accent" />
        </div>
      </section>
    </div>
  );
}
