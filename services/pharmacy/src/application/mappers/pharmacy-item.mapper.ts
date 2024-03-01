import type { PharmacyItem } from '../../domain/entities/pharmacy-item.entity';

export interface PharmacyItemDto {
  id: string;
  organizationId: string;
  ndcCode: string;
  drugName: string;
  strength: string;
  form: string;
  quantityOnHand: number;
  reorderLevel: number;
  unitPriceCents: number;
  status: InventoryStatus;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export class PharmacyItemMapper {
  static toDto(entity: PharmacyItem): PharmacyItemDto {
    return {
      id: entity.id,
      organizationId: entity.organizationId,
      ndcCode: entity.ndcCode,
      drugName: entity.drugName,
      strength: entity.strength,
      form: entity.form,
      quantityOnHand: entity.quantityOnHand,
      reorderLevel: entity.reorderLevel,
      unitPriceCents: entity.unitPriceCents,
      status: entity.status,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      version: entity.version,
    };
  }
}
