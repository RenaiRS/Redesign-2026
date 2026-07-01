import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

// ─────────────────────────────────────────────────
// CtaDeveloperSection — CTA Developer / Publisher
// Berisi: heading, description, 2 action buttons
// ─────────────────────────────────────────────────

const BENEFITS = [
  'Jangkau jutaan pengguna IGRS',
  'Sertifikasi rating resmi nasional',
  'Dashboard manajemen mudah',
  'Proses pendaftaran cepat & gratis',
];

export function CtaDeveloperSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="developer"
      aria-labelledby="developer-heading"
      className="relative py-20 lg:py-28 overflow-hidden"
      ref={ref}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d2e36] via-[#144f57] to-[#1a6b6b]" />

      {/* Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, #00bfa5 1px, transparent 1px)`,
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4">
              Untuk Developer & Publisher
            </span>
            <h2
              id="developer-heading"
              className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight"
            >
              Daftarkan Game Anda{' '}
              <span className="text-primary">Sekarang</span>
            </h2>
            <p className="text-base text-white/70 leading-relaxed mb-8 max-w-lg">
              Bergabunglah dengan ratusan developer dan publisher yang telah terdaftar di IGRS.
              Dapatkan sertifikasi rating resmi dan jangkau lebih banyak pengguna Indonesia.
            </p>

            {/* Benefits List */}
            <ul className="flex flex-col gap-2.5 mb-10" role="list">
              {BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 text-sm text-white/80">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5
                           bg-primary hover:bg-primary/90 text-primary-foreground
                           font-semibold text-sm rounded-xl
                           transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                           focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2
                           focus:ring-offset-transparent cursor-pointer"
              >
                Daftar Sekarang
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/rating-info"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5
                           bg-white/10 hover:bg-white/20 text-white
                           font-semibold text-sm rounded-xl border border-white/20
                           transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                           focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2
                           focus:ring-offset-transparent cursor-pointer"
              >
                Pelajari Lebih Lanjut
              </Link>
            </div>
          </motion.div>

          {/* Right: Visual Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="hidden lg:flex justify-center"
            aria-hidden="true"
          >
            <div className="relative w-full max-w-md">
              {/* Mock Dashboard Card */}
              <div className="rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm p-6 space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-white/15">
                  <img
                    src="/images/icons/igrs-logo logo.svg"
                    alt="IGRS"
                    className="h-7 w-auto brightness-0 invert"
                  />
                  <div>
                    <p className="text-white text-sm font-semibold">Dashboard Developer</p>
                    <p className="text-white/50 text-xs">Manage game ratings</p>
                  </div>
                </div>

                {/* Mock game rows */}
                {[
                  { title: 'Game A', rating: 'SU', color: 'bg-green-500' },
                  { title: 'Game B', rating: '13+', color: 'bg-yellow-500' },
                  { title: 'Game C', rating: '18+', color: 'bg-red-500' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="w-9 h-12 rounded-lg bg-white/10 shrink-0" />
                    <div className="flex-1">
                      <p className="text-white text-xs font-medium">{item.title}</p>
                      <p className="text-white/40 text-[10px] mt-0.5">Terdaftar & Terverifikasi</p>
                    </div>
                    <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded text-white ${item.color}`}>
                      {item.rating}
                    </span>
                  </div>
                ))}

                <div className="flex items-center justify-center pt-2">
                  <span className="text-white/30 text-xs">+ Tambah game baru</span>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground
                              text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                ✓ Gratis
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

