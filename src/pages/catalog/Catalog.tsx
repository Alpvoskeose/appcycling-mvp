import type { ChangeEvent } from "react";
import { useRef, useState } from "react";
import { Heart, Loader2, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "@/context/FavoritesContext";

interface Product {
  id: string;
  title: string;
  price: string;
  priceAmountKzt: number;
  image: string;
}

const PRODUCTS: Product[] = [
  {
    id: "denim-jacket",
    title: "Кастомная джинсовка",
    price: "12 500 ₸",
    priceAmountKzt: 12500,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "tailored-blazer",
    title: "Перешитый пиджак",
    price: "15 000 ₸",
    priceAmountKzt: 15000,
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "upcycle-shirt",
    title: "Апсайкл рубашка",
    price: "10 000 ₸",
    priceAmountKzt: 10000,
    image:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "denim-bag",
    title: "Сумка из денима",
    price: "8 900 ₸",
    priceAmountKzt: 8900,
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800",
  },
];

export default function Catalog() {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const MAX_DIMENSION = 800;
  const JPEG_QUALITY = 0.8;

  const handleFavoriteClick = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite({
      id: product.id,
      title: product.title,
      price: product.price,
      priceAmountKzt: product.priceAmountKzt,
      image: product.image,
    });
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

  const handleCameraClick = () => {
    if (isUploading) return;
    fileInputRef.current?.click();
  };

  const handlePhotoCapture = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const compressedFile = await resizeImage(file);

      await sendToTelegram(compressedFile);
      const generatedUrl = await sendToGenerator();
      navigate("/ai-results", { replace: true, state: { generatedImage: generatedUrl } });
    } catch (error) {
      console.error("Upload or generation failed:", error);
      navigate("/ai-results", { replace: true });
    } finally {
      setIsUploading(false);
      event.currentTarget.value = "";
    }
  };

  return (
    <div className="relative px-4 py-6">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handlePhotoCapture}
      />
      <p className="text-sm leading-relaxed text-muted">
        Каталог апсайкл-товаров. Сохраняйте понравившиеся вещи в избранное и трансформируйте их с помощью ИИ.
      </p>

      <section className="mt-6" aria-label="Каталог апсайкл-товаров">
        <div className="grid grid-cols-2 gap-4">
          {PRODUCTS.map((product) => {
            const isFav = isFavorite(product.id);
            return (
              <article
                key={product.id}
                className="overflow-hidden rounded-2xl bg-surface shadow-card ring-1 ring-black/[0.04]"
              >
                <div className="relative overflow-hidden bg-canvas">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-48 w-full rounded-t-2xl object-cover"
                    loading="lazy"
                  />
                  <button
                    type="button"
                    onClick={(e) => handleFavoriteClick(e, product)}
                    className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-surface shadow-md transition-transform active:scale-95 hover:brightness-110"
                    aria-label={isFav ? "Убрать из избранного" : "Добавить в избранное"}
                  >
                    <Heart
                      className="h-6 w-6"
                      strokeWidth={2}
                      fill={isFav ? "#556B2F" : "none"}
                      color={isFav ? "#556B2F" : "#212121"}
                      aria-hidden
                    />
                  </button>
                </div>
                <div className="space-y-2 p-3">
                  <h2 className="line-clamp-2 text-sm font-semibold text-foreground">
                    {product.title}
                  </h2>
                  <p className="text-sm font-bold text-[#556B2F]">{product.price}</p>
                  <button
                    type="button"
                    onClick={() => navigate("/delivery")}
                    className="flex w-full items-center justify-center rounded-xl bg-[#556B2F] py-2 text-xs font-semibold text-white transition-transform active:scale-[0.98]"
                  >
                    Хочу так же
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <button
        type="button"
        onClick={handleCameraClick}
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#556B2F] text-white shadow-lg transition-transform active:scale-95"
        aria-label="ИИ-камера"
      >
        <Sparkles className="h-6 w-6" strokeWidth={2} />
      </button>

      {isUploading ? (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70 px-6 text-white">
          <div className="flex flex-col items-center gap-4 text-center">
            <Loader2 className="h-10 w-10 animate-spin text-[#556B2F]" />
            <p className="text-base font-semibold">Оптимизируем фото и запускаем ИИ...</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}