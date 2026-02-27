import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../lib/api";

type User = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
  updatedAt: string;
};

export default function Register() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    if (password.length < 8) {
  setError("La contraseña debe tener al menos 8 caracteres.");
  return;
}
    e.preventDefault();
    setError(null);
    setBusy(true);

    try {
      const data = await api<{ user: User; token: string }>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }), // role opcional => default "user"
      });

      localStorage.setItem("token", data.token);
      nav("/profile");
      window.location.reload(); // simple para que AuthContext recargue user (rápido y efectivo)
    } catch (err: any) {
  // Backend devuelve { error, details?: [{ path, message }] }
  const msg =
    err?.details?.[0]?.message ||
    err?.error ||
    "No se pudo registrar";

  setError(msg);
} finally {
  setBusy(false);
}
  }

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: 16 }}>
      <h2>Registro</h2>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <label>
          Nombre
          <input value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%", padding: 8 }} />
        </label>

        <label>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: 8 }} />
        </label>

        <label>
          Contraseña
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: 8 }}
          />
        </label>

        {error && <div style={{ color: "crimson" }}>{error}</div>}

        <button disabled={busy} style={{ padding: 10 }}>
          {busy ? "Registrando..." : "Crear cuenta"}
        </button>
      </form>

      <div style={{ marginTop: 12 }}>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </div>
    </div>
  );
}