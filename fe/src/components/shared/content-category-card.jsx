import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function ContentCategoryCard({ category }) {
  return (
    <Link
      to="/rating-info"
      aria-label={`Kategori konten: ${category.label}`}
      className={cn(
        'group flex flex-col items-center gap-3 p-5 rounded-2xl border',
        'hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer',
        category.color,
        category.borderColor,
      )}
    >
      {/* Icon Container */}
      <div
        className={cn(
          'w-14 h-14 rounded-xl flex items-center justify-center',
          'transition-transform duration-300 group-hover:scale-110',
          category.iconBg,
        )}
      >
        <img
          src={category.icon}
          alt={category.label}
          className="w-9 h-9 object-contain"
          loading="lazy"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </div>

      {/* Text */}
      <div className="text-center">
        <p className="font-semibold text-sm text-foreground mb-0.5">{category.label}</p>
        <p className="text-[11px] text-muted-foreground leading-snug">{category.description}</p>
      </div>
    </Link>
  );
}
