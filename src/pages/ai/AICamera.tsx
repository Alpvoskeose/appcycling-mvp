import { useEffect, useState } from "react";
import { ChevronLeft, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AICamera() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!isProcessing) return undefined;

    const id = window.setTimeout(() => {
      navigate("/ai-results", { replace: true });
    }, 3000);

    return () => window.clearTimeout(id);
  }, [isProcessing, navigate]);

  const handleShutter = () => {
    if (isProcessing) return;
    setIsProcessing(true);
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-black text-white">
      <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
          aria-label="Назад"
        >
          <ChevronLeft className="h-7 w-7" strokeWidth={2} />
        </button>

        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white/80 backdrop-blur-md">
          ИИ-камера
        </span>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
          aria-label="Вспышка"
        >
          <Zap className="h-6 w-6" strokeWidth={2} />
        </button>
      </header>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0f0a] via-[#0b0d0a] to-black" />

        <div className="relative z-10 flex h-64 w-64 items-center justify-center">
          <div className="absolute inset-0 rounded-3xl border border-white/20" />
          <div className="absolute inset-4 rounded-2xl border border-white/10" />
          <div className="absolute inset-8 rounded-xl border border-white/10" />

          <span className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-white/70" />
          <span className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-white/70" />
          <span className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-white/70" />
          <span className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-white/70" />

          <div className="absolute h-10 w-10 rounded-full border border-white/20" />
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-32 flex justify-center gap-3 opacity-70">
          <span className="h-1 w-16 rounded-full bg-white/35" />
          <span className="h-1 w-10 rounded-full bg-white/20" />
          <span className="h-1 w-10 rounded-full bg-white/20" />
        </div>

        <div className="absolute inset-x-0 bottom-[max(2rem,env(safe-area-inset-bottom))] flex flex-col items-center gap-5">
          <p className="max-w-xs text-center text-xs leading-relaxed text-white/60">
            Наведите камеру на вещь — ИИ подберет апсайкл-идеи под ткань и фасон.
          </p>
          <button
            type="button"
            onClick={handleShutter}
            className="relative flex h-[4.75rem] w-[4.75rem] items-center justify-center rounded-full border-[6px] border-white/85 bg-white/10 shadow-[0_0_0_8px_rgba(255,255,255,0.08)] transition-transform active:scale-95"
            aria-label="Спуск затвора"
          >
            <span className="h-[3.2rem] w-[3.2rem] rounded-full bg-white shadow-inner" />
          </button>
        </div>
      </div>

      {isProcessing ? (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 px-6 backdrop-blur-md">
          <div className="flex flex-col items-center gap-6 text-center">
            <div
              className="h-14 w-14 animate-spin rounded-full border-[3px] border-white/20 border-t-white"
              aria-hidden
            />
            <p className="text-lg font-semibold text-white">
              ИИ анализирует ткань и фасон...
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
