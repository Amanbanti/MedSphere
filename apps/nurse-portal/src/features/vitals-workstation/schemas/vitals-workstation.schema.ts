import { z } from 'zod';

export const vitalsworkstationSchema = z.object({
  patientId: z.string().uuid().optional(),
  notes: z.string().max(2000).optional(),
  status: z.enum(['ACTIVE', 'PENDING', 'COMPLETED']).default('ACTIVE'),
  metadata: z.record(z.unknown()).optional(),
});

export type VitalsWorkstationFormValues = z.infer<typeof vitalsworkstationSchema>;
