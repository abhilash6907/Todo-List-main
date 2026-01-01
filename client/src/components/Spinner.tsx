export function Spinner({ label, className }: { label?: string; className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className || ""}`}>
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-indigo-600 dark:border-slate-700 dark:border-t-indigo-400" />
      {label ? (
        <span className="text-sm text-slate-600 dark:text-slate-300">{label}</span>
      ) : null}
    </div>
  );
}
