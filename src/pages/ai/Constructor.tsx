import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paperclip, Palette, RotateCcw, Type, UploadCloud } from "lucide-react";
import { AppHeader } from "@/components/layout/AppHeader";

const TOOLS = [
  { label: "Цвет", Icon: Palette },
  { label: "Детали", Icon: Paperclip },
  { label: "Текст", Icon: Type },
] as const;

type Phase = "idle" | "processing";

export default function Constructor() {
  const navigate = useNavigate();
  const [picked, setPicked] = useState<Record<string, boolean>>({});
  const [phase, setPhase] = useState<Phase>("idle");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return undefined;
    }

    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  useEffect(() => {
    if (phase !== "processing") return undefined;

    const id = window.setTimeout(() => {
      navigate("/ai-results", { replace: true });
    }, 3000);

    return () => window.clearTimeout(id);
  }, [phase, navigate]);

  const summary = useMemo(() => {
    const labels = TOOLS.filter((t) => picked[t.label]).map((t) => t.label);
    if (!labels.length) return "Настройки не менялись";
    return `Выбрано: ${labels.join(", ")}`;
  }, [picked]);

  const toggleTool = (label: string) => {
    setPicked((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const resetTools = () => setPicked({});

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleGenerate = () => {
    if (!selectedFile || phase === "processing") return;
    setPhase("processing");
  };

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <AppHeader showBack title="Конструктор" />

      <div className="flex flex-1 flex-col px-4 pb-24 pt-4">
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-surface shadow-card ring-1 ring-black/[0.06]">
            <div className="aspect-[4/3] w-full">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Загруженная вещь"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-white">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <UploadCloud className="h-7 w-7" strokeWidth={2} aria-hidden />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-foreground">
                      Загрузите фото вещи
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      Поддерживаются JPG и PNG, до 10 МБ
                    </p>
                  </div>
                  <label className="inline-flex cursor-pointer items-center justify-center rounded-2xl border-2 border-accent px-4 py-2 text-xs font-semibold text-accent transition-colors hover:bg-accent/10">
                    Выбрать фото
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                  </label>
                </div>
              )}
            </div>
          </div>

          {previewUrl ? (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-muted">
              <span>{selectedFile?.name}</span>
              <button
                type="button"
                onClick={() => setSelectedFile(null)}
                className="rounded-full border border-border px-3 py-1 text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                Удалить фото
              </button>
            </div>
          ) : null}

          <button
            type="button"
            onClick={resetTools}
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            <RotateCcw className="h-4 w-4" strokeWidth={2} aria-hidden />
            Отменить изменения
          </button>
        </div>

        <section
          className="mt-8 rounded-2xl bg-surface p-4 shadow-card ring-1 ring-black/[0.04]"
          aria-label="Инструменты редактирования"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            Настройки образа
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
                    "flex min-w-[5.5rem] shrink-0 flex-col items-center gap-2 rounded-2xl border px-4 py-3 text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                    active
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border bg-canvas text-foreground hover:border-accent hover:text-accent",
                  ].join(" ")}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface shadow-inner ring-1 ring-black/[0.06]">
                    <Icon className="h-6 w-6 text-accent" strokeWidth={2} aria-hidden />
                  </span>
                  {label}
                </button>
              );
            })}
          </div>
        </section>

        <div className="mt-4 rounded-2xl border border-border bg-surface px-4 py-3 text-xs text-muted">
          {summary}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-10 border-t border-border bg-surface/95 px-4 py-4 backdrop-blur">
        <button
          type="button"
          onClick={handleGenerate}
          disabled={!selectedFile || phase === "processing"}
          className="flex w-full items-center justify-center rounded-2xl bg-accent px-6 py-4 text-center text-base font-semibold text-surface shadow-card transition-transform active:scale-[0.98] disabled:opacity-60"
        >
          Запустить ИИ-генерацию
        </button>
      </div>

      {phase === "processing" ? (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 px-6 backdrop-blur-md">
          <div className="flex flex-col items-center gap-6 text-center">
            <div
              className="h-14 w-14 animate-spin rounded-full border-[3px] border-white/20 border-t-white"
              aria-hidden
            />
            <p className="text-lg font-semibold text-white">
              ИИ анализирует ткань и фасон...
            </p>
            <p className="text-sm text-white/70">
              Формируем варианты апсайклинга. Обычно это занимает несколько секунд.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
