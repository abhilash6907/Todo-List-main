import { motion } from "framer-motion";
import { cn } from "../utils/cn";

export function StatusPill({ completed }: { completed: boolean }) {
  return (
    <motion.span
      layout
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold",
        completed
          ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
          : "bg-amber-500/15 text-amber-800 dark:text-amber-300"
      )}
    >
      <motion.span
        layout
        className={cn(
          "h-2 w-2 rounded-full",
          completed ? "bg-emerald-500" : "bg-amber-500"
        )}
      />
      {completed ? "Complete" : "Incomplete"}
    </motion.span>
  );
}
