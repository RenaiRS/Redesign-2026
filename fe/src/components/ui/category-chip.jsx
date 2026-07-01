import { cn } from '@/lib/utils';

export function CategoryChip({ label, onClick, className, active = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50",
        active 
          ? "bg-primary text-primary-foreground hover:bg-primary/90" 
          : "bg-[#0d3d47] text-white hover:bg-[#144f57]",
        className
      )}
    >
      {label}
    </button>
  );
}
