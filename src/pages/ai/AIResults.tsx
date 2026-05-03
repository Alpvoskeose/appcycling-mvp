import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "@/components/layout/AppHeader";
import { useFavorites } from "@/context/FavoritesContext";
import { useOrder } from "@/context/OrderContext";
import type { FavoriteIdea } from "@/context/favoritesTypes";

type Variant = {
  id: string;
  title: string;
  tagline: string;
  priceLabel: string;
  priceAmountKzt: number;
  image: string;
};

function variantToFavorite(v: Variant): FavoriteIdea {
  return {
    id: v.id,
    image: v.image,
    title: v.title,
    price: v.priceLabel,
    priceAmountKzt: v.priceAmountKzt,
    tagline: v.tagline,
  };
}

const VARIANTS: Variant[] = [
  {
    id: "v1",
    title: "Деним-куртка «Городской канон»",
    tagline: "Потёртости как акцент, оливковые швы и объёмные карманы.",
    priceLabel: "от 14 900 ₸",
    priceAmountKzt: 14900,
    image:
      "https://images.unsplash.com/photo-1576995853123-5a10305d93d0?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "v2",
    title: "Худи апсайкл «Туманное утро»",
    tagline: "Мягкий флис из вашего свитера + асимметричный капюшон.",
    priceLabel: "от 15 500 ₸",
    priceAmountKzt: 15500,
    image:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "v3",
    title: "Тренч второй жизни",
    tagline: "Лаконичный крой, контрастная подбортовка и пояс-молния.",
    priceLabel: "от 22 400 ₸",
    priceAmountKzt: 22400,
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "v4",
    title: "Юбка-миди из рубашек",
    tagline: "Пэчворк-панели и аккуратная юбка-трапеция без потери комфорта.",
    priceLabel: "от 11 200 ₸",
    priceAmountKzt: 11200,
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "v5",
    title: "Бомбер из рабочих курток",
    tagline: "Матовые лоскуты, металлическая фурнитура и лёгкая подкладка.",
    priceLabel: "от 18 700 ₸",
    priceAmountKzt: 18700,
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c6dae94?auto=format&fit=crop&w=900&q=80",
  },
];

export default function AIResults() {
  const navigate = useNavigate();
  const { setLineItem } = useOrder();
  const { toggleFavorite, isFavorite } = useFavorites();

  const chooseVariant = (variant: Variant) => {
    setLineItem({
      serviceId: variant.id,
      serviceTitle: variant.title,
      priceLabel: variant.priceLabel,
      priceAmountKzt: variant.priceAmountKzt,
      constructorSummary: variant.tagline,
    });
    navigate("/delivery");
  };

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <AppHeader showBack title="Результаты ИИ" />

      <div className="flex-1 px-4 pb-10 pt-4">
        <p className="text-center text-sm text-muted">
          Пять концепций апсайклинга под ваш материал. Выберите финальный образ или отредактируйте
          детали в конструкторе.
        </p>

        <ul className="mt-6 flex flex-col gap-5">
          {VARIANTS.map((variant) => {
            const saved = isFavorite(variant.id);
            return (
              <li key={variant.id}>
                <article className="overflow-hidden rounded-2xl bg-surface shadow-card ring-1 ring-black/[0.04]">
                  <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/11]">
                    <img
                      src={variant.image}
                      alt=""
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(variantToFavorite(variant));
                      }}
                      className="absolute right-3 top-3 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-surface shadow-md transition-transform active:scale-95"
                      aria-label={saved ? "Убрать из избранного" : "Добавить в избранное"}
                      aria-pressed={saved}
                    >
                      <Heart
                        className={
                          saved
                            ? "h-6 w-6 fill-[#556B2F] text-[#556B2F]"
                            : "h-6 w-6 fill-none text-[#212121]"
                        }
                        strokeWidth={2}
                        aria-hidden
                      />
                    </button>
                  </div>
                  <div className="space-y-3 p-4">
                    <div>
                      <h2 className="text-lg font-semibold text-foreground">{variant.title}</h2>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{variant.tagline}</p>
                      <p className="mt-3 text-base font-bold text-accent">{variant.priceLabel}</p>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <button
                        type="button"
                        onClick={() => chooseVariant(variant)}
                        className="flex flex-1 items-center justify-center rounded-2xl bg-accent px-4 py-3 text-center text-sm font-semibold text-surface shadow-card transition-transform active:scale-[0.98]"
                      >
                        Выбрать и оформить
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate("/constructor")}
                        className="flex flex-1 items-center justify-center rounded-2xl border-2 border-accent bg-surface px-4 py-3 text-center text-sm font-semibold text-accent transition-transform active:scale-[0.98]"
                      >
                        Редактировать
                      </button>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
