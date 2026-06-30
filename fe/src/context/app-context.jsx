import { createContext, useContext, useCallback, useMemo } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { INITIAL_GAMES } from "@/data/initial-games";
import { generateId, nowISO } from "@/lib/utils";

const ADMIN_USER = "admin";
const ADMIN_PASS = "admin123";

const SEED_VERSION = 3;
try {
  const saved = localStorage.getItem("igrs_seed_version");
  if (Number(saved) !== SEED_VERSION) {
    localStorage.removeItem("igrs_games");
    localStorage.removeItem("igrs_seed_version");
    localStorage.setItem("igrs_seed_version", String(SEED_VERSION));
  }
} catch {}

const AppContext = createContext();

export function AppContextProvider({ children }) {
  const [games, setGames] = useLocalStorage("igrs_games", INITIAL_GAMES);
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage("igrs_auth", false);

  const login = useCallback(
    (username, password) => {
      if (username === ADMIN_USER && password === ADMIN_PASS) {
        setIsLoggedIn(true);
        return true;
      }
      return false;
    },
    [setIsLoggedIn]
  );

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, [setIsLoggedIn]);

  const addGame = useCallback(
    (gameData) => {
      const newGame = {
        ...gameData,
        id: generateId(),
        createdAt: nowISO(),
      };
      setGames((prev) => [newGame, ...prev]);
    },
    [setGames]
  );

  const updateGame = useCallback(
    (id, updated) => {
      setGames((prev) => prev.map((g) => (g.id === id ? { ...g, ...updated } : g)));
    },
    [setGames]
  );

  const deleteGame = useCallback(
    (id) => {
      setGames((prev) => prev.filter((g) => g.id !== id));
    },
    [setGames]
  );

  const toggleStatus = useCallback(
    (id) => {
      setGames((prev) =>
        prev.map((g) => (g.id === id ? { ...g, status: g.status === "published" ? "draft" : "published" } : g))
      );
    },
    [setGames]
  );

  const value = useMemo(
    () => ({
      games,
      isLoggedIn,
      login,
      logout,
      addGame,
      updateGame,
      deleteGame,
      toggleStatus,
    }),
    [games, isLoggedIn, login, logout, addGame, updateGame, deleteGame, toggleStatus]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppContextProvider");
  return ctx;
}
