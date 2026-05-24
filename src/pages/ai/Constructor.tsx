import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Paperclip, Palette, RotateCcw, Type } from "lucide-react";

const GENERATED_IMAGE =
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80";

const TOOLS = [
  { label: "Цвет", Icon: Palette },
  { label: "Детали", Icon: Paperclip },
  { label: "Текст", Icon: Type },
] as const;

type Phase = "capture" | "processing" | "result";

export default function Constructor() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("capture");
  const [picked, setPicked] = useState<Record<string, boolean>>({});
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  useEffect(() => {
    if (phase !== "processing") return undefined;

    const id = window.setTimeout(() => {
      setPhase("result");
    }, 3000);

    return () => window.clearTimeout(id);
  }, [phase]);

  const summary = useMemo(() => {
    const labels = TOOLS.filter((t) => picked[t.label]).map((t) => t.label);
    if (!labels.length) return "Настройки не менялись";
    return `Выбрано: ${labels.join(", ")}`;
  }, [picked]);

  const toggleTool = (label: string) => {
    setPicked((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const resetTools = () => setPicked({});

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (!file) return;
    setSelectedFileName(file.name);
    setPhase("processing");
  };

  const handleCapture = () => {
    if (phase !== "capture") return;
    setSelectedFileName("camera-shot.jpg");
    setPhase("processing");
  };

  const handleCheckout = () => {
    navigate("/delivery");
  };

  return (
    <div className="min-h-screen bg-white text-[#212121]">
      <header className="flex items-center gap-3 px-4 pt-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#556B2F] text-white"
          aria-label="Назад"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
        </button>
        <div>
          <p className="text-base font-semibold">Конструктор</p>
          <p className="text-xs text-[#757575]">ИИ-редактор вещей</p>
        </div>
      </header>

      <main className="flex min-h-[calc(100vh-5rem)] flex-col px-4 pb-24 pt-4">
        {phase !== "result" ? (
          <section className="relative flex flex-1 flex-col items-center justify-center overflow-hidden rounded-2xl bg-[#0b0f0a]">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0d120d] via-[#0b0f0a] to-black" />
            <div className="relative z-10 flex h-64 w-64 items-center justify-center">
              <div className="absolute inset-0 rounded-2xl border border-white/20" />
              <div className="absolute inset-5 rounded-2xl border border-white/10" />
              <span className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-white/70" />
              <span className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-white/70" />
              <span className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-white/70" />
              <span className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-white/70" />
              <div className="absolute h-10 w-10 rounded-full border border-white/30" />
            </div>
            <p className="relative z-10 mt-6 text-center text-xs text-white/70">
              Наведите камеру на вещь или загрузите фото
            </p>

            <div className="relative z-10 mt-6 flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={handleCapture}
                className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white/80 bg-white/10"
                aria-label="Сделать фото"
              >
                <span className="h-12 w-12 rounded-full bg-white" />
              </button>
              <label className="cursor-pointer rounded-2xl border-2 border-white/60 px-4 py-2 text-xs font-semibold text-white">
                Загрузить фото
                <input type="file" accept="image/*" className="hidden" onChange={handleSelect} />
              </label>
            </div>
          </section>
        ) : (
          <section className="flex flex-1 flex-col">
            <div className="relative w-full overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-black/[0.06]">
              <div className="aspect-[4/3] w-full">
                <img
                  src={GENERATED_IMAGE}
                  alt="Сгенерированный образ"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {selectedFileName ? (
              <p className="mt-3 text-xs text-[#757575]">Источник: {selectedFileName}</p>
            ) : null}

            <button
              type="button"
              onClick={resetTools}
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#757575]"
            >
              <RotateCcw className="h-4 w-4" strokeWidth={2} aria-hidden />
              Отменить изменения
            </button>

            <section
              className="mt-6 rounded-2xl bg-white p-4 shadow-card ring-1 ring-black/[0.04]"
              aria-label="Инструменты"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-[#757575]">
                Инструменты
              </p>
              <div className="mt-4 flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {TOOLS.map(({ label, Icon }) => {
                  const active = Boolean(picked[label]);
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => toggleTool(label)}
                      className={[
                        "flex min-w-[5.5rem] shrink-0 flex-col items-center gap-2 rounded-2xl border px-4 py-3 text-xs font-semibold transition-colors",
                        active
                          ? "border-[#556B2F] bg-[#556B2F]/10 text-[#556B2F]"
                          : "border-[#E5E5E5] bg-white text-[#212121] hover:border-[#556B2F] hover:text-[#556B2F]",
                      ].join(" ")}
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-inner ring-1 ring-black/[0.06]">
                        <Icon className="h-6 w-6 text-[#556B2F]" strokeWidth={2} aria-hidden />
                      </span>
                      {label}
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 rounded-2xl border border-[#E5E5E5] bg-white px-4 py-3 text-xs text-[#757575]">
                {summary}
              </div>
            </section>
          </section>
        )}
      </main>

      <div className="fixed inset-x-0 bottom-0 z-10 border-t border-[#E5E5E5] bg-white px-4 py-4">
        <button
          type="button"
          onClick={handleCheckout}
          disabled={phase !== "result"}
          className="flex w-full items-center justify-center rounded-2xl bg-[#556B2F] px-6 py-4 text-base font-semibold text-white transition-transform active:scale-[0.98] disabled:opacity-60"
        >
          Готово к заказу
        </button>
      </div>

      {phase === "processing" ? (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 px-6">
          <div className="flex flex-col items-center gap-6 text-center">
            <div
              className="h-14 w-14 animate-spin rounded-full border-[3px] border-white/20 border-t-white"
              aria-hidden
            />
            <p className="text-lg font-semibold text-white">
              ИИ анализирует ткань и фасон...
            </p>
            <p className="text-sm text-white/70">
              Пожалуйста, подождите несколько секунд.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
