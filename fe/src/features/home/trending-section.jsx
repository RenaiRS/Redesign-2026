import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'motion/react';
import { ArrowRight, TrendingUp, Gamepad2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppContext } from '@/context/app-context';
import { TRENDING_GAME_IDS } from '@/data/home-data';
import { SectionHeader } from '@/components/ui/section-header';
import { FeaturedGameCard, GameListItem } from '@/components/shared/game-card';

// ─────────────────────────────────────────────────
// TrendingSection — Trending Minggu Ini
// Berisi: featured game card + trending list + CTA
// ─────────────────────────────────────────────────

export function TrendingSection() {
  const { games } = useAppContext();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  // Ambil game trending berdasarkan urutan TRENDING_GAME_IDS
  const trendingGames = TRENDING_GAME_IDS
    .map((id) => games.find((g) => g.id === id))
    .filter(Boolean)
    .slice(0, 5);

  const featuredGame = trendingGames[0] ?? null;
  const listGames = trendingGames.slice(1);

  return (
    <section
      id="trending"
      aria-labelledby="trending-heading"
      className="py-20 lg:py-28 bg-muted/30 dark:bg-muted/10"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <SectionHeader
          badge="Trending"
          title="Trending Minggu Ini"
          linkText="Lihat semua game"
          linkHref="/games"
          isInView={isInView}
        />

        {/* Content Grid */}
        {trendingGames.length === 0 ? (
          <EmptyTrending />
        ) : (
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Featured Game Card — Kiri, 2 kolom */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-2"
            >
              {featuredGame && <FeaturedGameCard game={featuredGame} />}
            </motion.div>

            {/* Trending List — Kanan, 3 kolom */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3 flex flex-col gap-3"
            >
              {listGames.map((game, i) => (
                <GameListItem key={game.id} game={game} rank={i + 2} index={i} isInView={isInView} />
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}



// ─────────────────────────────────────────────────
// EmptyTrending — State saat tidak ada game
// ─────────────────────────────────────────────────
function EmptyTrending() {
  return (
    <div className="text-center py-16">
      <Gamepad2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <p className="text-muted-foreground text-sm">Belum ada data game tersedia.</p>
    </div>
  );
}
