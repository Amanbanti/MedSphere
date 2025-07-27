import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { UUID } from '@medsphere/shared';

export interface useReportDictatorFilters {
  patientId?: UUID;
  status?: string;
  page?: number;
  pageSize?: number;
}

async function fetchuseReportDictator(filters: useReportDictatorFilters) {
  const params = new URLSearchParams();
  if (filters.patientId) params.set('patientId', filters.patientId);
  if (filters.status) params.set('status', filters.status);
  if (filters.page) params.set('page', String(filters.page));
  if (filters.pageSize) params.set('pageSize', String(filters.pageSize));
  const res = await fetch(`/api/v1/radiology?${params}`, { credentials: 'include' });
  if (!res.ok) throw new Error('Failed to load Report Dictation');
  return res.json();
}

export function useReportDictator(filters: useReportDictatorFilters = {}) {
  return useQuery({
    queryKey: ['radiology-portal', 'report-dictator', filters],
    queryFn: () => fetchuseReportDictator(filters),
    staleTime: 30_000,
  });
}

export function useReportDictatorMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Record<string, unknown>) => {
      const res = await fetch(`/api/v1/radiology`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Mutation failed');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['radiology-portal', 'report-dictator'] });
    },
  });
}
