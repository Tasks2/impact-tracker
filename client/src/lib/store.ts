// import { supabase } from '@/lib/supabase';
// import { Project, Beneficiary, Volunteer, ActivityItem } from '@/types';

// // ─── SEED DATA ───────────────────────────────────────────────────────────────
// // Run this once to populate Supabase with demo data.
// // Call seedDatabase() from your browser console or a dev-only button.

// export async function seedDatabase() {
//   // Projects
//   const { data: projects } = await supabase.from('projects').select('id').limit(1);
//   if (projects && projects.length === 0) {
//     const { data: insertedProjects } = await supabase.from('projects').insert([
//       {
//         id: '00000000-0000-0000-0000-000000000001',
//         name: 'Clean Water Initiative',
//         status: 'Active',
//         start_date: '2025-01-15',
//         end_date: '2025-12-31',
//         budget: 50000,
//         budget_used: 18500,
//         description: 'Providing clean water to rural communities in the region.',
//       },
//       {
//         id: '00000000-0000-0000-0000-000000000002',
//         name: 'Youth Education Program',
//         status: 'Active',
//         start_date: '2025-03-01',
//         end_date: '2026-02-28',
//         budget: 35000,
//         budget_used: 12000,
//         description: 'After-school tutoring and mentorship for at-risk youth.',
//       },
//       {
//         id: '00000000-0000-0000-0000-000000000003',
//         name: 'Women Empowerment Workshop',
//         status: 'Completed',
//         start_date: '2024-06-01',
//         end_date: '2025-05-31',
//         budget: 20000,
//         budget_used: 19200,
//         description: 'Skills training and micro-finance support for women.',
//       },
//     ]).select();

//     // Tasks
//     if (insertedProjects) {
//       await supabase.from('tasks').insert([
//         { project_id: '00000000-0000-0000-0000-000000000001', title: 'Site survey completed', completed: true },
//         { project_id: '00000000-0000-0000-0000-000000000001', title: 'Well drilling started', completed: true },
//         { project_id: '00000000-0000-0000-0000-000000000001', title: 'Water testing', completed: false },
//         { project_id: '00000000-0000-0000-0000-000000000001', title: 'Community training', completed: false },
//         { project_id: '00000000-0000-0000-0000-000000000002', title: 'Recruit mentors', completed: true },
//         { project_id: '00000000-0000-0000-0000-000000000002', title: 'Setup learning centers', completed: true },
//         { project_id: '00000000-0000-0000-0000-000000000002', title: 'Launch curriculum', completed: false },
//         { project_id: '00000000-0000-0000-0000-000000000003', title: 'Identify participants', completed: true },
//         { project_id: '00000000-0000-0000-0000-000000000003', title: 'Conduct workshops', completed: true },
//         { project_id: '00000000-0000-0000-0000-000000000003', title: 'Distribute seed funding', completed: true },
//       ]);
//     }

//     // Beneficiaries
//     await supabase.from('beneficiaries').insert([
//       { full_name: 'Amina Yusuf', gender: 'Female', age: 34, location: 'Nairobi', needs: 'Clean water', services_received: 'Water filtration system', linked_project_id: '00000000-0000-0000-0000-000000000001', date_enrolled: '2025-02-10' },
//       { full_name: 'David Ochieng', gender: 'Male', age: 12, location: 'Kisumu', needs: 'Education', services_received: 'Tutoring, school supplies', linked_project_id: '00000000-0000-0000-0000-000000000002', date_enrolled: '2025-04-05' },
//       { full_name: 'Grace Wanjiku', gender: 'Female', age: 28, location: 'Mombasa', needs: 'Skills training', services_received: 'Tailoring course, seed capital', linked_project_id: '00000000-0000-0000-0000-000000000003', date_enrolled: '2024-07-15' },
//       { full_name: 'Peter Mwangi', gender: 'Male', age: 45, location: 'Nairobi', needs: 'Clean water', services_received: 'Well access', linked_project_id: '00000000-0000-0000-0000-000000000001', date_enrolled: '2025-03-20' },
//     ]);

//     // Volunteers
//     await supabase.from('volunteers').insert([
//       { name: 'Alice Kamau', contact: 'alice@email.com', assigned_project_id: '00000000-0000-0000-0000-000000000001', role: 'Community Liaison', hours_logged: 120 },
//       { name: 'Brian Otieno', contact: 'brian@email.com', assigned_project_id: '00000000-0000-0000-0000-000000000002', role: 'Tutor', hours_logged: 85 },
//       { name: 'Cynthia Akinyi', contact: 'cynthia@email.com', assigned_project_id: '00000000-0000-0000-0000-000000000001', role: 'Water Engineer', hours_logged: 200 },
//     ]);

//     // Activity log
//     await supabase.from('activity_log').insert([
//       { message: 'Clean Water Initiative: Well drilling started', timestamp: '2026-03-28T10:00:00Z' },
//       { message: 'New beneficiary enrolled: Peter Mwangi', timestamp: '2026-03-27T14:30:00Z' },
//       { message: 'Alice Kamau logged 8 volunteer hours', timestamp: '2026-03-26T09:00:00Z' },
//       { message: 'Youth Education Program: Mentors recruited', timestamp: '2026-03-25T11:00:00Z' },
//       { message: 'Donation received: $5,000', timestamp: '2026-03-24T16:00:00Z' },
//     ]);

//     // Donations
//     await supabase.from('donations').insert([
//       { donor_name: 'Anonymous', amount: 47500, date: '2026-03-24', notes: 'General fund' },
//     ]);
//   }
// }

// // ─── MAPPERS (snake_case → camelCase) ────────────────────────────────────────
// // These keep all page components unchanged.

// function mapProject(p: any, tasks: any[] = []): Project {
//   return {
//     id: p.id,
//     name: p.name,
//     status: p.status,
//     startDate: p.start_date,
//     endDate: p.end_date,
//     budget: p.budget,
//     budgetUsed: p.budget_used,
//     description: p.description ?? '',
//     tasks: tasks.map(t => ({ id: t.id, title: t.title, completed: t.completed })),
//     assignedWorkers: [],
//     createdAt: p.created_at,
//     updatedAt: p.updated_at,
//   };
// }

// function mapBeneficiary(b: any): Beneficiary {
//   return {
//     id: b.id,
//     fullName: b.full_name,
//     gender: b.gender,
//     age: b.age,
//     location: b.location,
//     needs: b.needs ?? '',
//     servicesReceived: b.services_received ?? '',
//     linkedProjectId: b.linked_project_id ?? '',
//     dateEnrolled: b.date_enrolled,
//     createdAt: b.created_at,
//   };
// }

// function mapVolunteer(v: any): Volunteer {
//   return {
//     id: v.id,
//     name: v.name,
//     contact: v.contact ?? '',
//     assignedProjectId: v.assigned_project_id ?? '',
//     role: v.role ?? '',
//     hoursLogged: v.hours_logged,
//     createdAt: v.created_at,
//   };
// }

// function mapActivity(a: any): ActivityItem {
//   return {
//     id: a.id,
//     message: a.message,
//     timestamp: a.timestamp,
//     type: 'project', // activity_log table has no type column; default is fine
//   };
// }

// // ─── PROJECTS ─────────────────────────────────────────────────────────────────

// export async function getProjects(): Promise<Project[]> {
//   const { data: projects, error } = await supabase
//     .from('projects')
//     .select('*, tasks(*)');
//   if (error || !projects) return [];
//   return projects.map(p => mapProject(p, p.tasks));
// }

// export async function getProject(id: string): Promise<Project | undefined> {
//   const { data, error } = await supabase
//     .from('projects')
//     .select('*, tasks(*)')
//     .eq('id', id)
//     .single();
//   if (error || !data) return undefined;
//   return mapProject(data, data.tasks);
// }

// export async function saveProject(project: Project): Promise<void> {
//   const row = {
//     id: project.id,
//     name: project.name,
//     status: project.status,
//     start_date: project.startDate,
//     end_date: project.endDate,
//     budget: project.budget,
//     budget_used: project.budgetUsed,
//     description: project.description,
//     updated_at: new Date().toISOString(),
//   };

//   await supabase.from('projects').upsert(row);

//   // Sync tasks: delete removed ones, upsert existing/new ones
//   const existingTaskIds = project.tasks.map(t => t.id);
//   if (existingTaskIds.length > 0) {
//     await supabase.from('tasks')
//       .delete()
//       .eq('project_id', project.id)
//       .not('id', 'in', `(${existingTaskIds.join(',')})`);
//   } else {
//     await supabase.from('tasks').delete().eq('project_id', project.id);
//   }

//   if (project.tasks.length > 0) {
//     await supabase.from('tasks').upsert(
//       project.tasks.map(t => ({
//         id: t.id,
//         project_id: project.id,
//         title: t.title,
//         completed: t.completed,
//       }))
//     );
//   }

//   await addActivity({ message: `Project updated: ${project.name}`, type: 'project' });
// }

// export async function deleteProject(id: string): Promise<void> {
//   await supabase.from('projects').delete().eq('id', id);
// }

// // ─── BENEFICIARIES ────────────────────────────────────────────────────────────

// export async function getBeneficiaries(): Promise<Beneficiary[]> {
//   const { data, error } = await supabase
//     .from('beneficiaries')
//     .select('*')
//     .order('created_at', { ascending: false });
//   if (error || !data) return [];
//   return data.map(mapBeneficiary);
// }

// export async function saveBeneficiary(b: Beneficiary): Promise<void> {
//   await supabase.from('beneficiaries').upsert({
//     id: b.id,
//     full_name: b.fullName,
//     gender: b.gender,
//     age: b.age,
//     location: b.location,
//     needs: b.needs,
//     services_received: b.servicesReceived,
//     linked_project_id: b.linkedProjectId || null,
//     date_enrolled: b.dateEnrolled,
//   });
//   await addActivity({ message: `Beneficiary updated: ${b.fullName}`, type: 'beneficiary' });
// }

// export async function deleteBeneficiary(id: string): Promise<void> {
//   await supabase.from('beneficiaries').delete().eq('id', id);
// }

// // ─── VOLUNTEERS ───────────────────────────────────────────────────────────────

// export async function getVolunteers(): Promise<Volunteer[]> {
//   const { data, error } = await supabase
//     .from('volunteers')
//     .select('*')
//     .order('created_at', { ascending: false });
//   if (error || !data) return [];
//   return data.map(mapVolunteer);
// }

// export async function saveVolunteer(v: Volunteer): Promise<void> {
//   await supabase.from('volunteers').upsert({
//     id: v.id,
//     name: v.name,
//     contact: v.contact,
//     assigned_project_id: v.assignedProjectId || null,
//     role: v.role,
//     hours_logged: v.hoursLogged,
//   });
//   await addActivity({ message: `Volunteer updated: ${v.name}`, type: 'volunteer' });
// }

// export async function deleteVolunteer(id: string): Promise<void> {
//   await supabase.from('volunteers').delete().eq('id', id);
// }

// // ─── ACTIVITY LOG ─────────────────────────────────────────────────────────────

// export async function getActivities(): Promise<ActivityItem[]> {
//   const { data, error } = await supabase
//     .from('activity_log')
//     .select('*')
//     .order('timestamp', { ascending: false })
//     .limit(50);
//   if (error || !data) return [];
//   return data.map(mapActivity);
// }

// export async function addActivity(
//   item: Omit<ActivityItem, 'id' | 'timestamp'>
// ): Promise<void> {
//   await supabase.from('activity_log').insert({
//     message: item.message,
//     timestamp: new Date().toISOString(),
//   });
// }

// // ─── DONATIONS ────────────────────────────────────────────────────────────────

// export async function getTotalDonations(): Promise<number> {
//   const { data, error } = await supabase
//     .from('donations')
//     .select('amount');
//   if (error || !data) return 0;
//   return data.reduce((sum, d) => sum + (d.amount ?? 0), 0);
// }

// // ─── DASHBOARD CHART ──────────────────────────────────────────────────────────

// export async function getBeneficiariesByMonth(): Promise<{ month: string; count: number }[]> {
//   const { data, error } = await supabase
//     .from('beneficiaries')
//     .select('date_enrolled');
//   if (error || !data) return [];

//   const months: Record<string, number> = {};
//   data.forEach(b => {
//     const d = new Date(b.date_enrolled);
//     const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
//     months[key] = (months[key] || 0) + 1;
//   });

//   return Object.entries(months)
//     .sort(([a], [b]) => a.localeCompare(b))
//     .slice(-6)
//     .map(([month, count]) => ({ month, count }));
// }