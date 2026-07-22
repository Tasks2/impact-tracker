import { z } from 'zod';
const dateString = z.string().regex(
  /^\d{4}-\d{2}-\d{2}$/,
  'Date must be in YYYY-MM-DD format'
);

export const createBeneficiarySchema = z.object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    phone: z.string().min(10).max(15),
    email: z.string().email().optional().nullable(),
    dateOfBirth: z.union([dateString, z.null()]).optional(),
    gender: z.enum(['MALE', 'FEMALE']).optional().nullable(),
    location: z.string().max(100).optional().nullable(),
    status: z.enum(['ACTIVE', 'INACTIVE']).optional()
});

export const updateBeneficiarySchema = createBeneficiarySchema.partial();

export type CreateBeneficiaryInput = z.infer<typeof createBeneficiarySchema>;

export type UpdateBeneficiaryInput = z.infer<typeof updateBeneficiarySchema>;