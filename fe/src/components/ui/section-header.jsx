import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SectionHeader({
  badge,
  title,
  description,
  linkText,
  linkHref,
  centered = false,
  isInView = true,
  className,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={cn(
        'flex gap-4 mb-10',
        centered
          ? 'flex-col items-center text-center max-w-3xl mx-auto mb-14'
          : 'flex-col sm:flex-row sm:items-end justify-between',
        className
      )}
    >
      <div>
        {badge && (
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-2">
            {badge}
          </span>
        )}
        <h2 className={cn("text-3xl sm:text-4xl font-bold text-foreground leading-tight", description ? "mb-4" : "")}>
          {title}
        </h2>
        {description && (
          <p className="text-muted-foreground text-base leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {linkText && linkHref && !centered && (
        <Link
          to={linkHref}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary
                     hover:gap-3 transition-all duration-200 group shrink-0"
        >
          {linkText}
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      )}
    </motion.div>
  );
}
