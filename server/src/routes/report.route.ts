import { Router } from "express";
import { getProjectReportHandler } from "../controllers/report.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.get('/projects/:id', authenticate, getProjectReportHandler);

export default router;