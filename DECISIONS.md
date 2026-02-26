# DECISIONS.md — Decisiones Técnicas (woow-prueba-tecnica)

Este documento resume las decisiones técnicas tomadas para implementar la prueba y los trade-offs considerados.

## Backend

### Express + TypeScript
- **Decisión:** usar Express con TypeScript.
- **Por qué:** implementación rápida y clara de una API REST, con tipado para reducir errores y mejorar mantenibilidad.
- **Trade-off:** no incluye estructura “opinionated” como NestJS, pero para una prueba técnica es más directo.

### Prisma ORM + PostgreSQL
- **Decisión:** usar Prisma como ORM.
- **Por qué:** facilita migraciones, tipado fuerte en consultas, y reduce el riesgo de SQL Injection al evitar concatenación manual de SQL.
- **Trade-off:** agrega una capa extra (ORM), pero acelera el desarrollo y estandariza el acceso a datos.

### JWT (stateless auth)
- **Decisión:** autenticación basada en JWT.
- **Por qué:** es simple de integrar con frontend, no requiere sesiones en servidor y permite incluir `userId`, `email`, `role` en el payload.
- **Trade-off:** el token puede ser robado si se almacena inseguramente; en producción se evalúa rotación/refresh tokens o cookies HttpOnly.

### Hash de contraseñas con bcrypt
- **Decisión:** almacenar contraseñas con hash usando bcrypt.
- **Por qué:** protege credenciales en caso de filtración de base de datos.
- **Trade-off:** costo computacional mayor que hash simple (lo cual es deseable por seguridad).

### Validación y manejo de errores
- **Decisión:** validaciones con Zod + respuestas JSON consistentes.
- **Por qué:** Zod permite validar y tipar payloads de forma centralizada; manejo de errores consistente mejora DX y UX.
- **Trade-off:** hay que mapear errores de validación a mensajes claros (se implementó en el middleware de errores).

### Arquitectura por capas
- **Decisión:** separar en `routes → controllers → services → repositories`.
- **Por qué:** mejora organización, facilita pruebas y cambios, y cumple con el criterio de “arquitectura limpia”.
- **Trade-off:** más archivos que una solución “todo en un archivo”, pero más mantenible.

## Frontend

### React + Vite + TypeScript
- **Decisión:** React con Vite y TypeScript.
- **Por qué:** Vite ofrece arranque rápido; TypeScript reduce errores y ayuda al mantenimiento.
- **Trade-off:** requiere configuración mínima, pero es estándar en proyectos modernos.

### React Router + Guards
- **Decisión:** React Router para navegación y guards para rutas protegidas.
- **Por qué:** permite separar rutas públicas (`/login`, `/register`) y privadas (`/profile`, `/admin`).
- **Trade-off:** requiere lógica de autenticación central (AuthContext), pero mejora la estructura.

### Manejo de sesión en localStorage
- **Decisión:** guardar el token en `localStorage`.
- **Por qué:** es simple y suficiente para una prueba técnica.
- **Trade-off:** en producción es mejor evaluar cookies HttpOnly + protección XSS/CSRF. Aquí se prioriza simplicidad y demostración funcional.

### Admin Dashboard como extra
- **Decisión:** incluir panel admin con listado de usuarios.
- **Por qué:** demuestra control de roles, consumo de API y rutas protegidas por permisos.
- **Trade-off:** más trabajo, pero suma puntos y evidencia dominio.

## DevOps / Ejecución

### PostgreSQL con Docker Compose
- **Decisión:** levantar la base con Docker Compose.
- **Por qué:** reproducibilidad, facilidad de instalación para el evaluador y consistencia entre entornos.
- **Trade-off:** requiere Docker Desktop instalado, pero es común en evaluaciones técnicas.

## Notas finales
- Se priorizó: **funcionalidad completa**, **estructura limpia**, **seguridad base**, y **documentación reproducible** (README + env examples).