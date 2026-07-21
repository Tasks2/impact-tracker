import { Request, Response } from 'express';
import { getDashboardStats } from '../services/dashboard.service.js';

export async function getDashboard(
  _req: Request,
  res: Response
) {
  const stats = await getDashboardStats();

  return res.status(200).json({
    success: true,
    data: stats
  });
}