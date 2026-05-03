import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function AddAddressPage() {
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/addresses-cards");
  };

  return (
    <div className="px-4 py-6">
      <p className="text-sm text-muted">
        Укажите адрес для курьера — данные сохранятся локально в этом MVP-демо.
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-foreground">Город и улица</span>
          <input
            required
            name="street"
            placeholder="Например: Алматы, ул. Абая 150"
            className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-foreground">
            Квартира / подъезд / домофон
          </span>
          <input
            name="details"
            placeholder="Например: кв. 11, подъезд 3"
            className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-foreground">
            Комментарий для курьера (необязательно)
          </span>
          <textarea
            name="note"
            rows={3}
            placeholder="Подъезд со двора, позвонить за 10 минут"
            className="w-full resize-none rounded-2xl border border-border bg-surface px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent"
          />
        </label>

        <button
          type="submit"
          className="mt-4 w-full rounded-2xl bg-accent py-4 text-base font-semibold text-surface shadow-card transition-transform active:scale-[0.98]"
        >
          Сохранить адрес
        </button>
      </form>
    </div>
  );
}
