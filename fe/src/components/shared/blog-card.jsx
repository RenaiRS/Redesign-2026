import { Link } from 'react-router-dom';
import { CalendarDays, Clock, Tag, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/utils';

const CATEGORY_COLORS = {
  Panduan: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  Rekomendasi: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  Edukasi: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  Pengumuman: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
};

export function BlogCard({ post, thumbnailSrc }) {
  const categoryColor = CATEGORY_COLORS[post.category] ?? CATEGORY_COLORS.Panduan;

  return (
    <Link
      to={`/blog/${post.slug}`}
      aria-label={`Baca artikel: ${post.title}`}
      className="group block h-full"
    >
      <article className="h-full flex flex-col rounded-2xl border border-border bg-card overflow-hidden
                          hover:border-primary/30 hover:shadow-lg hover:-translate-y-1
                          transition-all duration-300">
        {/* Thumbnail */}
        <div className="relative h-48 overflow-hidden bg-muted shrink-0">
          {thumbnailSrc ? (
            <img
              src={thumbnailSrc}
              alt={`Thumbnail artikel ${post.title}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#144f57] to-[#00bfa5]/50
                            flex items-center justify-center">
              <span className="text-white/30 text-4xl font-bold">{post.category[0]}</span>
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold', categoryColor)}>
              <Tag className="h-3 w-3" />
              {post.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-3 p-5 flex-1">
          {/* Title */}
          <h3 className="font-bold text-base text-foreground leading-snug line-clamp-2
                         group-hover:text-primary transition-colors duration-200">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 pt-2 border-t border-border">
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <CalendarDays className="h-3 w-3" />
              {formatDate(post.date, { month: 'short' })}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </div>
            <div className="ml-auto text-[11px] font-semibold text-primary flex items-center gap-1
                            group-hover:gap-2 transition-all duration-200">
              Baca
              <ArrowRight className="h-3 w-3" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
