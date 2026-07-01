import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/data/home-data';

// ─────────────────────────────────────────────────
// Navbar — Navigasi publik utama
// Transparan di atas hero (light teal), solid saat scroll
// Mobile: hamburger drawer
// ─────────────────────────────────────────────────

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Solid navbar setelah scroll melewati hero
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tutup drawer saat pindah halaman
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock scroll saat drawer terbuka
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        role="banner"
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent',
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link
              to="/"
              aria-label="IGRS — Halaman Utama"
              className="flex items-center gap-2.5 shrink-0 group"
            >
              <img
                src="/images/icons/igrs-logo logo.svg"
                alt="Logo IGRS"
                className="h-8 w-auto transition-transform duration-200 group-hover:scale-105"
              />
              <div className="flex flex-col leading-none">
                <span className="font-bold text-sm text-[#144f57] tracking-tight">IGRS</span>
                <span className="text-[9px] text-[#144f57]/60 tracking-widest uppercase hidden sm:block">
                  Indonesian Game Rating System
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav
              role="navigation"
              aria-label="Navigasi utama"
              className="hidden lg:flex items-center gap-1"
            >
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  isActive={location.pathname === link.path}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Action Buttons + Mobile Toggle */}
            <div className="flex items-center gap-2">
              {/* Masuk — ghost */}
              <Link
                to="/login"
                className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium
                           text-[#144f57] rounded-lg border border-[#144f57]/30
                           hover:bg-[#144f57]/5 transition-all duration-200"
              >
                Masuk
              </Link>

              {/* Daftar — filled dark */}
              <Link
                to="/login"
                className="hidden sm:inline-flex items-center px-5 py-2 text-sm font-semibold
                           bg-[#144f57] text-white rounded-lg
                           hover:bg-[#0d3d47] transition-all duration-200
                           hover:scale-[1.02] active:scale-[0.98]"
              >
                Daftar
              </Link>

              {/* Mobile hamburger */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((p) => !p)}
                aria-label={isMobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-nav-menu"
                className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg
                           text-[#144f57] hover:bg-[#144f57]/10 transition-colors"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          aria-hidden="true"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        id="mobile-nav-menu"
        role="dialog"
        aria-label="Navigasi mobile"
        aria-modal="true"
        className={cn(
          'fixed top-0 right-0 bottom-0 z-50 w-72 bg-white shadow-2xl lg:hidden',
          'flex flex-col transition-transform duration-300 ease-in-out',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <img src="/images/icons/igrs-logo logo.svg" alt="IGRS" className="h-7 w-auto" />
            <span className="font-bold text-sm text-[#144f57]">IGRS</span>
          </Link>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Tutup menu"
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="h-4 w-4 text-[#144f57]" />
          </button>
        </div>

        {/* Drawer Links */}
        <nav className="flex-1 overflow-y-auto py-4 px-2" aria-label="Navigasi mobile">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                'flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-150',
                location.pathname === link.path
                  ? 'bg-[#00bfa5]/10 text-[#00bfa5]'
                  : 'text-[#144f57] hover:bg-gray-50',
              )}
            >
              {link.label}
              <ChevronRight className="h-4 w-4 opacity-40" />
            </Link>
          ))}
        </nav>

        {/* Drawer CTA */}
        <div className="p-4 border-t border-gray-100 flex flex-col gap-2">
          <Link
            to="/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-center px-5 py-2.5 text-sm font-semibold
                       border border-[#144f57]/30 text-[#144f57] rounded-lg
                       hover:bg-[#144f57]/5 transition-colors"
          >
            Masuk
          </Link>
          <Link
            to="/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center justify-center px-5 py-2.5 text-sm font-semibold
                       bg-[#144f57] text-white rounded-lg hover:bg-[#0d3d47] transition-colors"
          >
            Daftar
          </Link>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────
// NavLink — Link navigasi desktop dengan active state
// ─────────────────────────────────────────────────
function NavLink({ to, children, isActive }) {
  return (
    <Link
      to={to}
      className={cn(
        'relative px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200',
        isActive
          ? 'text-[#144f57] font-semibold'
          : 'text-[#144f57]/80 hover:text-[#144f57] hover:bg-[#144f57]/5',
      )}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-[#00bfa5]" />
      )}
    </Link>
  );
}

