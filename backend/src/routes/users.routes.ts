import { Router } from "express";
import { usersController } from "../controllers/users.controller";
import { requireAuth } from "../middlewares/auth";
import { requireAdmin } from "../middlewares/admin";

export const usersRouter = Router();

usersRouter.get("/me", requireAuth, usersController.me);
usersRouter.put("/me", requireAuth, usersController.updateMe);

usersRouter.get("/", requireAuth, requireAdmin, usersController.listAll);