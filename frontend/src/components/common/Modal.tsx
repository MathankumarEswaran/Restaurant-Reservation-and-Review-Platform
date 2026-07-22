import { type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { cn } from "../../utils/cn";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl" };

export function Modal({ isOpen, onClose, title, children, size = "md" }: ModalProps) {
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-secondary/50 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={cn("w-full rounded-2xl bg-surface-raised shadow-2xl", sizeClasses[size])}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
          >
            {title && (
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <h3 className="text-lg font-semibold text-text">{title}</h3>
                <button
                  onClick={onClose}
                  className="rounded-full p-1.5 text-text-subtle hover:bg-surface-sunken hover:text-text cursor-pointer"
                  aria-label="Close"
                >
                  <FiX size={20} />
                </button>
              </div>
            )}
            <div className="p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
