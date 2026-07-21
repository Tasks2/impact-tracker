import { Router } from "express";
import { getVolunteers, createVolunteerHandler, updateVolunteerHandler, deleteVolunteerHandler } from "../controllers/volunteer.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { UserRole } from "@prisma/client";

const router = Router();

router.get('/', getVolunteers);
router.post('/', 
    authenticate, 
    authorize(UserRole.ADMIN), 
    createVolunteerHandler);
router.put(
  '/:id',
  authenticate,
  authorize(UserRole.ADMIN),
  updateVolunteerHandler
);

router.delete(
  '/:id',
  authenticate,
  authorize(UserRole.ADMIN),
  deleteVolunteerHandler
);

export default router;