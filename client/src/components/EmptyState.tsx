import { ClipboardList } from "lucide-react";
import { Button } from "./Button";

export function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white/60 p-10 text-center shadow-soft dark:border-slate-800 dark:bg-slate-900/40">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400">
        <ClipboardList className="h-7 w-7" />
      </div>
      <h2 className="mt-5 text-xl font-semibold">No tasks yet</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Add your first task and keep everything organized.
      </p>
      <div className="mt-6 flex justify-center">
        <Button variant="primary" onClick={onAdd}>
          Create task
        </Button>
      </div>
    </div>
  );
}
