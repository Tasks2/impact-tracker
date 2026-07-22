import prisma from '../config/prisma.js';
import { CreateVolunteerInput, UpdateVolunteerInput } from '../types/volunteer.schema.js';

export async function getAllVolunteers(search?: string) {
  return prisma.volunteer.findMany({
    where: search
      ? {
          OR: [
            {
              firstName: {
                contains: search,
                mode: 'insensitive'
              }
            },
            {
              lastName: {
                contains: search,
                mode: 'insensitive'
              }
            },
            {
              phone: {
                contains: search
              }
            },
            {
              skills: {
                contains: search,
                mode: 'insensitive'
              }
            },
            {
              availability: {
                contains: search,
                mode: 'insensitive'
              }
            }
          ]
        }
      : undefined,
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export async function createVolunteer(data: CreateVolunteerInput) {
  return prisma.volunteer.create({
    data:{
        ...data
    }
  }
  )
}

export async function updateVolunteer(
  id: string,
  data: UpdateVolunteerInput
) {
  return prisma.volunteer.update({
    where: { id },
    data: {
      ...(data.firstName && { firstName: data.firstName }),
      ...(data.lastName && { lastName: data.lastName }),
      ...(data.phone && { phone: data.phone }),
      ...(data.status && { status: data.status }),
      ...(data.email !== undefined && { email: data.email }),
      ...(data.skills !== undefined && {
        skills: data.skills
      }),
      ...(data.availability !== undefined && {
        availability: data.availability
      })
    }
  });
}

export async function deleteVolunteer(id: string) {
  return prisma.volunteer.delete({
    where: { id }
  });
}