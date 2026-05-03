import { TELEGRAM_API_BASE_URL, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } from "@/config/telegram";
import type { OrderDraft } from "@/context/orderTypes";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function deliveryLabel(method: OrderDraft["deliveryMethod"]): string {
  if (method === "courier") return "Курьер";
  if (method === "pickup") return "Самовывоз";
  return "—";
}

function paymentLabel(method: OrderDraft["paymentMethod"]): string {
  if (method === "card") return "Карта онлайн";
  if (method === "cash_on_delivery") return "При получении";
  return "—";
}

export function formatOrderTelegramHtml(order: OrderDraft): string {
  const lines = [
    "<b>Новый заказ Appcycling</b>",
    "",
    `<b>Услуга:</b> ${escapeHtml(order.serviceTitle ?? "—")}`,
    `<b>Цена:</b> ${escapeHtml(order.priceLabel ?? "—")}`,
    `<b>Сумма (число):</b> ${order.priceAmountKzt != null ? `${order.priceAmountKzt} ₸` : "—"}`,
    `<b>Конструктор:</b> ${escapeHtml(order.constructorSummary?.trim() || "—")}`,
    "",
    `<b>Доставка:</b> ${escapeHtml(deliveryLabel(order.deliveryMethod))}`,
    `<b>Адрес:</b> ${escapeHtml(order.addressLine?.trim() || "—")}`,
    `<b>Квартира / подъезд:</b> ${escapeHtml(order.apartmentDetails?.trim() || "—")}`,
    `<b>Дата:</b> ${escapeHtml(order.deliveryDate?.trim() || "—")}`,
    `<b>Время:</b> ${escapeHtml(order.deliveryTimeSlot?.trim() || "—")}`,
    "",
    `<b>Оплата:</b> ${escapeHtml(paymentLabel(order.paymentMethod))}`,
  ];

  return lines.join("\n");
}

export type SubmitOrderResult =
  | { ok: true }
  | { ok: false; error: string };

/**
 * Отправка лида в Telegram через sendMessage (Frankenstein-MVP).
 */
export async function submitOrder(order: OrderDraft): Promise<SubmitOrderResult> {
  const token = TELEGRAM_BOT_TOKEN.trim();
  const chatId = TELEGRAM_CHAT_ID.trim();

  if (!token || !chatId) {
    return {
      ok: false,
      error:
        "Не заданы VITE_TELEGRAM_BOT_TOKEN или VITE_TELEGRAM_CHAT_ID. Добавьте их в .env.local.",
    };
  }

  const url = `${TELEGRAM_API_BASE_URL.replace(/\/$/, "")}/bot${token}/sendMessage`;
  const text = formatOrderTelegramHtml(order);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    const payload: unknown = await response.json().catch(() => null);

    const description =
      typeof payload === "object" &&
      payload !== null &&
      "description" in payload &&
      typeof (payload as { description?: unknown }).description === "string"
        ? (payload as { description: string }).description
        : response.statusText;

    const telegramOk =
      typeof payload === "object" &&
      payload !== null &&
      "ok" in payload &&
      (payload as { ok?: unknown }).ok === true;

    if (!response.ok || !telegramOk) {
      return {
        ok: false,
        error: description || "Telegram API вернул ошибку",
      };
    }

    return { ok: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Сеть недоступна";
    return {
      ok: false,
      error: `${message}. Если это CORS: используйте backend-прокси и VITE_TELEGRAM_API_BASE_URL на URL прокси.`,
    };
  }
}
