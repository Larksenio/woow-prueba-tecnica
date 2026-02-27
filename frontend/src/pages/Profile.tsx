import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { api } from "../lib/api";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user, logout, refreshMe } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setName(user?.name ?? "");
    setEmail(user?.email ?? "");
  }, [user]);

  async function onSave() {
    setMsg(null);
    setErr(null);
    setBusy(true);
    try {
      const payload: any = {};
      if (name) payload.name = name;
      if (email) payload.email = email;
      if (password) payload.password = password;
      if (password && password.length < 8) {
  setErr("La contraseña debe tener al menos 8 caracteres.");
  return;
}

      await api("/api/users/me", { method: "PUT", body: JSON.stringify(payload) });
      setPassword("");
      await refreshMe();
      setMsg("Perfil actualizado");
    } catch (e: any) {
  const msg =
    e?.details?.[0]?.message ||
    e?.error ||
    "No se pudo actualizar";

  setErr(msg);
} finally {
  setBusy(false);
}
  }

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Perfil</h2>
        <button onClick={logout} style={{ padding: 8 }}>Cerrar sesión</button>
      </div>

      <div style={{ background: "#111", color: "#fff", padding: 12, borderRadius: 8, marginBottom: 16 }}>
        <div><b>ID:</b> {user?.id}</div>
        <div><b>Rol:</b> {user?.role}</div>
      </div>

      {user?.role === "admin" && (
        <div style={{ marginBottom: 16 }}>
          <Link to="/admin">Ir a panel admin</Link>
        </div>
      )}

      <div style={{ display: "grid", gap: 12 }}>
        <label>
          Nombre
          <input value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%", padding: 8 }} />
        </label>
        <label>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: 8 }} />
        </label>
        <label>
          Nueva contraseña (opcional)
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", padding: 8 }} />
        </label>

        {msg && <div style={{ color: "green" }}>{msg}</div>}
        {err && <div style={{ color: "crimson" }}>{err}</div>}

        <button disabled={busy} onClick={onSave} style={{ padding: 10 }}>
          {busy ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>
    </div>
  );
}