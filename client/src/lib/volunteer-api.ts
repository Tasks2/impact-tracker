import { apiFetch } from './api';
import { Volunteer } from '@/types';

interface ApiResponse<T> {
success: boolean;
data: T;
}

export async function getVolunteers(): Promise<Volunteer[]> {
const response = await apiFetch<ApiResponse<Volunteer[]>>('/volunteers');
return response.data;
}

export async function saveVolunteer(
volunteer: Volunteer
): Promise<Volunteer> {
const payload = {
firstName: volunteer.firstName,
lastName: volunteer.lastName,
phone: volunteer.phone,
email: volunteer.email || undefined,
skills: volunteer.skills || undefined,
availability: volunteer.availability || undefined,
status: volunteer.status,
};

// Create
if (!volunteer.id || volunteer.id === '') {
const response = await apiFetch<ApiResponse<Volunteer>>(
'/volunteers',
{
method: 'POST',
body: JSON.stringify(payload),
}
);

```
return response.data;
```

}

// Update
const response = await apiFetch<ApiResponse<Volunteer>>(
`/volunteers/${volunteer.id}`,
{
method: 'PUT',
body: JSON.stringify(payload),
}
);

return response.data;
}

export async function deleteVolunteer(id: string): Promise<void> {
await apiFetch(`/volunteers/${id}`, {
method: 'DELETE',
});
}
