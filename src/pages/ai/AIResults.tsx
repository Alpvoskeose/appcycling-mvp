import { useNavigate } from "react-router-dom";

type Variant = {
  id: string;
  title: string;
  price: string;
  image: string;
};

const VARIANTS: Variant[] = [
  {
    id: "look-1",
    title: "Джинсовый корсет",
    price: "14 900 ₸",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "look-2",
    title: "Оверсайз-пиджак",
    price: "18 500 ₸",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "look-3",
    title: "Апсайкл рубашка",
    price: "11 200 ₸",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "look-4",
    title: "Сумка из денима",
    price: "9 700 ₸",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
  },
];

export default function AIResults() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-canvas pb-28">
      <div className="px-4 pt-6">
        <h1 className="text-xl font-semibold text-foreground">Ваши варианты апсайклинга</h1>
        <p className="mt-2 text-sm text-muted">
          Мы подобрали четыре свежих образа на основе вашей вещи.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 px-4 pb-10 pt-6">
        {VARIANTS.map((variant) => (
          <article
            key={variant.id}
            className="overflow-hidden rounded-2xl bg-surface shadow-card ring-1 ring-black/[0.04]"
          >
            <img
              src={variant.image}
              alt={variant.title}
              className="h-48 w-full rounded-t-2xl object-cover"
              loading="lazy"
            />
            <div className="space-y-2 p-4">
              <h2 className="text-sm font-semibold text-foreground">{variant.title}</h2>
              <p className="text-sm font-bold text-[#556B2F]">{variant.price}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-surface/95 px-4 py-4 backdrop-blur">
        <div className="mx-auto flex w-full max-w-md gap-3">
          <button
            type="button"
            onClick={() => navigate("/constructor")}
            className="flex-1 rounded-2xl border-2 border-accent bg-surface py-3 text-sm font-semibold text-accent transition-transform active:scale-[0.98]"
          >
            Редактировать
          </button>
          <button
            type="button"
            onClick={() => navigate("/delivery")}
            className="flex-1 rounded-2xl bg-[#556B2F] py-3 text-sm font-semibold text-white transition-transform active:scale-[0.98]"
          >
            Доставить курьером
          </button>
        </div>
      </div>
    </div>
  );
}
