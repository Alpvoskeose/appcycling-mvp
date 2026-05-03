import { Outlet } from "react-router-dom";

/** Полноэкранный режим авторизации без нижней панели и без корпоративного TabBar */
export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-canvas">
      <Outlet />
    </div>
  );
}
