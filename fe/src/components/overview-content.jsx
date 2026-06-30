import { cn } from "@/lib/utils";
import { RATING_DISPLAY, PLATFORM_LIST } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  GamepadIcon,
  CircleCheck,
  FileEdit,
  BarChart3,
  Gamepad2,
  Eye,
  EyeOff,
  Pencil,
  Smartphone,
  Monitor,
  Globe,
  Clock,
} from "lucide-react";

function StatCards({ games }) {
  const published = games.filter((g) => g.status === "published").length;
  const drafts = games.filter((g) => g.status === "draft").length;
  const uniqueRatings = new Set(games.map((g) => g.rating)).size;

  const stats = [
    { icon: GamepadIcon, label: "Total Games", value: games.length },
    { icon: CircleCheck, label: "Published", value: published },
    { icon: FileEdit, label: "Drafts", value: drafts },
    { icon: BarChart3, label: "Rating Tiers", value: uniqueRatings },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((s) => (
        <Card key={s.label}>
          <CardContent className="flex items-center gap-4 p-6">
            <s.icon className="h-8 w-8 shrink-0" style={{ color: "var(--sidebar-primary)" }} />
            <div>
              <p className="text-2xl font-bold tracking-tighter">{s.value}</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function RatingChart({ games }) {
  const data = RATING_DISPLAY.map((r) => ({
    name: r.rating,
    count: games.filter((g) => g.rating === r.rating).length,
  }));

  const pieData = RATING_DISPLAY.map((r) => ({
    name: r.rating,
    value: games.filter((g) => g.rating === r.rating).length,
  }));

  const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="font-mono text-xs uppercase tracking-widest">Rating Distribution</CardTitle>
          <CardDescription className="font-mono text-[10px] text-muted-foreground">
            Jumlah game per kategori klasifikasi usia
          </CardDescription>
        </CardHeader>
        <CardContent>
          {games.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <YAxis tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    background: "var(--background)",
                    border: "1px solid var(--border)",
                    borderRadius: 0,
                  }}
                  labelStyle={{ fontFamily: "monospace", fontSize: 12 }}
                />
                <Bar dataKey="count" radius={[0, 0, 0, 0]} fill="var(--sidebar-primary)" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center">
              <p className="font-mono text-xs text-muted-foreground italic">No data available</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="font-mono text-xs uppercase tracking-widest">Rating Proportions</CardTitle>
          <CardDescription className="font-mono text-[10px] text-muted-foreground">
            Proporsi persentase tiap rating terhadap total
          </CardDescription>
        </CardHeader>
        <CardContent>
          {games.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  stroke="var(--border)"
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "var(--background)",
                    border: "1px solid var(--border)",
                    borderRadius: 0,
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  iconType="rect"
                  formatter={(value) => <span className="font-mono text-xs text-muted-foreground">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-75 flex items-center justify-center">
              <p className="font-mono text-xs text-muted-foreground italic">No data available</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function PlatformChart({ games }) {
  // Hitung jumlah game unik per platform
  const data = PLATFORM_LIST.map((platform) => ({
    name: platform,
    count: games.filter((g) => g.platforms.includes(platform)).length,
  }))
    .filter((d) => d.count > 0)
    .sort((a, b) => b.count - a.count);

  if (data.length === 0) return null;

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="font-mono text-xs uppercase tracking-widest">
          <Monitor className="h-3.5 w-3.5 inline mr-1.5" />
          Platform Distribution
        </CardTitle>
        <CardDescription className="font-mono text-[10px] text-muted-foreground">
          Jumlah game yang tersedia di tiap platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={Math.max(200, data.length * 45)}>
          <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 12 }} stroke="var(--muted-foreground)" />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 12 }}
              stroke="var(--muted-foreground)"
              width={120}
            />
            <Tooltip
              contentStyle={{
                background: "var(--background)",
                border: "1px solid var(--border)",
                borderRadius: 0,
              }}
            />
            <Bar dataKey="count" radius={[0, 0, 0, 0]} fill="var(--chart-2)" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {data.map((d) => (
            <div key={d.name} className="flex items-center gap-2 p-2 border border-border bg-card">
              <Smartphone className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <div className="flex-1 min-w-0">
                <p className="font-mono text-[10px] truncate">{d.name}</p>
                <p className="font-mono text-[9px] text-muted-foreground">
                  {d.count} game{d.count !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function RecentGames({ games, onNavigateGames, onEdit, onToggleStatus }) {
  const recent = [...games].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

  if (!recent.length) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-mono text-xs uppercase tracking-widest text-foreground">
          <Clock className="h-3.5 w-3.5 inline mr-1.5" />
          Recent Games
        </h2>
        <button
          onClick={onNavigateGames}
          className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors"
        >
          View All →
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {recent.map((game) => {
          const ratingInfo = RATING_DISPLAY.find((r) => r.rating === game.rating);
          return (
            <div key={game.id} className="border border-border bg-card p-4 flex items-center gap-4 group">
              {/* Cover mini */}
              <div className="w-12 h-16 border border-border bg-muted shrink-0 flex items-center justify-center overflow-hidden">
                {game.coverUrl ? (
                  <img
                    src={game.coverUrl}
                    alt=""
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  <Gamepad2 className="h-5 w-5 text-muted-foreground" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold tracking-tight text-sm truncate">{game.title}</span>
                  <span
                    className={cn(
                      "font-mono text-[10px] font-bold px-1.5 py-0.5 border shrink-0",
                      ratingInfo?.color,
                      ratingInfo?.bg
                    )}
                  >
                    {game.rating}
                  </span>
                </div>
                <p className="font-mono text-[10px] text-muted-foreground truncate mb-2">{game.developer}</p>

                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={cn(
                      "font-mono text-[9px] uppercase tracking-widest px-1.5 py-0.5 border",
                      game.status === "published" ? "border-accent text-accent" : "border-border text-muted-foreground"
                    )}
                  >
                    {game.status}
                  </span>
                  {game.platforms.slice(0, 3).map((p) => (
                    <span key={p} className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
                      {p}
                    </span>
                  ))}
                  {game.platforms.length > 3 && (
                    <span className="font-mono text-[9px] text-muted-foreground">+{game.platforms.length - 3}</span>
                  )}
                </div>
              </div>

              {/* Hover actions */}
              <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon-sm" onClick={() => onToggleStatus(game.id)} title="Toggle status">
                  {game.status === "published" ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </Button>
                <Button variant="ghost" size="icon-sm" onClick={() => onEdit(game.id)} title="Edit">
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function OverviewPage({ games, onNavigateGames, onEdit, onToggleStatus }) {
  return (
    <>
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tighter uppercase">Overview</h1>
          <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mt-1">
            IGRS Admin Panel — {games.length} game{games.length !== 1 ? "s" : ""} registered
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
          <Globe className="h-3 w-3" />
          <span>
            Last updated:{" "}
            {games.length > 0
              ? new Date(Math.max(...games.map((g) => new Date(g.createdAt).getTime()))).toLocaleDateString("id-ID")
              : "-"}
          </span>
        </div>
      </header>

      <StatCards games={games} />

      {games.length > 0 ? (
        <>
          <RatingChart games={games} />
          <PlatformChart games={games} />
          <RecentGames
            games={games}
            onNavigateGames={onNavigateGames}
            onEdit={onEdit}
            onToggleStatus={onToggleStatus}
          />
        </>
      ) : null}

      {games.length === 0 ? (
        <div className="border border-border p-12 text-center">
          <GamepadIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="font-mono text-sm text-muted-foreground mb-4">No games registered yet.</p>
          <p className="font-mono text-[10px] text-muted-foreground mb-6 tracking-widest uppercase">
            Start by adding your first game to the system
          </p>
          <Button variant="outline" onClick={onNavigateGames}>
            Add your first game
          </Button>
        </div>
      ) : null}
    </>
  );
}
