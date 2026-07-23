import prisma from "../config/prisma.js";

export async function getProjectReport(projectId: string) {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      beneficiaries: {
        include: { beneficiary: true }
      },
      volunteers: {
        include: { volunteer: true }
      },
      assignments: {
        include: { user: true }
      }
    }
  });

  if (!project) throw new Error('Project not found');

//   return {
//     project: { ... },
//     metrics: { ... },
//     beneficiaries: project.beneficiaries.map(...),
//     volunteers: project.volunteers.map(...),
//     fieldWorkers: project.assignments.map(...)
//   };
return {
  project: {
    id: project.id,
    name: project.name,
    description: project.description,
    startDate: project.startDate.toISOString(),
    endDate: project.endDate
      ? project.endDate.toISOString()
      : null,
    status: project.status,
  },

  metrics: {
    beneficiariesServed: project.beneficiaries.length,
    activeBeneficiaries: project.beneficiaries.filter(
      (bp) => bp.beneficiary.status === 'ACTIVE'
    ).length,

    volunteersAssigned: project.volunteers.length,
    activeVolunteers: project.volunteers.filter(
      (vp) => vp.volunteer.status === 'ACTIVE'
    ).length,

    fieldWorkersAssigned: project.assignments.length,
  },

  beneficiaries: project.beneficiaries.map((bp) => ({
    id: bp.beneficiary.id,
    firstName: bp.beneficiary.firstName,
    lastName: bp.beneficiary.lastName,
    gender: bp.beneficiary.gender,
    location: bp.beneficiary.location,
    status: bp.beneficiary.status,
  })),

  volunteers: project.volunteers.map((vp) => ({
    id: vp.volunteer.id,
    firstName: vp.volunteer.firstName,
    lastName: vp.volunteer.lastName,
    skills: vp.volunteer.skills,
    availability: vp.volunteer.availability,
    status: vp.volunteer.status,
  })),

  fieldWorkers: project.assignments.map((a) => ({
    id: a.user.id,
    firstName: a.user.firstName,
    lastName: a.user.lastName,
    email: a.user.email,
  })),
};
}