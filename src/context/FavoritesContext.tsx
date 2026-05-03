import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { FavoriteIdea } from "./favoritesTypes";

const FAVORITES_STORAGE_KEY = "app_favorites";

type FavoritesContextValue = {
  favorites: FavoriteIdea[];
  toggleFavorite: (item: FavoriteIdea) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteIdea[]>([]);

  // Загрузка избранного из localStorage при монтировании
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Ошибка при загрузке избранного из localStorage:", error);
    }
  }, []);

  // Сохранение избранного в localStorage при изменении
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error("Ошибка при сохранении избранного в localStorage:", error);
    }
  }, [favorites]);

  const toggleFavorite = useCallback((item: FavoriteIdea) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === item.id);
      if (exists) return prev.filter((f) => f.id !== item.id);
      return [...prev, item];
    });
  }, []);

  const removeFavorite = useCallback((id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites.some((f) => f.id === id),
    [favorites],
  );

  const value = useMemo(
    () => ({
      favorites,
      toggleFavorite,
      removeFavorite,
      isFavorite,
    }),
    [favorites, toggleFavorite, removeFavorite, isFavorite],
  );

  return (
    <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites должен вызываться внутри FavoritesProvider");
  }
  return ctx;
}
