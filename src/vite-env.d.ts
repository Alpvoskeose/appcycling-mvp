/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TELEGRAM_BOT_TOKEN?: string;
  readonly VITE_TELEGRAM_CHAT_ID?: string;
  /** Опционально: URL прокси без завершающего слэша, если прямой вызов Bot API блокируется CORS */
  readonly VITE_TELEGRAM_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
