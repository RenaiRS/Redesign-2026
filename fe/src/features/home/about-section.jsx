import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useAppContext } from '@/context/app-context';
import { StatisticCard } from '@/components/shared/statistic-card';

// ─────────────────────────────────────────────────
// AboutSection — "Tentang IGRS"
//
// Layout sesuai Figma:
//  1. Judul "Tentang IGRS" — teal, centered, bold
//  2. Card krem: kiri (heading + deskripsi) | kanan (3 item bernomor)
//  3. Stats row: 5 badge rating + angka + label
// ─────────────────────────────────────────────────

/** Item fungsi IGRS yang ditampilkan di kanan card */
const ABOUT_ITEMS = [
  {
    id: '01',
    title: 'Untuk orang tua',
    description: 'Pilih game yang sesuai usia dan nilai anak Anda dengan mudah.',
  },
  {
    id: '02',
    title: 'Untuk gamer',
    description: 'Ketahui konten game sebelum membeli atau mengunduh.',
  },
  {
    id: '03',
    title: 'Untuk publisher',
    description: 'Daftarkan dan klasifikasikan game Anda sesuai Permenkominfo No. 2/2024.',
  },
];

/** Rating badge images — sesuai file di /public/images/icons/ */
const RATING_STATS = [
  {
    id: 'stat-3',
    badge: '/images/icons/3.png',
    alt: 'Rating 3+ IGRS',
    rating: '3+',
    label: 'Jumlah Gim Dengan\nrating 3+',
    ratingKey: 'SU',
  },
  {
    id: 'stat-7',
    badge: '/images/icons/7.png',
    alt: 'Rating 7+ IGRS',
    rating: '7+',
    label: 'Jumlah Gim Dengan\nrating 7+',
    ratingKey: '7+',
  },
  {
    id: 'stat-13',
    badge: '/images/icons/13.png',
    alt: 'Rating 13+ IGRS',
    rating: '13+',
    label: 'Jumlah Gim Dengan\nrating 13+',
    ratingKey: '13+',
  },
  {
    id: 'stat-15',
    badge: '/images/icons/15.png',
    alt: 'Rating 15+ IGRS',
    rating: '15+',
    label: 'Jumlah Gim Dengan\nrating 15+',
    ratingKey: '15+',
  },
  {
    id: 'stat-18',
    badge: '/images/icons/18.png',
    alt: 'Rating 18+ IGRS',
    rating: '18+',
    label: 'Jumlah Gim Dengan\nrating 18+',
    ratingKey: '18+',
  },
];

// ─────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────
export function AboutSection() {
  const { games } = useAppContext();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  // Hitung jumlah game per rating dari data live
  const countByRating = (ratingKey) =>
    games.filter((g) => g.rating === ratingKey).length;

  return (
    <section
      id="tentang"
      aria-labelledby="tentang-heading"
      className="py-14 lg:py-20 bg-white"
      ref={ref}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Title ── */}
        <motion.h2
          id="tentang-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="text-center text-3xl sm:text-4xl font-bold text-[#00bfa5] mb-10 lg:mb-12"
        >
          Tentang IGRS
        </motion.h2>

        {/* ── Main Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="rounded-3xl p-8 sm:p-10 lg:p-12 mb-10 lg:mb-12"
          style={{ backgroundColor: '#f5f0e8' }}
        >
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

            {/* Left: IGRS description */}
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl lg:text-3xl font-black text-gray-900 leading-snug mb-5">
                <span className="text-[#00bfa5]">IGRS</span>
                {' '}atau Klasifikasi Permainan Interaktif Elektronik{' '}
                <span className="text-[#00bfa5]">(KPIE)</span>
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Sistem klasifikasi konten game resmi Indonesia, dikembangkan oleh Kementerian
                Komunikasi dan Digital RI untuk melindungi anak dan mendukung distribusi game
                yang bertanggung jawab.
              </p>
            </div>

            {/* Right: Numbered items */}
            <div className="flex flex-col gap-6 lg:gap-7 justify-center">
              {ABOUT_ITEMS.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.18 + i * 0.1 }}
                >
                  <NumberedItem item={item} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Stats Row ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="flex flex-wrap sm:flex-nowrap items-start justify-between gap-4 sm:gap-2"
          role="list"
          aria-label="Statistik jumlah game per kategori rating"
        >
          {RATING_STATS.map((stat, i) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.35, delay: 0.35 + i * 0.07 }}
              role="listitem"
              className="flex-1 min-w-[140px] sm:min-w-0"
            >
              <StatisticCard
                badge={stat.badge}
                alt={stat.alt}
                count={countByRating(stat.ratingKey)}
                label={stat.label}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────
// NumberedItem — Item bernomor 01 / 02 / 03
// ─────────────────────────────────────────────────
function NumberedItem({ item }) {
  return (
    <div className="flex items-start gap-4">
      {/* Angka dekoratif besar */}
      <span
        className="text-5xl lg:text-6xl font-black leading-none shrink-0 select-none"
        aria-hidden="true"
        style={{ color: '#c8d4d0' }}
      >
        {item.id}
      </span>

      {/* Konten */}
      <div className="pt-1">
        <h4 className="font-bold text-gray-900 text-base mb-1">{item.title}</h4>
        <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
      </div>
    </div>
  );
}



