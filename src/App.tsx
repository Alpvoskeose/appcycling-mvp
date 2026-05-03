import { Outlet } from "react-router-dom";

/**
 * Корневой layout приложения: общая оболочка для всех маршрутов.
 * TabBar, хедеры и вложенные layout’ы добавятся на следующих шагах.
 */
export default function App() {
  return (
    <div className="min-h-screen bg-canvas font-sans text-foreground antialiased">
      <Outlet />
    </div>
  );
}
