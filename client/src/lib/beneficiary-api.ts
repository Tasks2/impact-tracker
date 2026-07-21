import { apiFetch } from './api';
import { Beneficiary } from '@/types';

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export async function getBeneficiaries(
  search?: string
): Promise<Beneficiary[]> {
  const query = search
    ? `/beneficiaries?search=${encodeURIComponent(search)}`
    : '/beneficiaries';

  const response =
    await apiFetch<ApiResponse<Beneficiary[]>>(query);

  return response.data;
}

export async function saveBeneficiary(
  beneficiary: Beneficiary
): Promise<Beneficiary> {
  const payload = {
    firstName: beneficiary.firstName,
    lastName: beneficiary.lastName,
    phone: beneficiary.phone,
    email: beneficiary.email || undefined,
    dateOfBirth:
      beneficiary.dateOfBirth || undefined,
    gender: beneficiary.gender || undefined,
    location: beneficiary.location || undefined,
    status: beneficiary.status,
  };

  // Create
  if (!beneficiary.id || beneficiary.id === '') {
    const response =
      await apiFetch<ApiResponse<Beneficiary>>(
        '/beneficiaries',
        {
          method: 'POST',
          body: JSON.stringify(payload),
        }
      );

    return response.data;
  }

  // Update
  const response =
    await apiFetch<ApiResponse<Beneficiary>>(
      `/beneficiaries/${beneficiary.id}`,
      {
        method: 'PUT',
        body: JSON.stringify(payload),
      }
    );

  return response.data;
}

export async function deleteBeneficiary(
  id: string
): Promise<void> {
  await apiFetch(`/beneficiaries/${id}`, {
    method: 'DELETE',
  });
}