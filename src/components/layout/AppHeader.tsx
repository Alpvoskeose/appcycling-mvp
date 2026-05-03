import type { ReactNode } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type AppHeaderProps = {
  title?: string;
  showBack?: boolean;
  /** Правый слот (например, колокольчик уведомлений) */
  rightAccessory?: ReactNode;
};

export function AppHeader({ title, showBack = false, rightAccessory }: AppHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="relative sticky top-0 z-20 flex h-14 shrink-0 items-center border-b border-border bg-surface px-4 shadow-card">
      <div className="flex w-[88px] shrink-0 justify-start">
        {showBack ? (
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-2xl text-accent transition-colors hover:bg-canvas active:scale-95"
            aria-label="Назад"
          >
            <ChevronLeft className="h-6 w-6" strokeWidth={2} />
          </button>
        ) : (
          <span className="truncate text-base font-semibold tracking-tight text-foreground">
            Appcycling
          </span>
        )}
      </div>

      <div className="pointer-events-none absolute inset-x-0 flex justify-center px-16">
        {title ? (
          <h1 className="truncate text-center text-base font-semibold text-foreground">
            {title}
          </h1>
        ) : null}
      </div>

      <div className="ml-auto flex h-10 min-h-[40px] w-[88px] shrink-0 items-center justify-end">
        {rightAccessory}
      </div>
    </header>
  );
}
