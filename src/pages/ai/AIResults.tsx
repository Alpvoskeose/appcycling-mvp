import { useMemo, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

type Variant = {
  id: string;
  title: string;
  price: string;
  image: string;
};

const FALLBACK_VARIANTS: Variant[] = [
  {
    id: "look-1",
    title: "Джинсовый корсет",
    price: "14 900 ₸",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "look-2",
    title: "Куртка в стиле пэчворк",
    price: "19 500 ₸",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "look-3",
    title: "Апсайкл рубашка",
    price: "11 200 ₸",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "look-4",
    title: "Оверсайз-пиджак",
    price: "18 500 ₸",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "look-5",
    title: "Сумка из денима",
    price: "9 700 ₸",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function AIResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const generatedImage = (location.state as { generatedImage?: string } | null)?.generatedImage;

  const variants = useMemo<Variant[]>(() => {
    if (!generatedImage) return FALLBACK_VARIANTS;

    return [
      {
        id: "generated",
        title: "Ваш ИИ-дизайн",
        price: "от 18 900 ₸",
        image: generatedImage,
      },
      ...FALLBACK_VARIANTS,
    ];
  }, [generatedImage]);

  return (
    <div className="min-h-screen bg-white pb-28 text-[#212121]">
      <header className="flex items-center gap-3 px-4 pt-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#556B2F] text-white"
          aria-label="Назад"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
        </button>
        <h1 className="text-base font-bold text-[#212121]">Ваши варианты апсайклинга</h1>
      </header>

      <div className="grid grid-cols-2 gap-4 px-4 pb-10 pt-6">
        {variants.map((variant) => {
          const isSelected = selectedId === variant.id;
          return (
            <button
              key={variant.id}
              type="button"
              onClick={() => setSelectedId(variant.id)}
              className={[
                "overflow-hidden rounded-2xl border bg-white text-left shadow-sm transition-colors",
                isSelected ? "border-[#556B2F]" : "border-[#E5E5E5]",
              ].join(" ")}
            >
              <img
                src={variant.image}
                alt={variant.title}
                className="h-40 w-full rounded-xl object-cover"
                loading="lazy"
              />
              <div className="space-y-2 p-4">
                <h2 className="text-sm font-semibold text-[#212121]">{variant.title}</h2>
                <p className="text-sm font-bold text-[#556B2F]">{variant.price}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div
        className={[
          "fixed inset-x-0 bottom-0 z-20 border-t border-[#E5E5E5] bg-white px-4 py-4 transition-transform duration-300",
          selectedId ? "translate-y-0" : "translate-y-full",
        ].join(" ")}
      >
        <div className="mx-auto flex w-full max-w-md gap-3">
          <button
            type="button"
            onClick={() => navigate("/constructor")}
            className="flex-1 rounded-2xl border-2 border-[#556B2F] bg-white py-3 text-sm font-semibold text-[#556B2F]"
          >
            Редактировать
          </button>
          <button
            type="button"
            onClick={() => navigate("/delivery")}
            className="flex-1 rounded-2xl bg-[#556B2F] py-3 text-sm font-semibold text-white"
          >
            Доставить курьером
          </button>
        </div>
      </div>
    </div>
  );
}
