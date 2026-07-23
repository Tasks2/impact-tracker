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
