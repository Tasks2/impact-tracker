export type UserRole = 'admin' | 'field_worker';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export type ProjectStatus = 
  | 'PLANNED'
  | 'ACTIVE'
  | 'COMPLETED'
  | 'CANCELLED';

export interface Project {
  id: string;
  name: string;
  description: string | null;
  startDate: string;
  endDate: string | null;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
}

export type Gender = 'MALE' | 'FEMALE';

export interface Beneficiary {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string | null;
  dateOfBirth: string | null;
  gender: Gender | null;
  location: string | null;
  //registrationDate: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

export type RecordStatus = 'ACTIVE' | 'INACTIVE';

export interface Volunteer {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string | null;
  skills: string | null;
  availability: string | null;
  status: RecordStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityItem {
  id: string;
  message: string;
  timestamp: string;
  type: 'project' | 'beneficiary' | 'volunteer' | 'donation';
}

export interface DashboardStats {
  totalProjects: number;
  totalBeneficiaries: number;
  activeVolunteers: number;
  totalDonations: number;
}

export interface ProjectReport {
project: {
id: string;
name: string;
description: string | null;
startDate: string;
endDate: string | null;
status: string;
};
metrics: {
beneficiariesServed: number;
activeBeneficiaries: number;
volunteersAssigned: number;
activeVolunteers: number;
fieldWorkersAssigned: number;
};
beneficiaries: Array<{
id: string;
firstName: string;
lastName: string;
gender: string | null;
location: string | null;
status: string;
}>;
volunteers: Array<{
id: string;
firstName: string;
lastName: string;
skills: string | null;
availability: string | null;
status: string;
}>;
fieldWorkers: Array<{
id: string;
firstName: string;
lastName: string;
email: string;
}>;
}
