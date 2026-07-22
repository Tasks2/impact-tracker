import prisma from '../config/prisma.js';
import {
  CreateBeneficiaryInput,
  UpdateBeneficiaryInput
} from '../types/beneficiary.schema.js';

export async function getAllBeneficiaries(search?: string) {
  return prisma.beneficiary.findMany({
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
              location: {
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

export async function createBeneficiary(
  data: CreateBeneficiaryInput
) {
  return prisma.beneficiary.create({
    data: {
      ...data,
      dateOfBirth: data.dateOfBirth
        ? new Date(data.dateOfBirth)
        : null
    }
  });
}

export async function updateBeneficiary(
  id: string,
  data: UpdateBeneficiaryInput
) {
  return prisma.beneficiary.update({
    where: { id },
    data: {
      ...(data.firstName && { firstName: data.firstName }),
      ...(data.lastName && { lastName: data.lastName }),
      ...(data.phone && { phone: data.phone }),
      ...(data.status && { status: data.status }),
      ...(data.email !== undefined && { email: data.email }),
      ...(data.location !== undefined && {
        location: data.location
      }),
      ...(data.gender !== undefined && {
        gender: data.gender
      }),
      ...(data.dateOfBirth !== undefined && {
        dateOfBirth: data.dateOfBirth
          ? new Date(data.dateOfBirth)
          : null
      })
    }
  });
}

export async function deleteBeneficiary(id: string) {
  return prisma.beneficiary.delete({
    where: { id }
  });
}