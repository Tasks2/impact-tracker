import prisma from '../config/prisma.js';
import { CreateProjectInput, UpdateProjectInput } from '../types/project.schema.js';


export async function getAllProjects() {
  return prisma.project.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export async function createProject(data: CreateProjectInput) {
  return prisma.project.create({
    data: {
      name: data.name,
      description: data.description,
      startDate: new Date(data.startDate),
      endDate: data.endDate ? new Date(data.endDate) : null,
      status: data.status ?? 'PLANNED'
    }
  });
}


export async function updateProject(
  id: string,
  data: UpdateProjectInput
) {
  return prisma.project.update({
    where: { id },
    data: {
      ...(data.name && { name: data.name }),
      ...(data.description !== undefined && {
        description: data.description
      }),
      ...(data.startDate && {
        startDate: new Date(data.startDate)
      }),
      ...(data.endDate !== undefined && {
        endDate: data.endDate ? new Date(data.endDate) : null
      }),
      ...(data.status && { status: data.status })
    }
  });
}

export async function deleteProject(id: string) {
  return prisma.project.delete({
    where: { id }
  });
}