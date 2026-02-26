import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("admin@test.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await login(email, password);
      nav("/profile");
    } catch (err: any) {
      setError(err?.error ?? "Error al iniciar sesión");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: 16 }}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <label>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: 8 }} />
        </label>
        <label>
          Contraseña
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", padding: 8 }} />
        </label>

        {error && <div style={{ color: "crimson" }}>{error}</div>}

        <button disabled={busy} style={{ padding: 10 }}>
          {busy ? "Ingresando..." : "Entrar"}
        </button>
        <div style={{ marginTop: 12 }}>
  ¿No tienes cuenta? <a href="/register">Regístrate</a>
</div>
      </form>
    </div>
  );
}