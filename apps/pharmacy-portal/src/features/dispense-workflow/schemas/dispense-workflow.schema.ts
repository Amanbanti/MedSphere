import { z } from 'zod';

export const dispenseworkflowSchema = z.object({
  patientId: z.string().uuid().optional(),
  notes: z.string().max(2000).optional(),
  status: z.enum(['ACTIVE', 'PENDING', 'COMPLETED']).default('ACTIVE'),
  metadata: z.record(z.unknown()).optional(),
});

export type DispenseWorkflowFormValues = z.infer<typeof dispenseworkflowSchema>;
