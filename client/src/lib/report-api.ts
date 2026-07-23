import { apiFetch } from './api';
import { ProjectReport } from '@/types';

interface ApiResponse<T> {
success: boolean;
data: T;
}

export async function getProjectReport(
projectId: string
): Promise<ProjectReport> {
const response = await apiFetch<ApiResponse<ProjectReport>>(
`/reports/projects/${projectId}`
);

return response.data;
}
