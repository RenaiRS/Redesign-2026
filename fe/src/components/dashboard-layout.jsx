import { useState, useEffect, useRef, useCallback } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "@/context/app-context";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import {
  ShieldCheck,
  LogOut,
  Bell,
  ChevronDown,
  RefreshCw,
  Maximize2,
  Minimize2,
  Clock,
  Terminal,
  Search,
} from "lucide-react";
import { cn, pluralize, countByStatus } from "@/lib/utils";
import { RatingBadge } from "@/components/shared/rating-badge";
import { CoverImage } from "@/components/shared/cover-image";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AppSidebar } from "@/components/app-sidebar";
import { OverviewPage } from "@/components/overview-content";
import { GamesManagement, GameFormModal, DeleteConfirm } from "@/components/game-management";

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

function StatusIndicator({ games }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const timeStr = currentTime.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="relative hidden sm:flex items-center gap-2 font-mono text-[9px] text-muted-foreground tracking-widest uppercase">
      <Separator orientation="vertical" />

      <Clock className="h-3 w-3" />
      <span>{timeStr}</span>
    </div>
  );
}

function QuickActions({ onLogout }) {
  const [open, setOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const actionItems = [
    {
      icon: RefreshCw,
      label: "Refresh Data",
      shortcut: "Ctrl+R",
      action: () => window.location.reload(),
    },
    {
      icon: isFullscreen ? Minimize2 : Maximize2,
      label: isFullscreen ? "Exit Fullscreen" : "Fullscreen",
      shortcut: "F11",
      action: toggleFullscreen,
    },
    {
      icon: Bell,
      label: "Notifications",
      shortcut: "",
      badge: "3",
      action: () => {},
    },
    { divider: true },
    {
      icon: LogOut,
      label: "Logout",
      shortcut: "",
      action: onLogout,
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 border border-border bg-card hover:bg-muted transition-colors px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
      >
        <Terminal className="h-3 w-3" />
        <span className="hidden md:inline">Actions</span>
        <ChevronDown className="h-2.5 w-2.5" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-20 min-w-50 border border-border bg-card shadow-lg">
            {actionItems.map((item, i) => {
              if (item.divider) {
                return <div key={i} className="border-t border-border my-1" />;
              }
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    item.action();
                    setOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-muted transition-colors font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
                >
                  <span className="flex items-center gap-2">
                    <Icon className="h-3 w-3" />
                    {item.label}
                  </span>
                  <span className="flex items-center gap-1">
                    {item.badge && (
                      <span className="px-1.5 py-0.5 border border-border text-[8px] bg-muted">{item.badge}</span>
                    )}
                    {item.shortcut && (
                      <kbd className="px-1 py-0.5 border border-border text-[8px] bg-muted">{item.shortcut}</kbd>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function QuickSearch({ games }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  const handleSearch = useCallback(
    (q) => {
      setQuery(q);
      if (!q.trim()) {
        setResults([]);
        return;
      }
      const lq = q.toLowerCase();
      setResults(
        games.filter((g) => g.title.toLowerCase().includes(lq) || g.developer.toLowerCase().includes(lq)).slice(0, 5)
      );
    },
    [games]
  );

  const selectGame = useCallback(
    (id) => {
      setQuery("");
      setResults([]);
      setFocused(false);
      navigate("/dashboard/games");
    },
    [navigate]
  );

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="relative hidden md:block w-64">
      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
      <Input
        ref={inputRef}
        placeholder="Search games... (Ctrl+K)"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 200)}
        className="pl-8 "
      />
      {focused && query && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 border border-border bg-card shadow-lg z-20">
          {results.map((game) => (
            <button
              key={game.id}
              onMouseDown={() => selectGame(game.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-muted transition-colors text-left"
            >
              <CoverImage src={game.coverUrl} className="w-7 h-9" iconSize="h-3 w-3" />
              <div className="flex-1 min-w-0">
                <p className="font-mono text-xs font-medium truncate">{game.title}</p>
                <p className="font-mono text-[10px] text-muted-foreground truncate">{game.developer}</p>
              </div>
              <RatingBadge rating={game.rating} size="xs" />
            </button>
          ))}
        </div>
      )}
      {focused && query && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 border border-border bg-card p-3 z-20">
          <p className="font-mono text-[10px] text-muted-foreground italic text-center">No games found</p>
        </div>
      )}
    </div>
  );
}

export function DashboardLayout() {
  const location = useLocation();
  const { games, logout, lastChange, addGame, updateGame, deleteGame, toggleStatus } = useAppContext();
  const navigate = useNavigate();
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

  const [formOpen, setFormOpen] = useState(false);
  const [editingGame, setEditingGame] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = "info") => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 2500);
  }, []);

  const lastChangeRef = useRef(lastChange);

  const handleAdd = useCallback(
    (data) => {
      addGame(data);
      setFormOpen(false);
      showToast("Game added successfully", "success");
    },
    [addGame, showToast]
  );

  const handleEdit = useCallback(
    (data) => {
      updateGame(editingGame.id, data);
      setEditingGame(null);
      setFormOpen(false);
      showToast("Game updated successfully", "success");
    },
    [editingGame, updateGame, showToast]
  );

  const handleDelete = useCallback(() => {
    if (deleteTarget) {
      deleteGame(deleteTarget.id);
      setDeleteTarget(null);
      showToast(`"${deleteTarget.title}" deleted`, "warning");
    }
  }, [deleteTarget, deleteGame, showToast]);

  const openEdit = useCallback(
    (id) => {
      const game = games.find((g) => g.id === id);
      if (game) {
        setEditingGame(game);
        setFormOpen(true);
      }
    },
    [games]
  );

  const handleToggleStatus = useCallback(
    (id) => {
      toggleStatus(id);
      const game = games.find((g) => g.id === id);
      if (game) {
        showToast(`"${game.title}" ${game.status === "published" ? "unpublished (→ draft)" : "published"}`, "info");
      }
    },
    [games, toggleStatus, showToast]
  );

  const openAddNew = useCallback(() => {
    setEditingGame(null);
    setFormOpen(true);
  }, []);

  const startDelete = useCallback(
    (id) => {
      setDeleteTarget(games.find((g) => g.id === id));
    },
    [games]
  );

  const handleLogout = useCallback(() => {
    setLogoutConfirm(true);
  }, []);

  const confirmLogout = useCallback(() => {
    logout();
    navigate("/login", { replace: true });
  }, [logout, navigate]);

  useEffect(() => {
    const isDarkClass = document.documentElement.classList.contains("dark");
    if (isDark !== isDarkClass) {
      document.documentElement.classList.toggle("dark", isDark);
    }
  }, []);

  useEffect(() => {
    lastChangeRef.current = lastChange;
  }, [lastChange]);

  const goToGames = useCallback(() => navigate("/dashboard/games"), [navigate]);

  const toastColors = {
    success: "border-accent text-accent bg-accent/5",
    warning: "border-yellow-500/50 text-yellow-600 dark:text-yellow-400 bg-yellow-500/5",
    info: "border-border text-foreground bg-card",
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-svh w-full bg-background">
        <AppSidebar isDark={isDark} toggleDark={toggleDark} onLogout={handleLogout} />

        <SidebarInset>
          <header className="flex items-center gap-3 px-4 md:px-8 py-3 border-b border-border bg-background sticky top-0 z-30">
            <SidebarTrigger />

            <div className="flex items-center gap-3 flex-1 min-w-0">
              <ShieldCheck className="h-5 w-5 shrink-0 hidden sm:block" style={{ color: "var(--sidebar-primary)" }} />
              <Breadcrumb pathname={location.pathname} />
            </div>

            <QuickSearch games={games} />

            <div className="flex items-center gap-3 shrink-0">
              <StatusIndicator games={games} lastChangeRef={lastChangeRef} />
              <QuickActions onLogout={handleLogout} />
            </div>
          </header>

          <main ref={mainRef} className="flex-1 p-4 md:p-8 overflow-x-auto">
            <div className="max-w-7xl mx-auto">
              <Routes>
                <Route
                  index
                  element={
                    <OverviewPage
                      games={games}
                      onNavigateGames={goToGames}
                      onEdit={openEdit}
                      onToggleStatus={handleToggleStatus}
                    />
                  }
                />

                <Route
                  path="games"
                  element={
                    <GamesManagement
                      games={games}
                      onEdit={openEdit}
                      onDelete={startDelete}
                      onToggleStatus={handleToggleStatus}
                      onAdd={openAddNew}
                    />
                  }
                />
              </Routes>
            </div>

            <footer className="mt-12 pt-6 border-t border-border">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[9px] text-muted-foreground tracking-widest uppercase">
                <span>IGRS Admin Panel v1.0 — Kementerian Komunikasi dan Digital RI</span>
                <span>
                  {pluralize(games.length, "game")} · {countByStatus(games, "published")} published ·{" "}
                  {countByStatus(games, "draft")} drafts
                </span>
              </div>
            </footer>
          </main>
        </SidebarInset>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-2">
          <div
            className={cn(
              "border px-4 py-3 shadow-lg font-mono text-xs tracking-widest uppercase min-w-50",
              toastColors[toast.type] || toastColors.info
            )}
          >
            <div className="flex items-center gap-2">
              {toast.type === "success" && <ShieldCheck className="h-3.5 w-3.5 shrink-0" />}
              <span>{toast.message}</span>
            </div>
          </div>
        </div>
      )}

      <GameFormModal
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingGame(null);
        }}
        onSubmit={editingGame ? handleEdit : handleAdd}
        initialData={editingGame}
      />

      <DeleteConfirm
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        gameTitle={deleteTarget?.title || ""}
      />

      <AlertDialog
        open={logoutConfirm}
        onOpenChange={(o) => {
          if (!o) setLogoutConfirm(false);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-mono text-sm uppercase tracking-widest flex items-center gap-2">
              <LogOut className="h-4 w-4 text-destructive" />
              Confirm Logout
            </AlertDialogTitle>
            <AlertDialogDescription className="font-mono text-xs">
              Are you sure you want to log out?
              <br />
              You will need to re-enter your credentials to access the dashboard.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="font-mono text-xs">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmLogout}
              className="font-mono text-xs bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SidebarProvider>
  );
}
