import { useRef, useState } from "react";
import { ChevronLeft, Loader2, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

type GenerateResponse = {
  imageUrl?: string;
  error?: string;
};

export default function AICamera() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleShutter = () => {
    if (isUploading) return;
    fileInputRef.current?.click();
  };

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });

  const sendToTelegram = async (file: File) => {
    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error("Telegram credentials missing: VITE_TELEGRAM_BOT_TOKEN or VITE_TELEGRAM_CHAT_ID");
      return;
    }

    const formData = new FormData();
    formData.append("chat_id", chatId);
    formData.append("caption", "📸 Новое фото для ИИ-генерации!");
    formData.append("photo", file, file.name);

    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const payload = await response.text();
      throw new Error(`Telegram upload failed: ${response.status} ${payload}`);
    }
  };

  const sendToGenerator = async (base64Image: string): Promise<string | null> => {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageBase64: base64Image }),
    });

    if (!response.ok) {
      const payload = await response.text();
      throw new Error(`Generation failed: ${response.status} ${payload}`);
    }

    const data = (await response.json()) as GenerateResponse;
    return data.imageUrl || null;
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);

      const base64Image = await fileToBase64(file);

      const [_, generatedUrl] = await Promise.all([
        sendToTelegram(file),
        sendToGenerator(base64Image),
      ]);

      if (generatedUrl) {
        navigate("/ai-results", { replace: true, state: { generatedImage: generatedUrl } });
      } else {
        navigate("/ai-results", { replace: true });
      }
    } catch (error) {
      console.error("Upload or generation failed:", error);
      navigate("/ai-results", { replace: true });
    } finally {
      setIsUploading(false);
      event.currentTarget.value = "";
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-[#212121]">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />

      {!isUploading ? (
        <div className="relative min-h-screen bg-black text-white">
          <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/catalog")}
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#556B2F] text-white"
              aria-label="Назад"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
            </button>

            <span className="text-sm font-semibold text-white">ИИ-камера</span>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white"
              aria-label="Вспышка"
            >
              <Zap className="h-5 w-5" strokeWidth={2} />
            </button>
          </header>

          <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
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

            <div className="pointer-events-none absolute inset-x-0 bottom-28 flex justify-center gap-3 opacity-70">
              <span className="h-1 w-16 rounded-full bg-white/35" />
              <span className="h-1 w-10 rounded-full bg-white/20" />
              <span className="h-1 w-10 rounded-full bg-white/20" />
            </div>

            <div className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-4">
              <p className="max-w-xs text-center text-xs leading-relaxed text-white/70">
                Наведите камеру на вещь и нажмите спуск затвора
              </p>
              <button
                type="button"
                onClick={handleShutter}
                className="relative flex h-20 w-20 items-center justify-center rounded-full border-4 border-white/80 bg-white/10"
                aria-label="Спуск затвора"
              >
                <span className="h-12 w-12 rounded-full bg-white" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black px-6 text-white">
          <div className="flex flex-col items-center gap-4 text-center">
            <Loader2 className="h-10 w-10 animate-spin" />
            <p className="text-base font-semibold">ИИ анализирует ткань и создает уникальный дизайн...</p>
          </div>
        </div>
      )}
    </div>
  );
}
