import { Bell } from "lucide-react";
import { Link } from "react-router-dom";

export function HeaderNotificationsBell() {
  return (
    <Link
      to="/notifications"
      className="relative flex h-10 w-10 items-center justify-center rounded-2xl text-foreground transition-colors hover:bg-canvas active:scale-95"
      aria-label="Уведомления"
    >
      <Bell className="h-6 w-6" strokeWidth={2} />
      <span
        className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive ring-2 ring-surface"
        aria-hidden
      />
    </Link>
  );
}
