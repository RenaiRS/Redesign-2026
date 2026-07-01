import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'motion/react';
import { ArrowRight, CalendarDays, Clock, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BLOG_POSTS } from '@/data/home-data';
import { SectionHeader } from '@/components/ui/section-header';
import { BlogCard } from '@/components/shared/blog-card';

// ─────────────────────────────────────────────────
// BlogSection — Blog & Pengumuman
// Berisi: article cards, thumbnail, metadata, CTA


const BLOG_THUMBNAILS = [
  '/images/icons/Gemini_Generated_Image_1ki8ih1ki8ih1ki8.png',
  '/images/games/Terraria Community Forums.jpeg',
  '/images/games/GENSHIN.jpeg',
];

export function BlogSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="blog"
      aria-labelledby="blog-heading"
      className="py-20 lg:py-28 bg-muted/30 dark:bg-muted/10"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <SectionHeader
          badge="Blog & Pengumuman"
          title="Artikel & Berita Terbaru"
          linkText="Lihat semua artikel"
          linkHref="/blog"
          isInView={isInView}
        />

        {/* Blog Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            >
              <BlogCard post={post} thumbnailSrc={BLOG_THUMBNAILS[i]} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}



