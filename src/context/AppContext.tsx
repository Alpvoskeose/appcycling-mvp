import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface Notification {
  id: string;
  title: string;
  timeLabel: string;
  unread: boolean;
  createdAt: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  serviceTitle: string;
  priceLabel: string;
  priceAmountKzt: number;
  deliveryMethod: string;
  paymentMethod: string;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  createdAt: number;
}

export interface UserSettings {
  pushNotifications: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  darkTheme: boolean;
}

export interface AppUser {
  email: string | null;
  name: string | null;
}

export interface RegisteredUser {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: number;
}

export interface Address {
  id: string;
  city: string;
  street: string;
  apartment: string;
}

export interface Card {
  id: string;
  number: string;
  expiry: string;
  type: "visa" | "mastercard";
}

type AppContextValue = {
  user: AppUser;
  setUser: (user: AppUser) => void;
  currentUser: AppUser;
  users: RegisteredUser[];
  isAuthenticated: boolean;
  registerUser: (name: string, email: string, password: string) => { success: boolean; error?: string };
  loginUser: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "createdAt">) => void;
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, "id" | "createdAt">) => void;
  removeNotification: (id: string) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  addresses: Address[];
  addAddress: (address: Omit<Address, "id">) => void;
  removeAddress: (id: string) => void;
  cards: Card[];
  addCard: (card: Omit<Card, "id">) => void;
  removeCard: (id: string) => void;
  settings: UserSettings;
  updateSettings: (settings: Partial<UserSettings>) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

const STORAGE_KEYS = {
  USER: "app_user",
  USERS: "app_users",
  ORDERS: "app_orders",
  NOTIFICATIONS: "app_notifications",
  ADDRESSES: "app_addresses",
  CARDS: "app_cards",
  SETTINGS: "app_settings",
};

const DEFAULT_SETTINGS: UserSettings = {
  pushNotifications: true,
  emailNotifications: false,
  smsNotifications: true,
  darkTheme: false,
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUserState] = useState<AppUser>({ email: null, name: null });
  const [users, setUsers] = useState<RegisteredUser[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [settings, setSettingsState] = useState<UserSettings>(DEFAULT_SETTINGS);

  // Загрузка данных из localStorage при монтировании
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
      if (storedUser) {
        setCurrentUserState(JSON.parse(storedUser));
      }

      const storedUsers = localStorage.getItem(STORAGE_KEYS.USERS);
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      }

      const storedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      }

      const storedNotifications = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      if (storedNotifications) {
        setNotifications(JSON.parse(storedNotifications));
      }

      const storedAddresses = localStorage.getItem(STORAGE_KEYS.ADDRESSES);
      if (storedAddresses) {
        setAddresses(JSON.parse(storedAddresses));
      }

      const storedCards = localStorage.getItem(STORAGE_KEYS.CARDS);
      if (storedCards) {
        setCards(JSON.parse(storedCards));
      }

      const storedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (storedSettings) {
        setSettingsState(JSON.parse(storedSettings));
      }
    } catch (error) {
      console.error("Ошибка при загрузке данных из localStorage:", error);
    }
  }, []);

  // Регистрация нового пользователя
  const registerUser = useCallback(
    (name: string, email: string, password: string): { success: boolean; error?: string } => {
      // Проверяем, не существует ли уже такой email
      const existingUser = users.find((u) => u.email === email);
      if (existingUser) {
        return { success: false, error: "Этот email уже зарегистрирован" };
      }

      // Создаём нового пользователя
      const newUser: RegisteredUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        password,
        createdAt: Date.now(),
      };

      try {
        // Добавляем в список пользователей
        const updatedUsers = [...users, newUser];
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updatedUsers));
        setUsers(updatedUsers);

        // Устанавливаем текущего пользователя
        const currentUser: AppUser = { email, name };
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
        setCurrentUserState(currentUser);

        return { success: true };
      } catch (error) {
        console.error("Ошибка при регистрации:", error);
        return { success: false, error: "Ошибка при сохранении данных" };
      }
    },
    [users]
  );

  // Вход пользователя
  const loginUser = useCallback(
    (email: string, password: string): { success: boolean; error?: string } => {
      // Ищем пользователя
      const foundUser = users.find((u) => u.email === email);

      if (!foundUser) {
        return { success: false, error: "Неверный email или пароль" };
      }

      // Проверяем пароль
      if (foundUser.password !== password) {
        return { success: false, error: "Неверный email или пароль" };
      }

      try {
        // Устанавливаем текущего пользователя
        const currentUser: AppUser = { email: foundUser.email, name: foundUser.name };
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
        setCurrentUserState(currentUser);

        return { success: true };
      } catch (error) {
        console.error("Ошибка при входе:", error);
        return { success: false, error: "Ошибка при входе" };
      }
    },
    [users]
  );

  // Выход пользователя
  const logout = useCallback(() => {
    try {
      setCurrentUserState({ email: null, name: null });
      localStorage.removeItem(STORAGE_KEYS.USER);
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  }, []);

  // Сохранение пользователя в localStorage
  const setUser = useCallback((newUser: AppUser) => {
    setCurrentUserState(newUser);
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
    } catch (error) {
      console.error("Ошибка при сохранении пользователя:", error);
    }
  }, []);

  // Добавление заказа
  const addOrder = useCallback((orderData: Omit<Order, "id" | "createdAt">) => {
    const newOrder: Order = {
      ...orderData,
      id: `order-${Date.now()}`,
      createdAt: Date.now(),
    };
    setOrders((prev) => {
      const updated = [newOrder, ...prev];
      try {
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
      } catch (error) {
        console.error("Ошибка при сохранении заказов:", error);
      }
      return updated;
    });
    return newOrder;
  }, []);

  // Добавление уведомления
  const addNotification = useCallback((notifData: Omit<Notification, "id" | "createdAt">) => {
    const newNotif: Notification = {
      ...notifData,
      id: `notif-${Date.now()}`,
      createdAt: Date.now(),
    };
    setNotifications((prev) => {
      const updated = [newNotif, ...prev];
      try {
        localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
      } catch (error) {
        console.error("Ошибка при сохранении уведомлений:", error);
      }
      return updated;
    });
  }, []);

  // Удаление уведомления
  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => {
      const updated = prev.filter((n) => n.id !== id);
      try {
        localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
      } catch (error) {
        console.error("Ошибка при удалении уведомления:", error);
      }
      return updated;
    });
  }, []);

  // Пометить уведомление как прочитанное
  const markNotificationAsRead = useCallback((id: string) => {
    setNotifications((prev) => {
      const updated = prev.map((n) => (n.id === id ? { ...n, unread: false } : n));
      try {
        localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
      } catch (error) {
        console.error("Ошибка при обновлении уведомления:", error);
      }
      return updated;
    });
  }, []);

  // Пометить все уведомления как прочитанные
  const markAllNotificationsAsRead = useCallback(() => {
    setNotifications((prev) => {
      const updated = prev.map((n) => ({ ...n, unread: false }));
      try {
        localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(updated));
      } catch (error) {
        console.error("Ошибка при обновлении уведомлений:", error);
      }
      return updated;
    });
  }, []);

  // Обновление настроек
  const updateSettings = useCallback((newSettings: Partial<UserSettings>) => {
    setSettingsState((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));

        // Применить темную тему на html элемент
        if (updated.darkTheme) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      } catch (error) {
        console.error("Ошибка при сохранении настроек:", error);
      }
      return updated;
    });
  }, []);

  // Добавление адреса
  const addAddress = useCallback((addressData: Omit<Address, "id">) => {
    const newAddress: Address = {
      ...addressData,
      id: `addr-${Date.now()}`,
    };
    setAddresses((prev) => {
      const updated = [...prev, newAddress];
      try {
        localStorage.setItem(STORAGE_KEYS.ADDRESSES, JSON.stringify(updated));
      } catch (error) {
        console.error("Ошибка при сохранении адресов:", error);
      }
      return updated;
    });
  }, []);

  // Удаление адреса
  const removeAddress = useCallback((id: string) => {
    setAddresses((prev) => {
      const updated = prev.filter((addr) => addr.id !== id);
      try {
        localStorage.setItem(STORAGE_KEYS.ADDRESSES, JSON.stringify(updated));
      } catch (error) {
        console.error("Ошибка при удалении адреса:", error);
      }
      return updated;
    });
  }, []);

  // Добавление карты
  const addCard = useCallback((cardData: Omit<Card, "id">) => {
    const newCard: Card = {
      ...cardData,
      id: `card-${Date.now()}`,
    };
    setCards((prev) => {
      const updated = [...prev, newCard];
      try {
        localStorage.setItem(STORAGE_KEYS.CARDS, JSON.stringify(updated));
      } catch (error) {
        console.error("Ошибка при сохранении карт:", error);
      }
      return updated;
    });
  }, []);

  // Удаление карты
  const removeCard = useCallback((id: string) => {
    setCards((prev) => {
      const updated = prev.filter((card) => card.id !== id);
      try {
        localStorage.setItem(STORAGE_KEYS.CARDS, JSON.stringify(updated));
      } catch (error) {
        console.error("Ошибка при удалении карты:", error);
      }
      return updated;
    });
  }, []);

  // Применить темную тему при загрузке и при изменении настроек
  useEffect(() => {
    if (settings.darkTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [settings.darkTheme]);

  const user = currentUser;
  const isAuthenticated = currentUser.email !== null;

  const value = useMemo(
    () => ({
      user,
      setUser,
      currentUser,
      users,
      isAuthenticated,
      registerUser,
      loginUser,
      logout,
      orders,
      addOrder,
      notifications,
      addNotification,
      removeNotification,
      markNotificationAsRead,
      markAllNotificationsAsRead,
      addresses,
      addAddress,
      removeAddress,
      cards,
      addCard,
      removeCard,
      settings,
      updateSettings,
    }),
    [
      user,
      setUser,
      currentUser,
      users,
      isAuthenticated,
      registerUser,
      loginUser,
      logout,
      orders,
      addOrder,
      notifications,
      addNotification,
      removeNotification,
      markNotificationAsRead,
      markAllNotificationsAsRead,
      addresses,
      addAddress,
      removeAddress,
      cards,
      addCard,
      removeCard,
      settings,
      updateSettings,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp должен использоваться внутри AppProvider");
  }
  return ctx;
}
