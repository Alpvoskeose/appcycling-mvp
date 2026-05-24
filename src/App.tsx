import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useApp } from "@/context/AppContext";

/**
 * Корневой layout приложения: общая оболочка для всех маршрутов.
 * Управляет применением темной темы на основе настроек пользователя.
 */
export default function App() {
  const { settings } = useApp();

  // Применяем темную тему при загрузке приложения и при изменении настроек
  useEffect(() => {
    if (settings.darkTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [settings.darkTheme]);

  return (
    <div className="min-h-screen bg-surface text-foreground transition-colors duration-300">
      <Outlet />
    </div>
  );
}
