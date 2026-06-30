import { Button } from "@/components/ui/button";
import { Gamepad2 } from "lucide-react";

export function EmptyState({ icon: Icon = Gamepad2, title, description, action }) {
  return (
    <div className="border border-border p-12 text-center">
      <Icon className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
      {title && <p className="font-mono text-sm text-muted-foreground mb-2">{title}</p>}
      {description && (
        <p className="font-mono text-[10px] text-muted-foreground mb-4 tracking-widest uppercase">{description}</p>
      )}
      {action && (
        <Button variant="outline" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
