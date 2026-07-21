import {Router} from "express";
import {getProjects, createProjectHandler, updateProjectHandler, deleteProjectHandler} from "../controllers/project.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { UserRole } from "@prisma/client";

const router = Router();

router.get('/', getProjects);

router.post(
  '/',
  authenticate,
  authorize(UserRole.ADMIN),
  createProjectHandler
);

router.put(
  '/:id',
  authenticate,
  authorize(UserRole.ADMIN),
  updateProjectHandler
);

router.delete(
  '/:id',
  authenticate,
  authorize(UserRole.ADMIN),
  deleteProjectHandler
);

export default router;