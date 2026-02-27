import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "El nombre es requerido"),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  role: z.enum(["user", "admin"]).optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

export const updateMeSchema = z.object({
  name: z.string().min(2, "El nombre es requerido").optional(),
  email: z.string().email("Email inválido").optional(),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres").optional(),
});