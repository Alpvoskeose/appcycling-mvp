/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        /** Акцент: кнопки, активные иконки, прогресс */
        accent: "#556B2F",
        /** Карточки, панели */
        surface: "#FFFFFF",
        /** Фон экранов */
        canvas: "#F5F5F5",
        /** Заголовки и основной текст */
        foreground: "#212121",
        /** Вторичный текст */
        muted: "#757575",
        /** Ошибки и удаление (дизайн-система) */
        destructive: "#EF4444",
        /** Неактивные обводки, разделители */
        border: "#E0E0E0",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0px 4px 12px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};
