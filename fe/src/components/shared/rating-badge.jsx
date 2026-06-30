import { RATING_DISPLAY } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function RatingBadge({ rating, className, size = "sm" }) {
  const info = RATING_DISPLAY.find((r) => r.rating === rating);
  if (!info) return null;

  const sizeClasses = {
    xs: "text-[9px] px-1 py-0.5",
    sm: "text-xs px-2 py-1",
    md: "text-sm px-2.5 py-1",
  };

  return (
    <span
      className={cn(
        "font-mono font-bold border shrink-0",
        sizeClasses[size] || sizeClasses.sm,
        info.color,
        info.bg,
        className
      )}
    >
      {rating}
    </span>
  );
}
