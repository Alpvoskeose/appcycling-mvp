import { useRef, useState } from "react";
import { Heart, Loader2, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "@/context/FavoritesContext";

interface Product {
  id: string;
  title: string;
  price: string;
  priceAmountKzt: number;
  image: string;
}

const PRODUCTS: Product[] = [
  {
    id: "denim-jacket",
    title: "Кастомная джинсовка",
    price: "12 500 ₸",
    priceAmountKzt: 12500,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "tailored-blazer",
    title: "Перешитый пиджак",
    price: "15 000 ₸",
    priceAmountKzt: 15000,
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "upcycle-shirt",
    title: "Апсайкл рубашка",
    price: "10 000 ₸",
    priceAmountKzt: 10000,
    image:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "denim-bag",
    title: "Сумка из денима",
    price: "8 900 ₸",
    priceAmountKzt: 8900,
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800",
  },
];

export default function Catalog() {
  const { toggleFavorite, isFavorite } = useFavorites();
  
  // Ссылки и стейты для ИИ-камеры
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite({
      id: product.id,
      title: product.title,
      price: product.price,
      priceAmountKzt: product.priceAmountKzt,
      image: product.image,
    });
  };

  // Обработчик получения фото с системной камеры
  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsAiLoading(true); // Включаем черный экран загрузки

      // Имитация загрузки и обработки ИИ (3 секунды)
      setTimeout(() => {
        setIsAiLoading(false);
        navigate("/ai-results"); // Редирект на результаты
      }, 3000);
    }
  };

  return (
    <div className="relative px-4 py-6 min-h-screen">
      <p className="text-sm leading-relaxed text-muted">
        Каталог апсайкл-товаров. Сохраняйте понравившиеся вещи в избранное и трансформируйте их с помощью ИИ.
      </p>

      <section className="mt-6 pb-24" aria-label="Каталог апсайкл-товаров">
        <div className="grid grid-cols-2 gap-4">
          {PRODUCTS.map((product) => {
            const isFav = isFavorite(product.id);
            return (
              <article
                key={product.id}
                className="overflow-hidden rounded-2xl bg-surface shadow-card ring-1 ring-black/[0.04]"
              >
                <div className="relative overflow-hidden bg-canvas">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-48 w-full rounded-t-2xl object-cover"
                    loading="lazy"
                  />
                  <button
                    type="button"
                    onClick={(e) => handleFavoriteClick(e, product)}
                    className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-surface shadow-md transition-transform active:scale-95 hover:brightness-110"
                    aria-label={isFav ? "Убрать из избранного" : "Добавить в избранное"}
                  >
                    <Heart
                      className="h-6 w-6 transition-colors"
                      strokeWidth={2}
                      fill={isFav ? "#556B2F" : "none"}
                      color={isFav ? "#556B2F" : "#212121"}
                      aria-hidden
                    />
                  </button>
                </div>
                <div className="space-y-2 p-3">
                  <h2 className="line-clamp-2 text-sm font-semibold text-foreground">
                    {product.title}
                  </h2>
                  <p className="text-sm font-bold text-[#556B2F]">{product.price}</p>
                  <button
                    type="button"
                    onClick={() => navigate("/delivery")}
                    className="flex w-full items-center justify-center rounded-xl bg-[#556B2F] py-2 text-xs font-semibold text-white transition-transform active:scale-95"
                  >
                    Хочу так же
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* --- НАЧАЛО БЛОКА ИИ-КАМЕРЫ --- */}

      {/* Скрытый инпут, который вызывает нативную камеру телефона */}
      <input
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        ref={fileInputRef}
        onChange={handlePhotoCapture}
      />

      {/* Плавающая оливковая кнопка со звездочкой (теперь по центру) */}
      <button
        onClick={() => fileInputRef.current?.click()}
        className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-[#556B2F] p-4 rounded-full shadow-2xl z-40 flex items-center justify-center transition-all hover:bg-[#435525] active:scale-90"
        aria-label="Сгенерировать дизайн"
      >
        <Sparkles className="text-white w-8 h-8" />
      </button>

      {/* Полноэкранный лоадер */}
      {isAiLoading && (
        <div className="fixed inset-0 bg-black/85 z-50 flex flex-col items-center justify-center text-white backdrop-blur-sm">
          <Loader2 className="w-16 h-16 animate-spin text-[#556B2F] mb-6" />
          <h2 className="text-2xl font-bold text-center px-4">
            ИИ генерирует изображение...
            <br />
            <span className="text-sm font-normal text-gray-300 mt-2 block">
              Пожалуйста, подождите
            </span>
          </h2>
        </div>
      )}

      {/* --- КОНЕЦ БЛОКА ИИ-КАМЕРЫ --- */}
    </div>
  );
}