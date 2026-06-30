import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, AlertCircle, Eye, EyeOff } from "lucide-react";
import { useAppContext } from "@/context/app-context";

export default function LoginPage() {
  const { login } = useAppContext();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!username.trim() || !password.trim()) {
      setError("Username dan password harus diisi");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 300));
    const success = login(username, password);
    setLoading(false);
    if (success) {
      navigate("/dashboard", { replace: true });
    } else {
      setError("Username atau password salah");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between p-6 relative overflow-hidden">
      {/* Bg Layer Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-foreground/2 dark:bg-foreground/3 rounded-full blur-3xl pointer-events-none" />

      {/* Top Nav */}
      <div className="relative z-10 max-w-7xl w-full mx-auto">
        <button
          onClick={() => navigate("/")}
          className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors"
        >
          ← Back to Home
        </button>
      </div>

      {/* Main Center Box */}
      <div className="flex-1 flex items-center justify-center relative z-10 py-12">
        <div className="w-full max-w-md bg-card border border-border p-8 md:p-10 shadow-xl">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <ShieldCheck className="h-10 w-10" style={{ color: "var(--sidebar-primary)" }} />
            </div>
            <h1 className="text-xl font-bold tracking-tighter uppercase text-foreground">Portal Access</h1>
            <p className="mt-1 font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
              IGRS Admin Dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="font-mono text-xs uppercase tracking-widest text-foreground/70">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-border bg-background px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground transition-colors rounded-none"
                placeholder="admin"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-xs uppercase tracking-widest text-foreground/70">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-border bg-background px-4 py-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground transition-colors pr-10 rounded-none"
                  placeholder="••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 border border-destructive bg-destructive/5 p-3">
                <AlertCircle className="h-4 w-4 text-destructive shrink-0" />
                <p className="font-mono text-xs text-destructive">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-foreground hover:bg-muted-foreground text-background font-bold font-mono text-xs uppercase tracking-widest px-8 py-4 transition-colors disabled:opacity-50 rounded-none mt-2"
            >
              {loading ? "Authenticating..." : "Access Dashboard"}
            </button>
          </form>
        </div>
      </div>

      {/* Footer balance */}
      <div className="relative z-10 w-full text-center">
        <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/50">
          Authorized personnel only
        </p>
      </div>
    </div>
  );
}
