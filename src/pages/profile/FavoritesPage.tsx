import { Heart, HeartCrack } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "@/context/FavoritesContext";
import { useOrder } from "@/context/OrderContext";

export default function FavoritesPage() {
  const navigate = useNavigate();
  const { favorites, removeFavorite } = useFavorites();
  const { setLineItem } = useOrder();

  const handleWantSame = (item: (typeof favorites)[number]) => {
    setLineItem({
      serviceId: item.id,
      serviceTitle: item.title,
      priceLabel: item.price,
      priceAmountKzt: item.priceAmountKzt,
      constructorSummary: item.tagline ?? null,
    });
    navigate("/delivery");
  };

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
        <HeartCrack className="h-20 w-20 text-muted opacity-35" strokeWidth={1.25} aria-hidden />
        <p className="mt-8 text-lg font-semibold text-foreground">Вы пока ничего не добавили</p>
        <p className="mt-2 max-w-sm text-sm text-muted">
          Сохраняйте понравившиеся ИИ-образы на экране результатов — они появятся здесь.
        </p>
        <button
          type="button"
          onClick={() => navigate("/catalog")}
          className="mt-8 rounded-2xl bg-accent px-6 py-3 text-sm font-semibold text-surface shadow-card transition-transform active:scale-[0.98]"
        >
          Открыть каталог
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      <p className="text-sm text-muted">
        Подборка ИИ-идей, которые вы сохранили для будущего апсайклинга.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {favorites.map((idea) => (
          <article
            key={idea.id}
            className="overflow-hidden rounded-2xl bg-surface shadow-card ring-1 ring-black/[0.04]"
          >
            <div className="relative aspect-square overflow-hidden">
              <img src={idea.image} alt="" className="h-full w-full object-cover" loading="lazy" />
              <button
                type="button"
                onClick={() => removeFavorite(idea.id)}
                className="absolute right-3 top-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-surface shadow-md transition-transform active:scale-95"
                aria-label="Убрать из избранного"
              >
                <Heart
                  className="h-6 w-6 fill-[#556B2F] text-[#556B2F]"
                  strokeWidth={2}
                  aria-hidden
                />
              </button>
            </div>
            <div className="space-y-2 p-3">
              <h2 className="text-sm font-semibold leading-snug text-foreground">{idea.title}</h2>
              <p className="text-sm font-bold text-accent">{idea.price}</p>
              <button
                type="button"
                onClick={() => handleWantSame(idea)}
                className="flex w-full items-center justify-center rounded-xl bg-accent py-2 text-xs font-semibold text-surface transition-transform active:scale-[0.98]"
              >
                Хочу так же
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
