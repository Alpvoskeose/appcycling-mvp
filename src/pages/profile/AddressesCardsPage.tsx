import { Link } from "react-router-dom";
import { MapPin, Pencil, Trash2, X } from "lucide-react";

export default function AddressesCardsPage() {
  return (
    <div className="space-y-8 px-4 py-6">
      <section aria-labelledby="addresses-heading">
        <h2
          id="addresses-heading"
          className="text-xs font-semibold uppercase tracking-wide text-muted"
        >
          Адреса доставки
        </h2>

        <div className="mt-4 space-y-3">
          <article className="flex gap-3 rounded-2xl bg-surface p-4 shadow-card ring-1 ring-black/[0.04]">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15">
              <MapPin className="h-5 w-5 text-accent" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-foreground">г. Алматы, ул. Абая 150</p>
              <p className="mt-1 text-sm text-muted">Кв. 42, подъезд 2</p>
            </div>
            <div className="flex shrink-0 gap-1">
              <button
                type="button"
                className="rounded-xl p-2 text-muted hover:bg-canvas hover:text-foreground"
                aria-label="Редактировать адрес"
              >
                <Pencil className="h-5 w-5" aria-hidden />
              </button>
              <button
                type="button"
                className="rounded-xl p-2 text-muted hover:bg-canvas hover:text-destructive"
                aria-label="Удалить адрес"
              >
                <Trash2 className="h-5 w-5" aria-hidden />
              </button>
            </div>
          </article>
        </div>

        <Link
          to="/add-address"
          className="mt-4 flex w-full items-center justify-center rounded-2xl border-2 border-dashed border-accent bg-surface px-4 py-4 text-sm font-semibold text-accent shadow-card"
        >
          + Добавить новый адрес
        </Link>
      </section>

      <section aria-labelledby="cards-heading">
        <h2 id="cards-heading" className="text-xs font-semibold uppercase tracking-wide text-muted">
          Способы оплаты
        </h2>

        <div className="mt-4 space-y-3">
          <article className="flex items-center gap-3 rounded-2xl bg-surface p-4 shadow-card ring-1 ring-black/[0.04]">
            <span className="flex h-10 w-14 shrink-0 items-center justify-center rounded-lg bg-[#1a1f71] text-[10px] font-bold tracking-wide text-white">
              VISA
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-foreground">Visa **** 4242</p>
              <p className="text-sm text-muted">05/25</p>
            </div>
            <button
              type="button"
              className="rounded-xl p-2 text-muted hover:bg-canvas hover:text-destructive"
              aria-label="Удалить карту"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </article>
        </div>

        <button
          type="button"
          className="mt-4 flex w-full items-center justify-center rounded-2xl border-2 border-foreground bg-surface px-4 py-4 text-sm font-semibold text-accent shadow-card"
        >
          + Привязать карту
        </button>
      </section>
    </div>
  );
}
