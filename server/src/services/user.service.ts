import prisma from '../config/prisma.js';

export async function getAllUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
      status: true,
      createdAt: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
      status: true,
      createdAt: true
    }
  });
}

export async function getUserAssignments(id: string) {
  return prisma.projectAssignment.findMany({
    where: { userId: id },
    include: {
      project: true,
      assignedByUser: {
        select: {
          firstName: true,
          lastName: true,
          email: true
        }
      }
    },
    orderBy: {
      assignedAt: 'desc'
    }
  });
}