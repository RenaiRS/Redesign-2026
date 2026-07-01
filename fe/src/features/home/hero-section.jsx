import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { CategoryChip } from '@/components/ui/category-chip';

// ─────────────────────────────────────────────────
// Hero Section — Sesuai Figma halaman 1
//
// Layout:
//   - Kiri: Badge, Heading, Description, Search bar, Chips
//   - Kanan: Mosaic grid cover game
//   - Latar: Light teal #00bfa5
//   - Dekorasi: simbol ×, □, ○, checkered pattern
// ─────────────────────────────────────────────────

/** Saran pencarian populer (sesuai Figma) */
const QUICK_SEARCHES = ['Minecraft', 'Mobile Legends', 'Counter Strike', 'PUBG Mobile'];

/** Covers untuk mosaic kanan — urutan & pemilihan sesuai visual Figma */
const MOSAIC_COVERS = [
  { src: '/images/games/free fire.jpg', alt: 'Free Fire' },
  { src: '/images/games/PUBG.jpg', alt: 'PUBG Mobile' },
  { src: '/images/games/SUBWAYSURFERS.jpeg', alt: 'Subway Surfers' },
  { src: '/images/games/Resident_Evil_4_remake_cover_art.jpg', alt: 'Resident Evil 4' },
  { src: '/images/games/pubggp1.jpeg', alt: 'PUBG GP' },
  { src: '/images/games/dragon city.jpg', alt: 'Dragon City' },
  { src: '/images/games/Terraria Community Forums.jpeg', alt: 'Minecraft-like' },
  { src: '/images/games/nba2k17.png', alt: 'NBA 2K' },
  { src: '/images/games/cyberpunk.jpeg', alt: 'Cyberpunk' },
  { src: '/images/games/GENSHIN.jpeg', alt: 'Genshin Impact' },
  { src: '/images/games/wario.png', alt: 'Wario' },
  { src: '/images/games/gtav.jpeg', alt: 'GTA V' },
  { src: '/images/games/godofwarr.jpeg', alt: 'God of War' },
  { src: '/images/games/P5.png', alt: 'Persona 5' },
  { src: '/images/games/outlast.png', alt: 'Outlast' },
  { src: '/images/games/pokemongo.jpeg', alt: 'Pokemon GO' },
  { src: '/images/games/pubggp2.jpeg', alt: 'PUBG Variant' },
  { src: '/images/games/Fall Guys - PS4 & PS5 Games _ PlayStation.jpeg', alt: 'Fall Guys' },
  { src: '/images/games/fm12.png', alt: 'Football Manager' },
  { src: '/images/games/fruitninja.jpeg', alt: 'Fruit Ninja' },
  { src: '/images/games/fortnite.png', alt: 'Fortnite' },
  { src: '/images/games/YAKUZALAD.jpeg', alt: 'Yakuza' },
  { src: '/images/games/GTA6 COVERR.jpg', alt: 'GTA 6' },
  { src: '/images/games/mole.jpg', alt: 'Whack a Mole' },
  { src: '/images/games/pubggp1.jpeg', alt: 'PUBG 3' },
];

// ─────────────────────────────────────────────────
// HeroSection
// ─────────────────────────────────────────────────
export function HeroSection() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      const q = searchQuery.trim();
      navigate(q ? `/games?q=${encodeURIComponent(q)}` : '/games');
    },
    [searchQuery, navigate],
  );

  const handleQuickSearch = useCallback(
    (term) => navigate(`/games?q=${encodeURIComponent(term)}`),
    [navigate],
  );

  return (
    <section
      id="hero"
      aria-label="Hero — IGRS Landing Page"
      className="relative min-h-screen overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #00bfa5 0%, #00d4b8 50%, #00bfa5 100%)' }}
    >
      {/* ── Dekorasi latar belakang ── */}
      <HeroDecorations />

      {/* ── Konten utama ── */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 pb-12 lg:pt-0 lg:pb-0">

          {/* Kiri: Text content — maksimum 50% layar */}
          <div className="lg:w-[50%] xl:w-[46%] flex flex-col gap-5 lg:gap-6">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                           border border-white/50 bg-white/15 text-white text-xs font-medium
                           backdrop-blur-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shrink-0" />
                Portal Resmi Rating Gim Indonesia
              </span>
            </motion.div>

            {/* Heading — "Tau RATING dulu / Baru Seru GAMING!" */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl text-white leading-tight tracking-tight"
            >
              Tau{' '}
              <span className="font-black">RATING</span>
              {' '}dulu
              <br />
              Baru Seru{' '}
              <span className="font-black">GAMING!</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="text-white/85 text-sm sm:text-base leading-relaxed max-w-md"
            >
              Kenali game yang tepat untuk anak sesuai rating. Platform terpercaya untuk
              membantu orang tua memilih konten game yang aman dan sesuai usia.
            </motion.p>

            {/* Search Bar */}
            <motion.form
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              onSubmit={handleSearch}
              className="flex items-stretch bg-white rounded-2xl overflow-hidden shadow-lg max-w-md"
              role="search"
            >
              <input
                type="search"
                id="hero-search-input"
                name="q"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari Gim : Valorant"
                aria-label="Cari game berdasarkan nama"
                className="flex-1 min-w-0 px-5 py-4 text-sm text-gray-700
                           placeholder-gray-400 outline-none bg-transparent"
              />
              <button
                type="submit"
                className="px-7 py-4 bg-orange-500 hover:bg-orange-600 active:bg-orange-700
                           text-white font-semibold text-sm shrink-0
                           transition-colors duration-200 cursor-pointer"
              >
                Cari
              </button>
            </motion.form>

            {/* Quick Search Chips */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.32 }}
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Pencarian populer"
            >
              {QUICK_SEARCHES.map((term) => (
                <CategoryChip
                  key={term}
                  label={term}
                  onClick={() => handleQuickSearch(term)}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Cover Mosaic — kanan (absolut) ── */}
      <div
        className="absolute top-16 right-0 bottom-0 w-[56%] hidden lg:block"
        aria-hidden="true"
      >
        {/* Gradient fade kiri agar smooth dengan konten */}
        <div
          className="absolute left-0 top-0 bottom-0 w-36 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #00bfa5, transparent)' }}
        />
        {/* Gradient fade bawah */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #00bfa5, transparent)' }}
        />

        {/* Grid 4 kolom × 5 baris — mengisi penuh tinggi section */}
        <div className="h-full grid grid-cols-4 grid-rows-[repeat(5,_1fr)] gap-2 p-3">
          {MOSAIC_COVERS.slice(0, 20).map((cover, i) => (
            <CoverCard key={i} src={cover.src} alt={cover.alt} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────
// CoverCard — Satu kartu cover game dalam mosaic
// ─────────────────────────────────────────────────
function CoverCard({ src, alt, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay: 0.15 + index * 0.025 }}
      className="relative rounded-xl overflow-hidden bg-[#009e8e]/50"
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading={index < 8 ? 'eager' : 'lazy'}
        draggable={false}
      />
    </motion.div>
  );
}

// ─────────────────────────────────────────────────
// HeroDecorations — Elemen dekoratif geometris
// Sesuai Figma: × (lavender), □ ○ (salmon/orange),
// checkerboard pattern kiri bawah
// ─────────────────────────────────────────────────
function HeroDecorations() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Simbol × — atas kiri */}
      <DecorCross
        className="absolute top-24 left-6 text-purple-300/70 text-4xl"
        size="lg"
      />
      {/* Simbol × — tengah kiri */}
      <DecorCross
        className="absolute top-1/2 -translate-y-1/2 left-16 text-purple-200/50 text-3xl"
        size="md"
      />
      {/* Simbol × — bawah tengah */}
      <DecorCross
        className="absolute bottom-28 left-[35%] text-purple-300/40 text-5xl"
        size="xl"
      />

      {/* □ Kotak outline — tengah */}
      <DecorSquare className="absolute top-[38%] left-[28%] w-9 h-9 border-orange-300/60 border-3" />
      {/* □ Kotak kecil — atas kanan (area konten) */}
      <DecorSquare className="absolute top-32 left-[42%] w-6 h-6 border-red-300/50 border-2" />

      {/* ○ Lingkaran outline — kiri tengah bawah */}
      <DecorCircle className="absolute top-[62%] left-7 w-9 h-9 border-orange-300/60 border-2" />
      {/* ○ Lingkaran kecil */}
      <DecorCircle className="absolute top-[30%] left-[22%] w-5 h-5 border-red-300/40 border-2" />

      {/* Checkered pattern — pojok kiri bawah */}
      <div
        className="absolute bottom-0 left-0 w-44 h-36 opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(45deg, #007a6a 25%, transparent 25%),
            linear-gradient(-45deg, #007a6a 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #007a6a 75%),
            linear-gradient(-45deg, transparent 75%, #007a6a 75%)
          `,
          backgroundSize: '18px 18px',
          backgroundPosition: '0 0, 0 9px, 9px -9px, -9px 0px',
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────
// Dekor Primitives
// ─────────────────────────────────────────────────
function DecorCross({ className }) {
  return (
    <span className={cn('font-black leading-none', className)}>✕</span>
  );
}

function DecorSquare({ className }) {
  return <div className={cn('border rounded-sm', className)} />;
}

function DecorCircle({ className }) {
  return <div className={cn('border rounded-full', className)} />;
}

