import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { UUID } from '@medsphere/shared';

export interface useAllergyEditorFilters {
  patientId?: UUID;
  status?: string;
  page?: number;
  pageSize?: number;
}

async function fetchuseAllergyEditor(filters: useAllergyEditorFilters) {
  const params = new URLSearchParams();
  if (filters.patientId) params.set('patientId', filters.patientId);
  if (filters.status) params.set('status', filters.status);
  if (filters.page) params.set('page', String(filters.page));
  if (filters.pageSize) params.set('pageSize', String(filters.pageSize));
  const res = await fetch(`/api/v1/patient?${params}`, { credentials: 'include' });
  if (!res.ok) throw new Error('Failed to load Allergy Management');
  return res.json();
}

export function useAllergyEditor(filters: useAllergyEditorFilters = {}) {
  return useQuery({
    queryKey: ['patient-portal', 'allergy-editor', filters],
    queryFn: () => fetchuseAllergyEditor(filters),
    staleTime: 30_000,
  });
}

export function useAllergyEditorMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      const res = await fetch(`/api/v1/patient`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Mutation failed');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patient-portal', 'allergy-editor'] });
    },
  });
}
