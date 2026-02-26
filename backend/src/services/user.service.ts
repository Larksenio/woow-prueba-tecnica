import bcrypt from "bcryptjs";
import { userRepository } from "../repositories/user.repository";

export const userService = {
  async getMe(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) {
      const e: any = new Error("Usuario no encontrado");
      e.statusCode = 404;
      throw e;
    }
    return { id: user.id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt, updatedAt: user.updatedAt };
  },

  async updateMe(userId: string, data: Partial<{ name: string; email: string; password: string }>) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    try {
      const updated = await userRepository.update(userId, data);
      return { id: updated.id, name: updated.name, email: updated.email, role: updated.role, createdAt: updated.createdAt, updatedAt: updated.updatedAt };
    } catch (err: any) {
      // email unique
      if (err?.code === "P2002") {
        const e: any = new Error("El email ya está en uso");
        e.statusCode = 409;
        throw e;
      }
      throw err;
    }
  },
};