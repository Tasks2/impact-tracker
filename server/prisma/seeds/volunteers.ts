import {PrismaClient, RecordStatus} from '@prisma/client';

export async function seedVolunteers(prisma: PrismaClient) {
    const volunteers = [
        {
            firstName: "Alice",
            lastName: "Kamau",
            phone: "0723456789",
            email: "alice@example.com",
            skills: "Community Outreach",
            availability: "Weekends",
            status: RecordStatus.ACTIVE
        },
        {
            firstName: "Bob",
            lastName: "Ochieng",
            phone: "0723456790",
            email: "bob@example.com",
            skills: "Event Planning",
            availability: "Weekdays",
            status: RecordStatus.ACTIVE
        },
        {
            firstName: "Catherine",
            lastName: "Mwangi",
            phone: "0723456680",
            email: null,
            skills: "Fundraising",
            availability: "Evenings",
            status: RecordStatus.ACTIVE
        },
        {
            firstName: "David",
            lastName: "Otieno",
            phone: "0723456681",
            email: "david@example.com",
            skills: "Teaching",
            availability: "Weekends",
            status: RecordStatus.INACTIVE
        },
        {
            firstName: "Eve",
            lastName: "Wambui",
            phone: "0723456682",
            email: "eve@example.com",
            skills: "Marketing",
            availability: "Weekdays",
            status: RecordStatus.ACTIVE
        },
        {
            firstName: "Frank",
            lastName: "Kiptoo",
            phone: "0723456683",
            email: null,
            skills: "Healthcare",
            availability: "Part time",
            status: RecordStatus.ACTIVE
        },
        {
            firstName: "Grace",
            lastName: "Njeri",
            phone: "0723456684",
            email: "grace@example.com",
            skills: "Event Coordination",
            availability: "Weekdays",
            status: RecordStatus.ACTIVE
        },
        {
            firstName: "Henry",
            lastName: "Mwangi",
            phone: "0723456685",
            email: "henry@example.com",
            skills:  "IT Support",
            availability: "Full time",
            status: RecordStatus.ACTIVE
        },
        {
            firstName: "Ivy",
            lastName: "Kamau",
            phone: "0723456686",
            email: null,
            skills: "Community Outreach",
            availability: "Part time",
            status: RecordStatus.INACTIVE
        },
        {
            firstName: "Jack",
            lastName: "Ochieng",
            phone: "0723456687",
            email: "jack@example.com",
            skills: "Event Planning",
            availability: "Weekdays",
            status: RecordStatus.ACTIVE
        },
        {
            firstName: "Karen",
            lastName: "Mwangi",
            phone: "0723456688",
            email: null,
            skills: "Fundraising",
            availability: "Weekends",
            status: RecordStatus.INACTIVE
        }
    ];

    for (const volunteer of volunteers) {
        await prisma.volunteer.upsert({
            where: { phone: volunteer.phone },
            update: volunteer,
            create: volunteer
        });
    }
}