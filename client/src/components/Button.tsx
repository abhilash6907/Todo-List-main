import type { ButtonHTMLAttributes } from "react";
import { cn } from "../utils/cn";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md";
};

export function Button({
  className,
  variant = "secondary",
  size = "md",
  ...props
}: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants: Record<NonNullable<Props["variant"]>, string> = {
    primary:
      "bg-indigo-600 text-white shadow-soft hover:bg-indigo-500 active:translate-y-[1px]",
    secondary:
      "bg-white/80 text-slate-900 shadow-soft hover:bg-white active:translate-y-[1px] dark:bg-slate-900/60 dark:text-slate-100 dark:hover:bg-slate-900",
    danger:
      "bg-rose-600 text-white shadow-soft hover:bg-rose-500 active:translate-y-[1px]",
    ghost:
      "bg-transparent text-slate-700 hover:bg-slate-900/5 dark:text-slate-200 dark:hover:bg-white/10"
  };

  const sizes: Record<NonNullable<Props["size"]>, string> = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-4"
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
