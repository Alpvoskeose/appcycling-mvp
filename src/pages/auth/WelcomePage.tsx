import { Link } from "react-router-dom";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1400&q=80";

export default function WelcomePage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <img
        src={HERO_IMAGE}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/45"
        aria-hidden
      />

      <div className="relative flex flex-1 flex-col justify-between px-6 pb-12 pt-[max(3rem,env(safe-area-inset-top))]">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
            Appcycling
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-surface drop-shadow-md">
            Одежда второй жизни
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-white/90">
            Экологичная переработка и ИИ-апсайклинг — удобно, прозрачно, без лишнего мусора.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            to="/b2c-auth"
            className="flex w-full items-center justify-center rounded-2xl bg-accent px-6 py-4 text-center text-base font-semibold text-surface shadow-card transition-transform active:scale-[0.98]"
          >
            Я физическое лицо
          </Link>
          <Link
            to="/b2b-login"
            className="flex w-full items-center justify-center rounded-2xl border-2 border-accent bg-surface/10 px-6 py-4 text-center text-base font-semibold text-surface backdrop-blur-sm transition-colors hover:bg-surface/20 active:scale-[0.98]"
          >
            Я представляю компанию (B2B)
          </Link>
        </div>
      </div>
    </div>
  );
}
