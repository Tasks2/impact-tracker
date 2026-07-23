import { Router } from 'express';
import projectRoutes from './project.routes.js';
import beneficiaryRoutes from './beneficiary.route.js';
import volunteerRoutes from './volunteer.route.js';
import userRoutes from './user.routes.js';
import dashboardRoutes from './dashboard.route.js';
import authRoutes from './auth.route.js';
import reportRoutes from './report.route.js'


const router = Router();


router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/beneficiaries', beneficiaryRoutes);
router.use('/volunteers', volunteerRoutes);
router.use('/users', userRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/reports', reportRoutes);


export default router;