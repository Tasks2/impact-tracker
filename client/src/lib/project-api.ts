import { apiFetch } from './api';
import { Project } from '@/types';

// Backend response wrapper
interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export async function getProjects(): Promise<Project[]> {
  const response = await apiFetch<ApiResponse<Project[]>>('/projects');
  return response.data;
}

export async function saveProject(project: Project): Promise<Project> {
  // Create
  if (!project.id || project.id === '') {
    const response = await apiFetch<ApiResponse<Project>>('/projects', {
      method: 'POST',
      body: JSON.stringify({
        name: project.name,
        description: project.description,
        startDate: project.startDate,
        endDate: project.endDate || null,
        status: mapStatusToBackend(project.status),
      }),
    });

    return response.data;
  }

  // Update
  const response = await apiFetch<ApiResponse<Project>>(
    `/projects/${project.id}`,
    {
      method: 'PUT',
      body: JSON.stringify({
        name: project.name,
        description: project.description,
        startDate: project.startDate,
        endDate: project.endDate || null,
        status: mapStatusToBackend(project.status),
      }),
    }
  );

  return response.data;
}

export async function deleteProject(id: string): Promise<void> {
  await apiFetch(`/projects/${id}`, {
    method: 'DELETE',
  });
}

function mapStatusToBackend(
  status: Project['status']
): 'PLANNED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED' {
  return status;
}
