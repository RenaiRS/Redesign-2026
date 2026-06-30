import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function generateId() {
  return crypto.randomUUID();
}

export function formatDate(dateStr, options = {}) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  });
}

export function nowISO() {
  return new Date().toISOString();
}

export function pluralize(count, singular, plural) {
  return `${count} ${count === 1 ? singular : (plural || `${singular}s`)}`;
}

export function sortByDate(items, field = "createdAt", order = "desc") {
  return [...items].sort((a, b) => {
    const diff = new Date(b[field]) - new Date(a[field]);
    return order === "asc" ? -diff : diff;
  });
}

export function countByStatus(games, status) {
  return games.filter((g) => g.status === status).length;
}
