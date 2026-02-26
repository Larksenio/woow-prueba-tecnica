import type { Request, Response, NextFunction } from "express";

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  const status = err?.statusCode ?? 500;
  const message = err?.message ?? "Error interno del servidor";

  res.status(status).json({
    error: message,
  });
}