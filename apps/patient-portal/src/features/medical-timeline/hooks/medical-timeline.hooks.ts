import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { UUID } from '@medsphere/shared';

export interface useMedicalTimelineFilters {
  patientId?: UUID;
  status?: string;
  page?: number;
  pageSize?: number;
}

async function fetchuseMedicalTimeline(filters: useMedicalTimelineFilters) {
  const params = new URLSearchParams();
  if (filters.patientId) params.set('patientId', filters.patientId);
  if (filters.status) params.set('status', filters.status);
  if (filters.page) params.set('page', String(filters.page));
  if (filters.pageSize) params.set('pageSize', String(filters.pageSize));
  const res = await fetch(`/api/v1/patient?${params}`, { credentials: 'include' });
  if (!res.ok) throw new Error('Failed to load Medical Timeline');
  return res.json();
}

export function useMedicalTimeline(filters: useMedicalTimelineFilters = {}) {
  return useQuery({
    queryKey: ['patient-portal', 'medical-timeline', filters],
    queryFn: () => fetchuseMedicalTimeline(filters),
    staleTime: 30_000,
  });
}

export function useMedicalTimelineMutation() {
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
      queryClient.invalidateQueries({ queryKey: ['patient-portal', 'medical-timeline'] });
    },
  });
}
