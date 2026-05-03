/**
 * В продакшене токен бота всё равно попадёт в клиентский бандл — это осознанный компромисс MVP.
 * Для боевого режима лучше прокси через свой backend и не светить BOT_TOKEN в браузере.
 */
export const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN ?? "";

export const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID ?? "";

/** По умолчанию прямой вызов Bot API; при CORS укажите свой прокси: https://your-worker.dev */
export const TELEGRAM_API_BASE_URL =
  import.meta.env.VITE_TELEGRAM_API_BASE_URL ?? "https://api.telegram.org";
