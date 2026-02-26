import type { Request, Response, NextFunction } from "express";
import { updateMeSchema } from "../schemas/auth.schemas";
import { userService } from "../services/user.service";
import { userRepository } from "../repositories/user.repository";

export const usersController = {
  async me(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const me = await userService.getMe(userId);
      res.json(me);
    } catch (e) {
      next(e);
    }
  },

  async updateMe(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.userId;
      const data = updateMeSchema.parse(req.body);
      const updated = await userService.updateMe(userId, data);
      res.json(updated);
    } catch (e) {
      next(e);
    }
  },

  async listAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userRepository.listAll();
      res.json(users);
    } catch (e) {
      next(e);
    }
  },
};