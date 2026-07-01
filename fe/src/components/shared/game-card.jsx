import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Gamepad2, TrendingUp } from 'lucide-react';
import { COVER_IMAGES } from '@/data/home-data';
import { RATING_DISPLAY } from '@/lib/constants';
import { RatingBadge } from '@/components/shared/rating-badge';

export function FeaturedGameCard({ game }) {
  const coverUrl = COVER_IMAGES[game.title];
  const ratingInfo = RATING_DISPLAY.find((r) => r.rating === game.rating);

  return (
    <Link
      to={`/games/${game.id}`}
      className="group block h-full"
      aria-label={`Game featured: ${game.title}`}
    >
      <article className="relative rounded-2xl overflow-hidden bg-card border border-border
                          h-[380px] lg:h-full min-h-[340px]
                          hover:border-primary/40 hover:shadow-xl transition-all duration-300">
        {/* Cover Image */}
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={`Cover ${game.title}`}
            className="absolute inset-0 w-full h-full object-cover
                       transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#144f57] to-[#0d2e36]
                          flex items-center justify-center">
            <Gamepad2 className="h-16 w-16 text-white/20" />
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          {/* Featured Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
                          bg-primary/90 text-primary-foreground text-[10px] font-bold
                          uppercase tracking-wider mb-3">
            <TrendingUp className="h-3 w-3" />
            #1 Trending
          </div>

          <h3 className="font-bold text-lg text-white leading-tight mb-1.5 line-clamp-2">
            {game.title}
          </h3>
          <p className="text-xs text-white/70 mb-3">{game.developer}</p>

          <div className="flex items-center gap-2">
            <RatingBadge rating={game.rating} size="sm" />
            <span className="text-[10px] text-white/60">
              {ratingInfo?.text ?? game.rating}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export function GameListItem({ game, rank, index, isInView = true }) {
  const coverUrl = COVER_IMAGES[game.title];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.25 + (index || 0) * 0.08 }}
    >
      <Link
        to={`/games/${game.id}`}
        className="group flex items-center gap-4 p-4 rounded-xl
                   bg-card border border-border
                   hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5
                   transition-all duration-300"
        aria-label={`#${rank} ${game.title}`}
      >
        {/* Rank */}
        {rank && (
          <span className="shrink-0 w-7 text-lg font-bold text-muted-foreground/40 font-mono text-center">
            {rank}
          </span>
        )}

        {/* Cover */}
        <div className="shrink-0 w-12 h-16 rounded-lg overflow-hidden bg-muted border border-border">
          {coverUrl ? (
            <img
              src={coverUrl}
              alt={`Cover ${game.title}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Gamepad2 className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-foreground truncate group-hover:text-primary transition-colors duration-200">
            {game.title}
          </p>
          <p className="text-xs text-muted-foreground truncate mt-0.5">{game.developer}</p>
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            {game.platforms?.slice(0, 2).map((p) => (
              <span
                key={p}
                className="text-[9px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground
                           font-mono uppercase tracking-wider"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div className="shrink-0">
          <RatingBadge rating={game.rating} size="sm" />
        </div>
      </Link>
    </motion.div>
  );
}
