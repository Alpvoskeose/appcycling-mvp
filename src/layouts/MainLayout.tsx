import { Outlet, useLocation } from "react-router-dom";
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomTabBar } from "@/components/layout/BottomTabBar";
import { HeaderNotificationsBell } from "@/components/layout/HeaderNotificationsBell";
import { getShellTitle, showBack, showTabBar } from "@/layouts/mainShellMeta";

export default function MainLayout() {
  const { pathname } = useLocation();

  const tabTitle = getShellTitle(pathname);
  const catalogRoutes = pathname === "/home" || pathname === "/catalog";

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <AppHeader
        title={tabTitle}
        showBack={showBack(pathname)}
        rightAccessory={catalogRoutes ? <HeaderNotificationsBell /> : undefined}
      />
      <main
        className={
          showTabBar(pathname)
            ? "flex-1 overflow-y-auto pb-[calc(6.25rem+env(safe-area-inset-bottom))]"
            : "flex-1 overflow-y-auto pb-[max(1.5rem,env(safe-area-inset-bottom))]"
        }
      >
        <Outlet />
      </main>
      {showTabBar(pathname) ? <BottomTabBar /> : null}
    </div>
  );
}
