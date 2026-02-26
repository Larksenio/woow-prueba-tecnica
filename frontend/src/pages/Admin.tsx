import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { Link } from "react-router-dom";

type UserRow = { id: string; name: string; email: string; role: "user" | "admin"; createdAt: string; updatedAt: string };

export default function Admin() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await api<UserRow[]>("/api/users");
        setUsers(data);
      } catch (e: any) {
        setErr(e?.error ?? "No se pudo cargar usuarios");
      }
    })();
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Panel Admin</h2>
        <Link to="/profile">Volver</Link>
      </div>

      {err && <div style={{ color: "crimson" }}>{err}</div>}

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 16 }}>
        <thead>
          <tr>
            <th align="left">Nombre</th>
            <th align="left">Email</th>
            <th align="left">Rol</th>
            <th align="left">Creado</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} style={{ borderTop: "1px solid #ddd" }}>
              <td style={{ padding: 8 }}>{u.name}</td>
              <td style={{ padding: 8 }}>{u.email}</td>
              <td style={{ padding: 8 }}>{u.role}</td>
              <td style={{ padding: 8 }}>{new Date(u.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}