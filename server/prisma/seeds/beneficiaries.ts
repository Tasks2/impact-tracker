import {PrismaClient, RecordStatus, Gender} from '@prisma/client';

export async function seedBeneficiaries(prisma: PrismaClient) {
    const beneficiaries = [
        {
            firstName: 'John',
            lastName: 'Ouma',
            phone: '0712345678',
            email: null,
            dateOfBirth: new Date('1985-05-15'),
            gender: Gender.MALE,
            location: 'Kisumu',
            status: RecordStatus.ACTIVE
        },
        {
            firstName: 'Jane',
            lastName: 'Wanjiru',
            phone: '0712345679',
            email: null,
            dateOfBirth: new Date('1990-08-20'),
            gender: Gender.FEMALE,
            location: 'Nairobi',
            status: RecordStatus.ACTIVE
        },
        {
            firstName: 'Michael',
            lastName: 'Kiptoo',
            phone: '0712345680',
            email: null,
            dateOfBirth: new Date('1988-12-10'),
            gender: Gender.MALE,
            location: 'Mombasa',
            status: RecordStatus.INACTIVE
        },
        {
            firstName: 'Emily',
            lastName: 'Achieng',
            phone: '0712345681',
            email: null,
            dateOfBirth: new Date('1995-03-05'),
            gender: Gender.FEMALE,
            location: 'Kisumu',
            status: RecordStatus.ACTIVE
        },
        {
            firstName: 'David',
            lastName: 'Mwangi',
            phone: '0712345682',
            email: null,
            dateOfBirth: new Date('1982-11-25'),
            gender: Gender.MALE,
            location: 'Nairobi',
            status: RecordStatus.INACTIVE
        },
        {
            firstName: 'Sophia',
            lastName: 'Kamau',
            phone: '0712345683',
            email: 'sophia@example.com',
            dateOfBirth: new Date('1992-07-18'),
            gender: Gender.FEMALE,
            location: 'Mombasa',
            status: RecordStatus.ACTIVE
        },
        {
            firstName: 'Daniel',
            lastName: 'Otieno',
            phone: '0712345684',
            email: 'daniel@example.com',
            dateOfBirth: new Date('1987-09-30'),
            gender: Gender.MALE,
            location: 'Eldoret',
            status: RecordStatus.ACTIVE
        },
        {
            firstName: 'Olivia',
            lastName: 'Njeri',
            phone: '0712345685',
            email: 'olivia@example.com',
            dateOfBirth: new Date('1993-02-12'),
            gender: Gender.FEMALE,
            location: 'Nairobi',
            status: RecordStatus.INACTIVE
        },
        {
            firstName: 'James',
            lastName: 'Kamau',
            phone: '0712345686',
            email: 'james@example.com',
            dateOfBirth: new Date('1989-06-22'),
            gender: Gender.MALE,
            location: 'Kisumu',
            status: RecordStatus.ACTIVE
        },
        {
            firstName: 'Grace',
            lastName: 'Achieng',
            phone: '0712345687',
            email: 'grace@example.com',
            dateOfBirth: new Date('1990-04-15'),
            gender: Gender.FEMALE,
            location: 'Nairobi',
            status: RecordStatus.INACTIVE
        }
    ];

    for (const beneficiary of beneficiaries) {
        await prisma.beneficiary.upsert({
            where: { phone: beneficiary.phone },
            update: beneficiary,
            create: beneficiary
        });
    }
}