import { cn } from "@/lib/utils";

export function PlatformTags({ platforms, max = 3, className }) {
  if (!platforms?.length) return null;

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {platforms.slice(0, max).map((p) => (
        <span key={p} className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
          {p}
        </span>
      ))}
      {platforms.length > max && (
        <span className="font-mono text-[9px] text-muted-foreground">+{platforms.length - max}</span>
      )}
    </div>
  );
}

export function PlatformTagsInline({ platforms, max = 3, className }) {
  if (!platforms?.length) return null;

  return (
    <div className={cn("flex flex-wrap gap-1", className)}>
      {platforms.slice(0, max).map((p) => (
        <span key={p} className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
          {p}
        </span>
      ))}
      {platforms.length > max && (
        <span className="font-mono text-[9px] text-muted-foreground">+{platforms.length - max}</span>
      )}
    </div>
  );
}
