import { Gamepad2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function CoverImage({ src, alt = "", className, iconSize }) {
  if (!src) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-muted border border-border overflow-hidden shrink-0",
          className
        )}
      >
        <Gamepad2 className={cn("text-muted-foreground", iconSize || "h-5 w-5")} />
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden shrink-0 border border-border bg-muted", className)}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />
    </div>
  );
}
