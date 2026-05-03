import { useNavigate } from "react-router-dom";

const SERVICES = [
  {
    title: "Ремонт",
    description: "Замена молний, заплатки и аккуратный ремонт любимых вещей без потери характера.",
    image:
      "https://images.unsplash.com/photo-1558171813-4c088753af8f?auto=format&fit=crop&w=900&q=80",
    alt: "Работа с денимом и инструментами портного",
  },
  {
    title: "Перешив",
    description: "Новый крой из вашего материала: фасоны, которые сядут по фигуре и актуальным трендам.",
    image:
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&w=900&q=80",
    alt: "Швейная машина и изделия из текстиля",
  },
  {
    title: "Кастомизация",
    description: "Окраска, принты, вышивка и фурнитура — чтобы вещь стала по-настоящему вашей.",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80",
    alt: "Яркий текстиль и аксессуары для творческого апсайклинга",
  },
] as const;

export default function Catalog() {
  const navigate = useNavigate();

  return (
    <div className="px-4 py-6">
      <p className="text-sm leading-relaxed text-muted">
        Выберите базовую услугу — мы подключим ИИ-подбор стиля и материалов на следующих шагах.
      </p>

      <section className="mt-6 space-y-4" aria-label="Услуги каталога">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {SERVICES.map(({ title, description, image, alt }) => (
            <article
              key={title}
              className="overflow-hidden rounded-2xl bg-surface shadow-card ring-1 ring-black/[0.04]"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={image} alt={alt} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="space-y-2 p-4">
                <h2 className="text-lg font-semibold text-foreground">{title}</h2>
                <p className="text-sm leading-relaxed text-muted">{description}</p>
                <button
                  type="button"
                  onClick={() => navigate("/ai-camera")}
                  className="mt-3 w-full rounded-2xl bg-accent py-3 text-sm font-semibold text-surface shadow-card transition-transform active:scale-[0.98]"
                >
                  Узнать подробнее
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
