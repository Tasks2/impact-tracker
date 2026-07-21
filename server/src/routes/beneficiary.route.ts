import { Router } from "express";
import { getBeneficiaries, createBeneficiaryHandler, deleteBeneficiaryHandler, updateBeneficiaryHandler } from "../controllers/beneficiary.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { UserRole } from "@prisma/client";

const router = Router();

router.get('/', getBeneficiaries);


router.post(
  '/',
  authenticate,
  authorize(UserRole.ADMIN),
  createBeneficiaryHandler
);

router.put(
  '/:id',
  authenticate,
  authorize(UserRole.ADMIN),
  updateBeneficiaryHandler
);

router.delete(
  '/:id',
  authenticate,
  authorize(UserRole.ADMIN),
  deleteBeneficiaryHandler
);

export default router;