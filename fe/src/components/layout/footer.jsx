import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { FOOTER_LINKS } from '@/data/home-data';

// ─────────────────────────────────────────────────
// Footer — Komponen footer publik
// ─────────────────────────────────────────────────

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="bg-[#144f57] text-[#fdf8f1] dark:bg-[#0a252c]"
    >
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 group mb-4" aria-label="IGRS Beranda">
              <img
                src="/images/icons/igrs-logo logo.svg"
                alt="Logo IGRS"
                className="h-9 w-auto brightness-0 invert transition-transform duration-200 group-hover:scale-105"
              />
              <div className="flex flex-col leading-none">
                <span className="font-bold text-base text-white tracking-tight">IGRS</span>
                <span className="text-[10px] text-white/60 tracking-widest uppercase">
                  Indonesian Game Rating System
                </span>
              </div>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed max-w-xs">
              Sistem rating game resmi Indonesia yang memberikan informasi konten yang transparan
              untuk melindungi keluarga Indonesia.
            </p>

            {/* Rating Icons */}
            <div className="flex items-center gap-2 mt-6" aria-label="Kategori rating IGRS">
              {['igrs-logo 3.svg', 'igrs-logo 7.svg', 'igrs-logo 13.svg', 'igrs-logo 17.svg', 'igrs-logo 18.svg'].map(
                (icon) => (
                  <img
                    key={icon}
                    src={`/images/icons/${icon}`}
                    alt={icon.replace('igrs-logo ', 'Rating ').replace('.svg', '')}
                    className="h-8 w-auto opacity-70 hover:opacity-100 transition-opacity duration-200"
                  />
                ),
              )}
            </div>
          </div>

          {/* Layanan */}
          <FooterColumn title="Layanan" links={FOOTER_LINKS.layanan} />

          {/* Informasi */}
          <FooterColumn title="Informasi" links={FOOTER_LINKS.informasi} />

          {/* Kontak */}
          <div>
            <h3 className="font-semibold text-sm text-white uppercase tracking-widest mb-4">
              Kontak
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.kontak.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/60 hover:text-white transition-colors duration-200 hover:underline underline-offset-4"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-200 hover:underline underline-offset-4"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/50 text-center sm:text-left">
              &copy; {currentYear} IGRS — Indonesian Game Rating System. Hak cipta dilindungi.
            </p>
            <div className="flex items-center gap-5">
              <FooterBottomLink to="/privacy">Kebijakan Privasi</FooterBottomLink>
              <FooterBottomLink to="/terms">Syarat Layanan</FooterBottomLink>
              <FooterBottomLink to="/sitemap">Peta Situs</FooterBottomLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────
// FooterColumn — Kolom navigasi footer
// ─────────────────────────────────────────────────
function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="font-semibold text-sm text-white uppercase tracking-widest mb-4">{title}</h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.path}
              className="text-sm text-white/60 hover:text-white transition-colors duration-200 hover:underline underline-offset-4"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─────────────────────────────────────────────────
// FooterBottomLink — Link di bottom bar footer
// ─────────────────────────────────────────────────
function FooterBottomLink({ to, children }) {
  return (
    <Link
      to={to}
      className="text-xs text-white/40 hover:text-white/80 transition-colors duration-200"
    >
      {children}
    </Link>
  );
}

