import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import { PharmacyItem } from '../entities/pharmacy-item.entity';

export interface PharmacyItemFactoryInput {
  organizationId: UUID;
  ndcCode: string;
  drugName: string;
  strength: string;
  form: string;
  quantityOnHand: number;
  reorderLevel: number;
  id?: UUID;
  now?: string;
}

export class PharmacyItemFactory {
  static create(input: PharmacyItemFactoryInput): PharmacyItem {
    const now = input.now ?? nowIso();
    const id = input.id ?? (uuidv4() as UUID);
    return PharmacyItem.register({
      id,
      organizationId: input.organizationId,
      now,
      ndcCode: input.ndcCode,
      drugName: input.drugName,
      strength: input.strength,
      form: input.form,
      quantityOnHand: input.quantityOnHand,
      reorderLevel: input.reorderLevel,
    } as Parameters<typeof PharmacyItem.register>[0]);
  }

  static reconstitute(props: Parameters<typeof PharmacyItem.reconstitute>[0]): PharmacyItem {
    return PharmacyItem.reconstitute(props);
  }

  static clone(source: PharmacyItem, overrides: Partial<PharmacyItemFactoryInput> = {}): PharmacyItem {
    const snapshot = source.toSnapshot();
    return PharmacyItemFactory.create({
      organizationId: snapshot.organizationId as UUID,
      ndcCode: (overrides.ndcCode ?? snapshot.ndcCode) as string,
      drugName: (overrides.drugName ?? snapshot.drugName) as string,
      strength: (overrides.strength ?? snapshot.strength) as string,
      form: (overrides.form ?? snapshot.form) as string,
      quantityOnHand: (overrides.quantityOnHand ?? snapshot.quantityOnHand) as number,
      reorderLevel: (overrides.reorderLevel ?? snapshot.reorderLevel) as number,
      id: overrides.id,
      now: overrides.now,
    });
  }
}
