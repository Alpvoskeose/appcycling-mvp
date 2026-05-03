/** Корневые экраны с нижним TabBar и без кнопки «Назад» */
export const TAB_BAR_PATHS = new Set([
  "/home",
  "/catalog",
  "/my-orders",
  "/cart",
  "/profile",
]);

export function showTabBar(pathname: string): boolean {
  return TAB_BAR_PATHS.has(pathname);
}

export function showBack(pathname: string): boolean {
  return !TAB_BAR_PATHS.has(pathname);
}

export function getShellTitle(pathname: string): string {
  if (pathname.startsWith("/order-details/")) return "Детали заказа";

  const map: Record<string, string> = {
    "/home": "Главная",
    "/catalog": "Каталог",
    "/my-orders": "Заказы",
    "/cart": "Корзина",
    "/profile": "Профиль",
    "/favorites": "Избранное",
    "/addresses-cards": "Мои адреса и карты",
    "/add-address": "Новый адрес",
    "/eco-impact": "Эко-вклад",
    "/settings": "Настройки",
    "/notifications": "Уведомления",
  };

  return map[pathname] ?? "Appcycling";
}
