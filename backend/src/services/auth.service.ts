import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/user.repository";
import { jwtConfig } from "../config/jwt";

function signToken(payload: { userId: string; email: string; role: "user" | "admin" }) {
  return jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
}

export const authService = {
  async register(input: { name: string; email: string; password: string; role?: "user" | "admin" }) {
    const existing = await userRepository.findByEmail(input.email);
    if (existing) {
      const e: any = new Error("El email ya está registrado");
      e.statusCode = 409;
      throw e;
    }

    const hashed = await bcrypt.hash(input.password, 10);

    const user = await userRepository.create({
      name: input.name,
      email: input.email,
      password: hashed,
      role: input.role ?? "user",
    });

    const token = signToken({ userId: user.id, email: user.email, role: user.role });

    return {
      user: { id: user.id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt, updatedAt: user.updatedAt },
      token,
    };
  },

  async login(input: { email: string; password: string }) {
    const user = await userRepository.findByEmail(input.email);
    if (!user) {
      const e: any = new Error("Credenciales inválidas");
      e.statusCode = 401;
      throw e;
    }

    const ok = await bcrypt.compare(input.password, user.password);
    if (!ok) {
      const e: any = new Error("Credenciales inválidas");
      e.statusCode = 401;
      throw e;
    }

    const token = signToken({ userId: user.id, email: user.email, role: user.role });

    return {
      user: { id: user.id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt, updatedAt: user.updatedAt },
      token,
    };
  },
};