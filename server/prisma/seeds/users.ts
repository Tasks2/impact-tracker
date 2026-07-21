import { PrismaClient, UserRole, RecordStatus } from "@prisma/client";
import bcrypt from "bcrypt";

export async function seedUsers(prisma: PrismaClient) {
    const users = [
        {
            firstName: "Sarah",
            lastName: "Wanjiku",
            email: "sarah@impacthub.org",
            role: UserRole.ADMIN,
            status: RecordStatus.ACTIVE
        },
        {
            firstName: "James",
            lastName: "Otieno",
            email: "james@impacthub.org",
            role: UserRole.ADMIN,
            status: RecordStatus.ACTIVE
        },
        {
            firstName: "Mary",
            lastName: "Achieng",
            email: "mary@impacthub.org",
            role: UserRole.FIELD_WORKER,
            status: RecordStatus.ACTIVE
        },
        {
            firstName: "Brian",
            lastName: "Kiptoo",
            email: "brian@impacthub.org",
            role: UserRole.FIELD_WORKER,
            status: RecordStatus.ACTIVE
        },
        {
            firstName: "Faith",
            lastName: "Njeri",
            email: "faith@impacthub.org",
            role: UserRole.FIELD_WORKER,
            status: RecordStatus.ACTIVE
        },
        {
            firstName: "Peter",
            lastName: "Mwangi",
            email: "peter@impacthub.org",
            role: UserRole.FIELD_WORKER,
            status: RecordStatus.ACTIVE
        },
        {
            firstName: "Kevin",
            lastName:"Ouma",
            email: "kevin@impacthub.org",
            role: UserRole.FIELD_WORKER,
            status: RecordStatus.ACTIVE
        }
    ];

    const defaultPasswordHash = await bcrypt.hash("Password123!", 10);
    for (const user of users) {
        await prisma.user.upsert({
            where: { email: user.email },
            update: {...user, passwordHash: defaultPasswordHash},
            create: {...user, passwordHash: defaultPasswordHash}
        });
    }
}