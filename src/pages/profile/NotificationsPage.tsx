import { useMemo } from "react";
import { X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { AnimatePresence, motion } from "framer-motion";

export default function NotificationsPage() {
  const { notifications, removeNotification, markAllNotificationsAsRead } = useApp();

  const hasUnread = useMemo(() => notifications.some((n) => n.unread), [notifications]);

  const handleRemoveNotification = (id: string) => {
    removeNotification(id);
  };

  return (
    <div className="space-y-4 px-4 py-6">
      <div className="flex items-start justify-between gap-4">
        <p className="text-sm text-muted">
          {notifications.length === 0
            ? "У вас нет уведомлений"
            : "Непрочитанные подсвечиваются оливковым фоном и точкой слева."}
        </p>
        {notifications.length > 0 && (
          <button
            type="button"
            disabled={!hasUnread}
            onClick={markAllNotificationsAsRead}
            className="shrink-0 rounded-2xl border border-[#556B2F] px-3 py-2 text-xs font-semibold text-[#556B2F] transition-colors hover:bg-[#556B2F]/10 disabled:cursor-not-allowed disabled:border-border disabled:text-muted disabled:hover:bg-transparent"
          >
            Прочитать все
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl bg-surface p-8 text-center shadow-card">
          <p className="text-sm font-medium text-muted">Уведомления отсутствуют</p>
          <p className="mt-2 text-xs text-muted">
            Вы будете получать уведомления о заказах, новых функциях и специальных предложениях.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          <AnimatePresence mode="popLayout">
            {notifications.map((notification) => (
              <motion.li
                key={notification.id}
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <article
                  className={`relative rounded-2xl px-4 py-4 shadow-card ring-1 ring-black/[0.04] transition-colors ${
                    notification.unread ? "bg-[#556B2F]/[0.06]" : "bg-surface"
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="pt-1">
                      <span
                        className={`mt-1 block h-2 w-2 rounded-full ${
                          notification.unread ? "bg-[#556B2F]" : "bg-transparent"
                        }`}
                        aria-hidden
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-sm leading-relaxed ${
                          notification.unread
                            ? "font-semibold text-foreground"
                            : "font-normal text-muted"
                        }`}
                      >
                        {notification.title}
                      </p>
                      <p className="mt-2 text-xs text-muted">{notification.timeLabel}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveNotification(notification.id)}
                      className="shrink-0 rounded-xl p-2 text-muted hover:bg-canvas hover:text-foreground transition-colors"
                      aria-label="Удалить уведомление"
                    >
                      <X className="h-4 w-4" aria-hidden />
                    </button>
                  </div>
                </article>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}
