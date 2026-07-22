import {z} from 'zod';

export const createVolunteerSchema = z.object({
    firstName: z.string().min(2).max(50),
 lastName: z.string().min(2).max(50),
 phone: z.string().min(10).max(15),
 email: z.string().email().optional().nullable(),
 skills: z.string().optional().nullable(),
 availability: z.string().optional().nullable(),
 status: z.enum(['ACTIVE', 'INACTIVE']).optional()
});

export const updateVolunteerSchema = createVolunteerSchema.partial();

export type CreateVolunteerInput = z.infer<typeof createVolunteerSchema>;

export type UpdateVolunteerInput = z.infer<typeof updateVolunteerSchema>;
