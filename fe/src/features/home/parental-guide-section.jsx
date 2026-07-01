import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CONTENT_CATEGORIES } from '@/data/home-data';
import { SectionHeader } from '@/components/ui/section-header';
import { ContentCategoryCard } from '@/components/shared/content-category-card';

// ─────────────────────────────────────────────────
// ParentalGuideSection — Panduan Orang Tua
// Berisi: grid kategori konten & deskriptor
// ─────────────────────────────────────────────────

export function ParentalGuideSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="panduan"
      aria-labelledby="panduan-heading"
      className="py-20 lg:py-28 bg-background"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <SectionHeader
          centered
          badge="Panduan Orang Tua"
          title={<>Pahami <span className="text-primary">Deskriptor Konten</span> dengan Mudah</>}
          description="Setiap game memiliki label konten yang jelas untuk membantu orang tua mengenali jenis konten yang terdapat dalam game sebelum mengizinkan anak bermain."
          isInView={isInView}
        />

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          {CONTENT_CATEGORIES.map((category, i) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
            >
              <ContentCategoryCard category={category} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="text-center"
        >
          <Link
            to="/rating-info"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary
                       hover:gap-3 transition-all duration-200 group
                       border border-primary/30 px-6 py-3 rounded-xl hover:bg-primary/5"
          >
            Lihat panduan lengkap
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}


