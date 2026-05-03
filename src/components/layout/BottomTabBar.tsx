import { Home, Package, ShoppingCart, Sparkles, User } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";

const tabs = [
  { to: "/home", label: "Главная", Icon: Home },
  { to: "/my-orders", label: "Заказы", Icon: Package },
  { to: "/cart", label: "Корзина", Icon: ShoppingCart },
  { to: "/profile", label: "Профиль", Icon: User },
] as const;

export function BottomTabBar() {
  const { pathname } = useLocation();
  const homeActive = pathname === "/home" || pathname === "/catalog";

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-surface px-2 pb-[env(safe-area-inset-bottom)] pt-8 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]"
      aria-label="Основная навигация"
    >
      <div className="relative mx-auto flex max-w-lg items-end justify-between gap-1 pb-2 pt-1">
        <ul className="flex flex-1 justify-around gap-1">
          <li className="flex-1">
            <Link
              to="/home"
              aria-current={homeActive ? "page" : undefined}
              className={`flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-xs font-medium transition-colors ${
                homeActive ? "text-accent" : "text-muted hover:text-foreground"
              }`}
            >
              <Home className="h-6 w-6" strokeWidth={homeActive ? 2.25 : 2} aria-hidden />
              <span>Главная</span>
            </Link>
          </li>

          {tabs.slice(1, 2).map(({ to, label, Icon }) => (
            <li key={to} className="flex-1">
              <NavLink
                to={to}
                className={({ isActive }) =>
                  [
                    "flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-xs font-medium transition-colors",
                    isActive ? "text-accent" : "text-muted hover:text-foreground",
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className="h-6 w-6"
                      strokeWidth={isActive ? 2.25 : 2}
                      aria-hidden
                    />
                    <span>{label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex w-[72px] shrink-0 justify-center" aria-hidden />

        <ul className="flex flex-1 justify-around gap-1">
          {tabs.slice(2).map(({ to, label, Icon }) => (
            <li key={to} className="flex-1">
              <NavLink
                to={to}
                className={({ isActive }) =>
                  [
                    "flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-xs font-medium transition-colors",
                    isActive ? "text-accent" : "text-muted hover:text-foreground",
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className="h-6 w-6"
                      strokeWidth={isActive ? 2.25 : 2}
                      aria-hidden
                    />
                    <span>{label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <NavLink
          to="/ai-camera"
          className={({ isActive }) =>
            [
              "absolute left-1/2 top-0 flex h-[3.75rem] w-[3.75rem] -translate-x-1/2 -translate-y-[45%] items-center justify-center rounded-full bg-accent text-surface shadow-card ring-4 ring-surface transition-[transform,filter] active:scale-95",
              isActive ? "brightness-110 saturate-125" : "",
            ].join(" ")
          }
          aria-label="ИИ-камера — апсайклинг"
        >
          <Sparkles className="h-7 w-7" strokeWidth={2} aria-hidden />
        </NavLink>
      </div>
    </nav>
  );
}
