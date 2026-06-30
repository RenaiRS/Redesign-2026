import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { useAppContext } from "@/context/app-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Masukkan email"
        />

        <div className="flex flex-row">
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukkan password"
          />
          <Button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Authenticating..." : "Access Dashboard"}
        </Button>

        {error ? (
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-destructive shrink-0" />
            <p className="font-mono text-xs text-destructive">{error}</p>
          </div>
        ) : null}
      </form>
    </div>
  );
}
