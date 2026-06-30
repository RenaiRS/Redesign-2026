import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { RATING_OPTIONS, PLATFORM_LIST, CATEGORIES, STATUS_OPTIONS, RATING_DISPLAY } from "@/lib/constants";
import { RatingBadge } from "@/components/shared/rating-badge";
import { CoverImage } from "@/components/shared/cover-image";
import { PlatformTags } from "@/components/shared/platform-tags";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Search,
  Gamepad2,
  CircleX,
  FilterX,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const EMPTY_FORM = {
  title: "",
  developer: "",
  publisher: "",
  platforms: [],
  releaseDate: "",
  rating: "",
  categories: [],
  description: "",
  coverUrl: "",
  status: "draft",
};

const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Title A-Z", value: "title-asc" },
  { label: "Title Z-A", value: "title-desc" },
];

function FilterBar({ search, onSearchChange, filters, onFilterChange, gameCount, filteredCount, onClearAll }) {
  const hasActiveFilters = filters.rating || filters.platform || filters.status || search.trim();

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
      <div className="relative flex-1 w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by title or developer..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-8"
        />
        {search && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <CircleX className="h-4 w-4" />
          </button>
        )}
      </div>

      <Select value={filters.rating || "all"} onValueChange={(v) => onFilterChange("rating", v === "all" ? "" : v)}>
        <SelectTrigger className="w-27.5  text-xs">
          <SelectValue placeholder="Rating" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all" className=" text-xs">
            All Ratings
          </SelectItem>
          {RATING_OPTIONS.map((r) => (
            <SelectItem key={r} value={r} className=" text-xs">
              {r}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.platform || "all"} onValueChange={(v) => onFilterChange("platform", v === "all" ? "" : v)}>
        <SelectTrigger className="w-35  text-xs">
          <SelectValue placeholder="Platform" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all" className=" text-xs">
            All Platforms
          </SelectItem>
          {PLATFORM_LIST.map((p) => (
            <SelectItem key={p} value={p} className=" text-xs">
              {p}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.status || "all"} onValueChange={(v) => onFilterChange("status", v === "all" ? "" : v)}>
        <SelectTrigger className="w-32.5  text-xs">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all" className=" text-xs">
            All Status
          </SelectItem>
          {STATUS_OPTIONS.map((s) => (
            <SelectItem key={s.value} value={s.value} className=" text-xs">
              {s.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button variant="outline" size="sm" onClick={onClearAll} className=" text-xs shrink-0">
          <FilterX className="h-3.5 w-3.5 mr-1.5" />
          Clear
        </Button>
      )}

      <p className=" text-muted-foreground text-xs whitespace-nowrap shrink-0 hidden md:block">
        {filteredCount} / {gameCount} shown
      </p>
    </div>
  );
}

function GameTable({ games, onEdit, onDelete, onToggleStatus }) {
  const [expandedRow, setExpandedRow] = useState(null);

  if (!games.length) {
    return <EmptyState title="No games match your search." description="Try adjusting filters or add a new game" />;
  }

  return (
    <div className="">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className=" uppercase tracking-widest w-8"></TableHead>
            <TableHead className=" uppercase tracking-widest">Title</TableHead>
            <TableHead className=" uppercase tracking-widest hidden md:table-cell">Developer</TableHead>
            <TableHead className=" uppercase tracking-widest">Rating</TableHead>
            <TableHead className=" uppercase tracking-widest hidden lg:table-cell">Platforms</TableHead>
            <TableHead className=" uppercase tracking-widest hidden lg:table-cell">Status</TableHead>
            <TableHead className=" uppercase tracking-widest text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {games.map((game) => {
            const isExpanded = expandedRow === game.id;
            return (
              <>
                <TableRow key={game.id} className="group">
                  <TableCell className="p-2">
                    <button
                      onClick={() => setExpandedRow(isExpanded ? null : game.id)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                    </button>
                  </TableCell>

                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span className="font-sans font-bold tracking-tight">{game.title}</span>
                      <span className=" text-xs text-muted-foreground md:hidden">{game.developer}</span>
                    </div>
                  </TableCell>

                  <TableCell className="hidden md:table-cell">
                    <span className=" text-xs text-muted-foreground">{game.developer}</span>
                  </TableCell>

                  <TableCell>
                    <RatingBadge rating={game.rating} size="sm" />
                  </TableCell>

                  <TableCell className="hidden lg:table-cell">
                    <PlatformTags platforms={game.platforms} max={2} />
                  </TableCell>

                  <TableCell className="hidden lg:table-cell">
                    <Badge
                      variant={game.status === "published" ? "default" : "secondary"}
                      className=" uppercase tracking-widest"
                    >
                      {game.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => onToggleStatus(game.id)}
                        title={game.status === "published" ? "Draft" : "Publish"}
                      >
                        {game.status === "published" ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button variant="ghost" size="icon-sm" onClick={() => onEdit(game.id)} title="Edit">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon-sm" onClick={() => onDelete(game.id)} title="Delete">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>

                {isExpanded && (
                  <TableRow key={`${game.id}-detail`}>
                    <TableCell colSpan={7} className="bg-muted/30 p-4 rounded-[min(var(--radius-4xl),24px)]">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <CoverImage src={game.coverUrl} className="w-24 aspect-3/4" iconSize="h-6 w-6" />

                        <div className="md:col-span-2 space-y-2">
                          <p className=" text-xs text-muted-foreground">{game.description || "No description"}</p>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            <span className=" text-muted-foreground uppercase tracking-widest">Categories:</span>
                            {game.categories.length > 0 ? (
                              game.categories.map((c) => (
                                <span
                                  key={c}
                                  className=" px-1.5 py-0.5 border border-border rounded-[min(var(--radius-4xl),24px)]"
                                >
                                  {c}
                                </span>
                              ))
                            ) : (
                              <span className=" text-muted-foreground italic">None</span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-4 mt-1  text-muted-foreground">
                            <span>Publisher: {game.publisher || "-"}</span>
                            <span>Released: {game.releaseDate || "-"}</span>
                            <span>
                              ID: <span className="text-[9px]">{game.id.slice(0, 8)}...</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

function GamesPage({ games, onEdit, onDelete, onToggleStatus, onAdd }) {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ rating: "", platform: "", status: "" });
  const [sortBy, setSortBy] = useState("newest");

  const setFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearAllFilters = () => {
    setSearch("");
    setFilters({ rating: "", platform: "", status: "" });
  };

  const hasActiveFilters = filters.rating || filters.platform || filters.status || search.trim();

  const filtered = games.filter((g) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      if (!g.title.toLowerCase().includes(q) && !g.developer.toLowerCase().includes(q)) return false;
    }
    if (filters.rating && g.rating !== filters.rating) return false;
    if (filters.platform && !g.platforms.includes(filters.platform)) return false;
    if (filters.status && g.status !== filters.status) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "title-asc":
        return a.title.localeCompare(b.title);
      case "title-desc":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tighter uppercase">Games Management</h1>
          <p className=" text-xs text-muted-foreground tracking-widest uppercase mt-1">
            IGRS Admin Panel — {games.length} game{games.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button onClick={onAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Game
        </Button>
      </div>

      <div className="mb-4">
        <FilterBar
          search={search}
          onSearchChange={setSearch}
          filters={filters}
          onFilterChange={setFilter}
          gameCount={games.length}
          filteredCount={sorted.length}
          onClearAll={clearAllFilters}
        />
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className=" text-muted-foreground tracking-widest">
          {hasActiveFilters ? `Showing ${sorted.length} of ${games.length} games` : `${sorted.length} games`}
        </div>
        <div className="flex items-center gap-2">
          <span className=" text-muted-foreground tracking-widest">Sort:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-35 h-8  text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value} className=" text-xs">
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <GameTable games={sorted} onEdit={onEdit} onDelete={onDelete} onToggleStatus={onToggleStatus} />
    </>
  );
}

function GameFormModal({ open, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [errors, setErrors] = useState({});
  const [coverPreview, setCoverPreview] = useState("");

  useEffect(() => {
    if (open) {
      setForm(initialData ? { ...EMPTY_FORM, ...initialData } : { ...EMPTY_FORM });
      setCoverPreview(initialData?.coverUrl || "");
      setErrors({});
    }
  }, [open, initialData]);

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const toggleArray = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter((v) => v !== value) : [...prev[key], value],
    }));
  };

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = "Game title is required";
    if (!form.developer.trim()) errs.developer = "Developer name is required";
    if (!form.rating) errs.rating = "Please select a rating classification";
    if (!form.platforms.length) errs.platforms = "Select at least one platform";
    setErrors(errs);
    return !Object.keys(errs).length;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      ...form,
      title: form.title.trim(),
      developer: form.developer.trim(),
      publisher: form.publisher.trim(),
    });
  };

  const resetAndClose = () => {
    setForm({ ...EMPTY_FORM });
    setErrors({});
    setCoverPreview("");
    onClose();
  };

  const handleCoverChange = (e) => {
    const val = e.target.value;
    set("coverUrl", val);
    setCoverPreview(val);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) resetAndClose();
      }}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className=" text-sm uppercase tracking-widest">
            {initialData ? "Edit Game" : "Add New Game"}
          </DialogTitle>
          <DialogDescription className=" text-xs text-muted-foreground">
            Fill in the game details below. All asterisk (*) fields are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className=" text-xs uppercase tracking-widest">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="e.g. Resident Evil 4"
                className={errors.title ? "border-destructive" : ""}
              />
              {errors.title && <p className=" text-destructive">{errors.title}</p>}
            </div>
            <div className="space-y-1.5">
              <Label className=" text-xs uppercase tracking-widest">
                Developer <span className="text-destructive">*</span>
              </Label>
              <Input
                value={form.developer}
                onChange={(e) => set("developer", e.target.value)}
                placeholder="e.g. Capcom"
                className={errors.developer ? "border-destructive" : ""}
              />
              {errors.developer && <p className=" text-destructive">{errors.developer}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className=" text-xs uppercase tracking-widest">Publisher</Label>
              <Input
                value={form.publisher}
                onChange={(e) => set("publisher", e.target.value)}
                placeholder="e.g. Capcom"
              />
            </div>
            <div className="space-y-1.5">
              <Label className=" text-xs uppercase tracking-widest">Release Date</Label>
              <Input type="date" value={form.releaseDate} onChange={(e) => set("releaseDate", e.target.value)} />
            </div>
          </div>

          <div className="border-t border-border" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label className=" text-xs uppercase tracking-widest">
                Rating <span className="text-destructive">*</span>
              </Label>
              <div className="grid grid-cols-5 gap-2">
                {RATING_OPTIONS.map((r) => {
                  const info = RATING_DISPLAY.find((d) => d.rating === r);
                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => set("rating", r)}
                      className={cn(
                        "flex flex-col items-center gap-1 p-3 border transition-colors cursor-pointer rounded-[min(var(--radius-4xl),24px)]",
                        form.rating === r
                          ? "border-foreground bg-foreground text-background"
                          : "border-border hover:border-ring bg-card"
                      )}
                    >
                      <span className="font-bold text-lg tracking-tighter">{r}</span>
                      <span className=" text-[9px] uppercase tracking-widest text-center leading-tight">
                        {info?.text || ""}
                      </span>
                    </button>
                  );
                })}
              </div>
              {errors.rating && <p className=" text-destructive">{errors.rating}</p>}
            </div>

            <div className="space-y-1.5">
              <Label className=" text-xs uppercase tracking-widest">Status</Label>
              <div className="flex gap-2">
                {STATUS_OPTIONS.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => set("status", s.value)}
                    className={cn(
                      "flex-1 py-3 border transition-colors text-xs uppercase tracking-widest cursor-pointer rounded-[min(var(--radius-4xl),24px)]",
                      form.status === s.value
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-ring bg-card"
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-border" />

          <div className="space-y-2">
            <Label className={cn(" text-xs uppercase tracking-widest", errors.platforms && "text-destructive")}>
              Platforms <span className="text-destructive">*</span>
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PLATFORM_LIST.map((p) => (
                <label
                  key={p}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 border cursor-pointer transition-colors rounded-[min(var(--radius-4xl),24px)]",
                    form.platforms.includes(p)
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:border-ring bg-card"
                  )}
                >
                  <Checkbox
                    checked={form.platforms.includes(p)}
                    onCheckedChange={() => toggleArray("platforms", p)}
                    className="sr-only"
                  />
                  <span className=" text-xs font-bold">{p}</span>
                </label>
              ))}
            </div>
            {errors.platforms && <p className=" text-destructive">{errors.platforms}</p>}
          </div>

          <div className="space-y-2">
            <Label className=" text-xs uppercase tracking-widest">Content Categories</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {CATEGORIES.map((c) => (
                <label
                  key={c.value}
                  className={cn(
                    "flex items-start gap-3 cursor-pointer p-3 border transition-colors rounded-[min(var(--radius-4xl),24px)]",
                    form.categories.includes(c.value)
                      ? "border-foreground bg-foreground/5"
                      : "border-border hover:border-ring bg-card"
                  )}
                >
                  <Checkbox
                    checked={form.categories.includes(c.value)}
                    onCheckedChange={() => toggleArray("categories", c.value)}
                    className="mt-0.5"
                  />
                  <div>
                    <span className=" text-xs font-bold block">{c.label}</span>
                    <span className=" text-muted-foreground">{c.description}</span>
                  </div>
                </label>
              ))}
            </div>
            {form.categories.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                <span className=" text-muted-foreground tracking-widest">Selected: </span>
                {form.categories.map((c) => (
                  <span
                    key={c}
                    className=" px-1.5 py-0.5 border border-border bg-card rounded-[min(var(--radius-4xl),24px)]"
                  >
                    {c}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-border" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-1.5">
              <Label className=" text-xs uppercase tracking-widest">Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                rows={5}
                placeholder="Game description, storyline, gameplay highlights..."
                className="resize-none"
              />
              <div className="flex justify-between items-center">
                <p className=" text-muted-foreground">
                  {form.description.length > 0
                    ? `${form.description.length} characters`
                    : "Write a compelling description"}
                </p>
                <span className={cn("", form.description.length > 500 ? "text-destructive" : "text-muted-foreground")}>
                  {form.description.length}/500
                </span>
              </div>
              {form.description.length > 500 && (
                <p className=" text-destructive">Description too long (max 500 characters)</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label className=" text-xs uppercase tracking-widest">Cover Preview</Label>
              <div className="aspect-3/4 border border-border bg-muted overflow-hidden rounded-[min(var(--radius-4xl),24px)] flex items-center justify-center relative">
                {coverPreview ? (
                  <img
                    src={coverPreview}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Gamepad2 className="h-8 w-8" />
                    <span className=" text-[9px] text-center px-2">No cover image</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className=" text-xs uppercase tracking-widest">Cover Image URL</Label>
            <Input value={form.coverUrl} onChange={handleCoverChange} placeholder="https://example.com/cover.jpg" />
            {form.coverUrl && (
              <p className=" text-muted-foreground break-all">
                {coverPreview === form.coverUrl ? "✓ Image loaded" : "Enter valid image URL for preview"}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className=" text-muted-foreground">
              {form.title ? `Ready to "${form.title}"` : "Fill in the game details"}
            </div>
            <div className="flex items-center gap-3">
              <Button type="button" variant="outline" onClick={resetAndClose} className=" text-xs">
                Cancel
              </Button>
              <Button type="submit" className=" text-xs">
                {initialData ? "Update Game" : "Add Game"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function DeleteConfirm({ open, onClose, onConfirm, gameTitle }) {
  return (
    <AlertDialog
      open={open}
      onOpenChange={(o) => {
        if (!o) onClose();
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className=" text-sm uppercase tracking-widest flex items-center gap-2">
            <Trash2 className="h-4 w-4 text-destructive" />
            Delete Game
          </AlertDialogTitle>
          <AlertDialogDescription className=" text-xs">
            Are you sure you want to delete <strong>{gameTitle}</strong>?
            <br />
            This action cannot be undone. The game data will be permanently removed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className=" text-xs">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className=" text-xs bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function GamesManagement({ games, onEdit, onDelete, onToggleStatus, onAdd }) {
  return <GamesPage games={games} onEdit={onEdit} onDelete={onDelete} onToggleStatus={onToggleStatus} onAdd={onAdd} />;
}

export { GameFormModal, DeleteConfirm };
