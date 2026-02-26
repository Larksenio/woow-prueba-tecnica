import { prisma } from "../config/prisma";

export const userRepository = {
  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },
  findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  },
  listAll() {
    return prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, email: true, role: true, createdAt: true, updatedAt: true },
    });
  },
  create(data: { name: string; email: string; password: string; role?: "user" | "admin" }) {
    return prisma.user.create({ data });
  },
  update(id: string, data: Partial<{ name: string; email: string; password: string }>) {
    return prisma.user.update({ where: { id }, data });
  },
};