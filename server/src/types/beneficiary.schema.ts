import { z } from 'zod';

export const createBeneficiarySchema = z.object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    phone: z.string().min(10).max(15),
    email: z.string().email().optional().nullable(),
    dateOfBirth: z.string().optional().nullable(),
    gender: z.enum(['MALE', 'FEMALE']).optional().nullable(),
    location: z.string().max(100).optional().nullable()
});

export const updateBeneficiarySchema = createBeneficiarySchema.partial();

export type CreateBeneficiaryInput = z.infer<typeof createBeneficiarySchema>;

export type UpdateBeneficiaryInput = z.infer<typeof updateBeneficiarySchema>;