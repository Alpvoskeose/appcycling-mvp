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
  const generatedImage = (location.state as { generatedImage?: string } | null)?.generatedImage;

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
        <h1 className="text-base font-bold text-[#212121]">Результаты ИИ</h1>
      </header>

      {generatedImage ? (
        <main className="px-4 pt-6">
          <h2 className="mb-4 text-lg font-bold text-[#212121]">Ваш уникальный дизайн готов!</h2>
          <div className="overflow-hidden rounded-2xl bg-white shadow-md">
            <img
              src={generatedImage}
              alt="Сгенерированный дизайн"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </main>
      ) : (
        <main className="px-4 pt-6">
          <div className="rounded-2xl border border-[#E5E5E5] bg-[#F6F7F2] px-4 py-3">
            <p className="text-sm font-semibold text-[#556B2F]">
              Нейросеть перегружена. Выберите один из 5 готовых апсайкл-вариантов
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-6">
            {FALLBACK_VARIANTS.map((variant) => (
              <article
                key={variant.id}
                className="overflow-hidden rounded-2xl border border-[#E5E5E5] bg-white text-left shadow-sm"
              >
                <img
                  src={variant.image}
                  alt={variant.title}
                  className="h-40 w-full rounded-xl object-cover"
                  loading="lazy"
                />
                <div className="space-y-2 p-4">
                  <h3 className="text-sm font-semibold text-[#212121]">{variant.title}</h3>
                  <p className="text-sm font-bold text-[#556B2F]">{variant.price}</p>
                </div>
              </article>
            ))}
          </div>
        </main>
      )}

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-[#E5E5E5] bg-white px-4 py-4">
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
            Оформить доставку
          </button>
        </div>
      </div>
    </div>
  );
}
