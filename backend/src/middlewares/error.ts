import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  // Zod -> 400
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Datos inválidos",
      details: err.issues.map((i) => ({
        path: i.path.join("."),
        message: i.message,
      })),
    });
  }

  // Errores controlados
  const status = err?.statusCode ?? 500;
  const message = err?.message ?? "Error interno del servidor";
  return res.status(status).json({ error: message });
}