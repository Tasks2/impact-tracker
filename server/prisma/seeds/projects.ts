import { PrismaClient, ProjectStatus } from "@prisma/client";

export async function seedProjects(prisma: PrismaClient) {
    const projects = [
        {
            name: "School Feeding Program",
            description: "Providing nutritious meals to primary school learners in underserved communities.",
            startDate: new Date("2025-07-01"),
            status: ProjectStatus.ACTIVE
        },
        {
            name: "Clean Water Initiative",
            description: "Improving access to safe drinking water through boreholes and water purification systems.",
            startDate: new Date("2025-08-08"),
            status: ProjectStatus.ACTIVE
        },
        {
            name: "Youth Digital Skills",
            description: "Equipping young people with digital literacy and employment skills.",
            startDate: new Date("2026-09-15"),
            status: ProjectStatus.PLANNED
        },
        {
            name: "Maternal Health Outreach",
            description: "Supporting maternal and child health through community outreach clinics.",
            startDate: new Date("2026-04-15"),
            status: ProjectStatus.ACTIVE
        },
        {
            name: "Tree Planting Campaign",
            description: "Restoring degraded land through community-led tree planting initiatives.",
            startDate: new Date("2025-04-15"),
            endDate: new Date("2026-02-08"),
            status: ProjectStatus.COMPLETED        }
    ];

    for (const project of projects) {
        await prisma.project.upsert({
            where: { name: project.name },
            update: project,
            create: project
        });
    }
}