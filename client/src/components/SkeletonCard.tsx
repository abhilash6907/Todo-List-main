export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900/50">
      <div className="h-4 w-2/3 rounded-md bg-[linear-gradient(90deg,rgba(148,163,184,0.12),rgba(148,163,184,0.30),rgba(148,163,184,0.12))] bg-[length:200%_100%] animate-shimmer" />
      <div className="mt-3 h-3 w-full rounded-md bg-[linear-gradient(90deg,rgba(148,163,184,0.10),rgba(148,163,184,0.22),rgba(148,163,184,0.10))] bg-[length:200%_100%] animate-shimmer" />
      <div className="mt-2 h-3 w-5/6 rounded-md bg-[linear-gradient(90deg,rgba(148,163,184,0.10),rgba(148,163,184,0.22),rgba(148,163,184,0.10))] bg-[length:200%_100%] animate-shimmer" />
      <div className="mt-5 flex justify-between">
        <div className="h-7 w-24 rounded-full bg-[linear-gradient(90deg,rgba(148,163,184,0.12),rgba(148,163,184,0.25),rgba(148,163,184,0.12))] bg-[length:200%_100%] animate-shimmer" />
        <div className="h-9 w-28 rounded-xl bg-[linear-gradient(90deg,rgba(148,163,184,0.12),rgba(148,163,184,0.25),rgba(148,163,184,0.12))] bg-[length:200%_100%] animate-shimmer" />
      </div>
    </div>
  );
}
