import { PrismaClient, AssignmentStatus } from "@prisma/client";

export async function seedProjectAssignments(prisma: PrismaClient) {
    const sarah = await prisma.user.findUnique({
         where: { email: "sarah@impacthub.org" } 
        });
    const james = await prisma.user.findUnique({
         where: { email: "james@impacthub.org" } 
        });
    const mary = await prisma.user.findUnique({
         where: { email: "mary@impacthub.org" } 
        });
    const brian = await prisma.user.findUnique({
         where: { email: "brian@impacthub.org" } 
        });
    const faith = await prisma.user.findUnique({
         where: { email: "faith@impacthub.org" } 
    });
    const peter = await prisma.user.findUnique({
        where: { email: "peter@impacthub.org" } 
        });
    const kevin = await prisma.user.findUnique({
        where: { email: "kevin@impacthub.org" } 
    });

    const schoolFeeding= await prisma.project.findUnique({
        where: { name: "School Feeding Program" } 
    });
    const cleanWater= await prisma.project.findUnique({
        where: { name: "Clean Water Initiative" } 
    });
    const youthDigitalSkills= await prisma.project.findUnique({
        where: { name: "Youth Digital Skills" } 
    });
    const maternalHealth= await prisma.project.findUnique({
        where: { name: "Maternal Health Outreach" } 
    });
    const treePlanting= await prisma.project.findUnique({
        where: { name: "Tree Planting Campaign" } 
    });

    if(!sarah || !james || !mary || !brian || !faith || !peter || !kevin) {
        throw new Error("One or more users not found");
    }
    if(!schoolFeeding || !cleanWater || !youthDigitalSkills || !maternalHealth || !treePlanting) {
        throw new Error("One or more projects not found");
    }

    const assignments = [
        {user: mary, project: schoolFeeding, assignedBy: sarah, status: AssignmentStatus.ACTIVE},
        {user: brian, project: cleanWater, assignedBy: sarah, status: AssignmentStatus.ACTIVE},
        {user: faith, project: youthDigitalSkills, assignedBy: sarah, status: AssignmentStatus.ACTIVE},
        {user: peter, project: maternalHealth, assignedBy: james, status: AssignmentStatus.ACTIVE},
        {user: kevin, project: treePlanting, assignedBy: james, status: AssignmentStatus.ACTIVE}
    ]

    for (const assignment of assignments) {
        await prisma.projectAssignment.upsert({
            where: {
                userId_projectId: {
                    userId: assignment.user.id,
                    projectId: assignment.project.id
                }
            },
            update: {},
            create: {
                userId: assignment.user.id,
                projectId: assignment.project.id,
                assignedBy: assignment.assignedBy.id,
                status: assignment.status
            }
        });
    }

        //     await prisma.projectAssignment.upsert({
//   where: {
//     userId_projectId: {
//       userId: mary.id,
//       projectId: schoolFeeding.id
//     }
//   },
//   update: {},
//   create: {
//     userId: mary.id,
//     projectId: schoolFeeding.id,
//     assignedBy: sarah.id,
//     status: AssignmentStatus.ACTIVE
//   }
// });

}

export async function seedBeneficiaryProjects(prisma: PrismaClient) {
     // fetch beneficiaries
     const john = await prisma.beneficiary.findUnique({
        where: { phone: "0712345678" } 
    });
    const sophia = await prisma.beneficiary.findUnique({
        where: { phone: "0712345683" }
    });
    const daniel = await prisma.beneficiary.findUnique({
        where: { phone: "0712345684" }
    });
    const olivia = await prisma.beneficiary.findUnique({
        where: { phone: "0712345685" }
    });
    const james = await prisma.beneficiary.findUnique({
        where: { phone: "0712345686" }
    });
    const grace = await prisma.beneficiary.findUnique({
        where: { phone: "0712345687" }
    });
    const david = await prisma.beneficiary.findUnique({
        where: { phone: "0712345682" }
    });
    const michael = await prisma.beneficiary.findUnique({
        where: { phone: "0712345680" }
    });
    const jane = await prisma.beneficiary.findUnique({
        where: { phone: "0712345679" }
    });
    const emily = await prisma.beneficiary.findUnique({
        where: { phone: "0712345681" }
    });
    
  // fetch projects
  const schoolFeeding= await prisma.project.findUnique({
    where: { name: "School Feeding Program" } 
  });
  const cleanWater= await prisma.project.findUnique({
    where: { name: "Clean Water Initiative" } 
  });
    const youthDigitalSkills= await prisma.project.findUnique({
    where: { name: "Youth Digital Skills" }
    });
    const maternalHealth= await prisma.project.findUnique({
    where: { name: "Maternal Health Outreach" }
    });
    const treePlanting= await prisma.project.findUnique({
    where: { name: "Tree Planting Campaign" } 
  });
  // validate
  if(!john || !sophia || !daniel || !olivia || !james || !grace || !david || !michael || !jane || !emily) {
    throw new Error("One or more beneficiaries not found");
  }
  if(!schoolFeeding || !cleanWater || !youthDigitalSkills || !maternalHealth || !treePlanting) {
    throw new Error("One or more projects not found");
  }

   const projectBeneficiaryAssignments = [
    { project: schoolFeeding, beneficiary: john, status: AssignmentStatus.ACTIVE },
    { project: schoolFeeding, beneficiary: jane, status: AssignmentStatus.ACTIVE },
    { project: schoolFeeding, beneficiary: emily, status: AssignmentStatus.ACTIVE },
    { project: cleanWater, beneficiary: david, status: AssignmentStatus.COMPLETED },
    { project: cleanWater, beneficiary: sophia, status: AssignmentStatus.ACTIVE },
    { project: cleanWater, beneficiary: james, status: AssignmentStatus.ACTIVE },
    { project: maternalHealth, beneficiary: jane, status: AssignmentStatus.ACTIVE },
    { project: maternalHealth, beneficiary: emily, status: AssignmentStatus.ACTIVE },
    { project: maternalHealth, beneficiary: olivia, status: AssignmentStatus.COMPLETED },
    { project: youthDigitalSkills, beneficiary: daniel, status: AssignmentStatus.ACTIVE },
    { project: youthDigitalSkills, beneficiary: olivia, status: AssignmentStatus.COMPLETED },
    { project: treePlanting, beneficiary: john, status: AssignmentStatus.ACTIVE },
    { project: treePlanting, beneficiary: david, status: AssignmentStatus.COMPLETED }
  ];


    for (const assignment of projectBeneficiaryAssignments) {  
        await prisma.beneficiaryProject.upsert({
            where:{
                beneficiaryId_projectId: {
                    beneficiaryId: assignment.beneficiary.id,
                    projectId: assignment.project.id
                }
            },
            update: {},
            create: {
                beneficiaryId: assignment.beneficiary.id,
                projectId: assignment.project.id,
                status: assignment.status
            }
        });
            }
     

}

export async function seedVolunteerProjects(prisma: PrismaClient) {
    
    const Karen = await prisma.volunteer.findUnique({
        where: { phone: "0723456688" } 
    });
    const Jack = await prisma.volunteer.findUnique({
        where: { phone: "0723456687" } 
    });
    const Ivy = await prisma.volunteer.findUnique({
        where: { phone: "0723456686" }
    });
    const Henry = await prisma.volunteer.findUnique({
        where: { phone: "0723456685" }
    });
    const Grace = await prisma.volunteer.findUnique({
        where: { phone: "0723456684" }
    });
    const Frank = await prisma.volunteer.findUnique({
        where: { phone: "0723456683" }
    });
    const Eve = await prisma.volunteer.findUnique({
        where: { phone: "0723456682" }
    });
    const David = await prisma.volunteer.findUnique({
        where: { phone: "0723456681" }
    });
    const Catherine = await prisma.volunteer.findUnique({
        where: { phone: "0723456680" }
    });
    const Bob = await prisma.volunteer.findUnique({
        where: { phone: "0723456790" }
    });
    const Alice = await prisma.volunteer.findUnique({
        where: { phone: "0723456789" }
    });
    const schoolFeeding= await prisma.project.findUnique({
        where: { name: "School Feeding Program" }
    });
    const cleanWater= await prisma.project.findUnique({
        where: { name: "Clean Water Initiative" }
     });
    const youthDigitalSkills= await prisma.project.findUnique({
    where: { name: "Youth Digital Skills" }
    });
    const maternalHealth= await prisma.project.findUnique({
    where: { name: "Maternal Health Outreach" }
    });
    const treePlanting= await prisma.project.findUnique({
    where: { name: "Tree Planting Campaign" } 
  });

  if(!Karen || !Jack || !Ivy || !Henry || !Grace || !Frank || !Eve || !David || !Catherine || !Bob || !Alice) {
    throw new Error("One or more volunteers not found");
  }
  if(!schoolFeeding || !cleanWater || !youthDigitalSkills || !maternalHealth || !treePlanting) {
    throw new Error("One or more projects not found");
  }

  const projectVolunteerAssignments = [
    { project: schoolFeeding, volunteer: Alice, status: AssignmentStatus.ACTIVE },
    { project: schoolFeeding, volunteer: Catherine, status: AssignmentStatus.ACTIVE },
    { project: cleanWater, volunteer: Ivy, status: AssignmentStatus.COMPLETED },
    { project: cleanWater, volunteer: Eve, status: AssignmentStatus.ACTIVE },
    { project: youthDigitalSkills, volunteer: Henry, status: AssignmentStatus.ACTIVE },
    { project: youthDigitalSkills, volunteer: David, status: AssignmentStatus.COMPLETED },
    { project: maternalHealth, volunteer: Grace, status: AssignmentStatus.ACTIVE },
    { project: maternalHealth, volunteer: Frank, status: AssignmentStatus.ACTIVE },
    { project: treePlanting, volunteer: Bob, status: AssignmentStatus.ACTIVE },
    { project: treePlanting, volunteer: Jack, status: AssignmentStatus.ACTIVE },
    { project: treePlanting, volunteer: Karen, status: AssignmentStatus.COMPLETED}
  ];

  for (const assignment of projectVolunteerAssignments) {
    await prisma.volunteerProject.upsert({
        where: {
            volunteerId_projectId: {
                volunteerId: assignment.volunteer.id,
                projectId: assignment.project.id
            }
        },
        update: {},
        create: {
            volunteerId: assignment.volunteer.id,
            projectId: assignment.project.id,
            status: assignment.status
        }
    });
}
  
}