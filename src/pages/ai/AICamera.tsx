import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Phase = "viewfinder" | "processing";

export default function AICamera() {
  const navigate = useNavigate();
  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);
  const [phase, setPhase] = useState<Phase>("viewfinder");
  const [cameraReady, setCameraReady] = useState(false);

  useEffect(() => {
    if (!videoEl || !navigator.mediaDevices?.getUserMedia) {
      setCameraReady(false);
      return undefined;
    }

    let stream: MediaStream | null = null;

    navigator.mediaDevices
      .getUserMedia({
        video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 } },
        audio: false,
      })
      .then((s) => {
        stream = s;
        videoEl.srcObject = s;
        void videoEl.play().catch(() => {});
        setCameraReady(true);
      })
      .catch(() => setCameraReady(false));

    return () => {
      stream?.getTracks().forEach((t) => t.stop());
      videoEl.srcObject = null;
      setCameraReady(false);
    };
  }, [videoEl]);

  useEffect(() => {
    if (phase !== "processing") return undefined;

    const ms = 3000 + Math.random() * 1000;
    const id = window.setTimeout(() => {
      navigate("/ai-results", { replace: true });
    }, ms);

    return () => window.clearTimeout(id);
  }, [phase, navigate]);

  const handleShutter = () => {
    if (phase !== "viewfinder") return;
    setPhase("processing");
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-black text-surface">
      <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-md transition-colors hover:bg-black/50"
          aria-label="Назад"
        >
          <ChevronLeft className="h-7 w-7" strokeWidth={2} />
        </button>
        <span className="rounded-full bg-black/35 px-3 py-1 text-xs font-medium backdrop-blur-md">
          ИИ-камера
        </span>
        <span className="w-11" aria-hidden />
      </header>

      <div className="relative flex-1 overflow-hidden">
        <video
          ref={setVideoEl}
          className={`absolute inset-0 h-full w-full object-cover ${cameraReady && phase === "viewfinder" ? "opacity-100" : "opacity-0"}`}
          playsInline
          muted
          aria-hidden={phase === "processing"}
        />

        {!cameraReady ? (
          <div
            className={`absolute inset-0 bg-gradient-to-b from-[#1a1f14] via-[#0d0f0a] to-black transition-opacity ${phase === "processing" ? "opacity-40" : "opacity-100"}`}
            aria-hidden
          />
        ) : null}

        {!cameraReady && phase === "viewfinder" ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center px-10 text-center">
            <div className="mb-4 h-48 w-full max-w-sm rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm" />
            <p className="text-sm text-white/75">
              Разрешите доступ к камере или продолжите с демо-видоискателем — затвор всё равно запустит
              ИИ-разбор вещи.
            </p>
          </div>
        ) : null}

        <div className="pointer-events-none absolute inset-x-0 bottom-28 flex justify-center gap-3 opacity-80">
          <span className="h-1 w-16 rounded-full bg-white/35" />
          <span className="h-1 w-10 rounded-full bg-white/20" />
          <span className="h-1 w-10 rounded-full bg-white/20" />
        </div>

        <div className="absolute inset-x-0 bottom-[max(2rem,env(safe-area-inset-bottom))] flex flex-col items-center gap-6 px-8">
          <p className="max-w-xs text-center text-xs leading-relaxed text-white/65">
            Наведите на вещь и нажмите затвор — мы подберём трендовые апсайкл-концепты под ваш материал.
          </p>
          <button
            type="button"
            onClick={handleShutter}
            disabled={phase !== "viewfinder"}
            className="relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border-[5px] border-white/85 bg-white/10 shadow-[0_0_0_6px_rgba(255,255,255,0.08)] transition-transform enabled:active:scale-95 disabled:opacity-60"
            aria-label="Сделать снимок"
          >
            <span className="h-[3rem] w-[3rem] rounded-full bg-white shadow-inner" />
          </button>
        </div>
      </div>

      {phase === "processing" ? (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/88 px-8 backdrop-blur-md">
          <div className="flex flex-col items-center gap-8">
            <div
              className="h-14 w-14 animate-spin rounded-full border-[3px] border-white/15 border-t-accent shadow-[0_0_40px_rgba(85,107,47,0.35)]"
              aria-hidden
            />

            <div className="max-w-md space-y-4 text-center">
              <p className="text-lg font-semibold leading-snug text-surface">
                Искусственный интеллект анализирует вещь и подбирает трендовые дизайны...
              </p>
              <p className="text-sm text-white/65">
                Это займёт всего несколько секунд: распознаём фактуру, цвет и износ, затем собираем
                превью апсайклинга.
              </p>
            </div>

            <div className="flex w-full max-w-sm flex-col gap-3">
              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-2/3 animate-pulse rounded-full bg-accent/80" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-16 animate-pulse rounded-xl bg-white/10" />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
