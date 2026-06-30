import { useState, useEffect, useRef, useCallback } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "@/context/app-context";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import { ShieldCheck } from "lucide-react";

function Breadcrumb({ pathname }) {
  const segments = [
    { label: "Dashboard", path: "/dashboard" },
    {
      label: pathname === "/dashboard" ? "Overview" : "Games",
      path: pathname,
      isActive: true,
    },
  ];

  return (
    <nav className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
      {segments.map((s, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span className="text-muted-foreground/30">/</span>}
          <span className={s.isActive ? "text-foreground font-bold" : ""}>{s.label}</span>
        </span>
      ))}
    </nav>
  );
}

export function DashboardLayout() {
  const location = useLocation();
  const { games, lastChange } = useAppContext();
  const mainRef = useRef(null);

  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  const toggleDark = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  }, []);

  const lastChangeRef = useRef(lastChange);

  // ── Logout ──
  const handleLogout = useCallback(() => {
    setLogoutConfirm(true);
  }, []);

  // ── Sync dark class on mount ──
  useEffect(() => {
    const isDarkClass = document.documentElement.classList.contains("dark");
    if (isDark !== isDarkClass) {
      document.documentElement.classList.toggle("dark", isDark);
    }
  }, []);

  // Track lastChange ref
  useEffect(() => {
    lastChangeRef.current = lastChange;
  }, [lastChange]);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-svh w-full bg-background">
        {/* ─── Sidebar ─── */}
        <AppSidebar isDark={isDark} toggleDark={toggleDark} onLogout={handleLogout} />

        {/* ─── Main Content ─── */}
        <SidebarInset>
          {/* ═══ Topbar ═══ */}
          <header className="flex items-center gap-3 px-4 md:px-8 py-3 border-b border-border bg-background sticky top-0 z-30">
            {/* Sidebar toggle */}
            <SidebarTrigger />

            {/* Brand icon + Breadcrumb */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <ShieldCheck className="h-5 w-5 shrink-0 hidden sm:block" style={{ color: "var(--sidebar-primary)" }} />
              <Breadcrumb pathname={location.pathname} />
            </div>
          </header>

          {/* ═══ Page Content ═══ */}
          <main ref={mainRef} className="flex-1 p-4 md:p-8 overflow-x-auto">
            <div className="max-w-7xl mx-auto">
              <Routes>
                <Route index />

                <Route path="games" />
              </Routes>
            </div>

            {/* ═══ Footer ═══ */}
            <footer className="mt-12 pt-6 border-t border-border">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[9px] text-muted-foreground tracking-widest uppercase">
                <span>IGRS Admin Panel v1.0 — Kementerian Komunikasi dan Digital RI</span>
                <span>
                  {games.length} game{games.length !== 1 ? "s" : ""} ·{" "}
                  {games.filter((g) => g.status === "published").length} published ·{" "}
                  {games.filter((g) => g.status === "draft").length} drafts
                </span>
              </div>
            </footer>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
