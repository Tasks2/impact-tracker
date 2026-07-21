import prisma from '../config/prisma.js';
import {
  ProjectStatus,
  RecordStatus,
  UserRole
} from '@prisma/client';

export async function getDashboardStats() {
  const [
    totalProjects,
    activeProjects,
    completedProjects,
    totalBeneficiaries,
    activeBeneficiaries,
    totalVolunteers,
    activeVolunteers,
    totalUsers,
    fieldWorkers,
    admins
  ] = await Promise.all([
    prisma.project.count(),

    prisma.project.count({
      where: { status: ProjectStatus.ACTIVE }
    }),

    prisma.project.count({
      where: { status: ProjectStatus.COMPLETED }
    }),

    prisma.beneficiary.count(),

    prisma.beneficiary.count({
      where: { status: RecordStatus.ACTIVE }
    }),

    prisma.volunteer.count(),

    prisma.volunteer.count({
      where: { status: RecordStatus.ACTIVE }
    }),

    prisma.user.count(),

    prisma.user.count({
      where: { role: UserRole.FIELD_WORKER }
    }),

    prisma.user.count({
      where: { role: UserRole.ADMIN }
    })
  ]);

  return {
    projects: {
      total: totalProjects,
      active: activeProjects,
      completed: completedProjects
    },

    beneficiaries: {
      total: totalBeneficiaries,
      active: activeBeneficiaries
    },

    volunteers: {
      total: totalVolunteers,
      active: activeVolunteers
    },

    users: {
      total: totalUsers,
      fieldWorkers,
      admins
    }
  };
}