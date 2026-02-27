# woow-prueba-tecnica

Prueba técnica Fullstack con autenticación JWT.

## Stack
- **Backend:** Node.js + TypeScript + Express + Prisma + JWT
- **Frontend:** React + TypeScript + Vite + React Router
- **DB:** PostgreSQL Docker

## Requisitos
- Node.js
- Docker Desktop

## Estructura del proyecto
- `backend/` API REST (auth + usuarios)
- `frontend/` Aplicación React (login, perfil, admin)
- `docker-compose.yml` PostgreSQL

---

## Configuración de variables de entorno

### Backend
Crea `backend/.env` (local) basado en `backend/.env.example`:

```env
PORT=3001
DATABASE_URL="postgresql://woow:woowpass@localhost:5433/woowdb?schema=public"
JWT_SECRET="super_secreto_cambialo"
JWT_EXPIRES_IN="1d"
```
### Frontend

Crea frontend/.env (local) basado en frontend/.env.example:
VITE_API_URL=http://localhost:3001

### Levantar el proyecto 
1) Base de datos PostgreSQL con Docker

En la raíz del proyecto:
docker compose up -d
PostgreSQL queda expuesto en:

localhost:5433 (mapeo 5433 -> 5432)

2) Backend
```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```
Backend disponible en:

http://localhost:3001

Health check: http://localhost:3001/health

3) Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend disponible en:

http://localhost:5173

### Endpoints 
### Auth

POST /api/auth/register

{ "name":"User", "email":"user@test.com", "password":"123456" }
POST /api/auth/login

{ "email":"user@test.com", "password":"123456" }
Usuario autenticado (requiere Bearer Token)

GET /api/users/me

PUT /api/users/me

{ "name":"Nuevo Nombre", "email":"nuevo@test.com", "password":"nuevaPass123" }
Admin (solo role admin)

GET /api/users

### Flujo del Frontend

/login Inicio de sesión

/register Registro de usuario

/profile Perfil (protegido)

/admin Panel admin (solo admin)

### Seguridad y consideraciones

Contraseñas almacenadas con hash (bcrypt).

Autenticación stateless con JWT (incluye userId, email, role).

Prisma ORM reduce riesgo de SQL Injection.

Variables sensibles se manejan por .env (no se suben al repo).

### Commit y push

En la raíz:
```md
```bash
git add README.md
git commit -m "docs: update README"
git push
```
## Credenciales de prueba

Puedes crear usuarios desde `/register`. Para probar el rol admin:
- Admin: (crear con role=admin desde Postman)  
  email: `admin@test.com`  
  password: `12345678`

- User:  
  email: `user@test.com`  
  password: `12345678`
