import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/features/home/hero-section';
import { AboutSection } from '@/features/home/about-section';
import { TrendingSection } from '@/features/home/trending-section';
import { ParentalGuideSection } from '@/features/home/parental-guide-section';
import { BlogSection } from '@/features/home/blog-section';
import { CtaDeveloperSection } from '@/features/home/cta-developer-section';

// ─────────────────────────────────────────────────
// HomePage — Halaman Landing Page Utama IGRS
//
// Sections (urutan sesuai Figma):
//   1. Navbar
//   2. Hero Section
//   3. Tentang IGRS
//   4. Trending Minggu Ini
//   5. Panduan Orang Tua
//   6. Blog & Pengumuman
//   7. CTA Developer / Publisher
//   8. Footer
// ─────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigasi utama — sticky */}
      <Navbar />

      {/* Main content */}
      <main id="main-content" role="main">
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Tentang IGRS */}
        <AboutSection />

        {/* 3. Trending Minggu Ini */}
        <TrendingSection />

        {/* 4. Panduan Orang Tua */}
        <ParentalGuideSection />

        {/* 5. Blog & Pengumuman */}
        <BlogSection />

        {/* 6. CTA Developer / Publisher */}
        <CtaDeveloperSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
