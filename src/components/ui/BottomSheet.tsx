import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

type BottomSheetProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export function BottomSheet({ open, title, onClose, children }: BottomSheetProps) {
  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[80] flex flex-col justify-end">
          <motion.button
            type="button"
            aria-label="Закрыть"
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="bottom-sheet-title"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="relative max-h-[85vh] overflow-y-auto rounded-t-3xl bg-surface px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 shadow-[0_-8px_40px_rgba(0,0,0,0.15)]"
          >
            <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-border" aria-hidden />
            <h2 id="bottom-sheet-title" className="text-xl font-bold text-foreground">
              {title}
            </h2>
            <div className="mt-4">{children}</div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
