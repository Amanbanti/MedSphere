import type { UUID } from '@medsphere/shared';
import { PharmacyItemFactory, type PharmacyItemFactoryInput } from '../factories/pharmacy-item.factory';
import { PharmacyItem } from '../entities/pharmacy-item.entity';

export class PharmacyItemBuilder {
  private readonly input: Partial<PharmacyItemFactoryInput> = {};

  static create(): PharmacyItemBuilder {
    return new PharmacyItemBuilder();
  }

  withOrganization(organizationId: UUID): this {
    this.input.organizationId = organizationId;
    return this;
  }

  withNdcCode(ndcCode: string): this {
    this.input.ndcCode = ndcCode;
    return this;
  }

  withDrugName(drugName: string): this {
    this.input.drugName = drugName;
    return this;
  }

  withStrength(strength: string): this {
    this.input.strength = strength;
    return this;
  }

  withForm(form: string): this {
    this.input.form = form;
    return this;
  }

  withQuantityOnHand(quantityOnHand: number): this {
    this.input.quantityOnHand = quantityOnHand;
    return this;
  }

  withReorderLevel(reorderLevel: number): this {
    this.input.reorderLevel = reorderLevel;
    return this;
  }

  withUnitPriceCents(unitPriceCents: number): this {
    this.input.unitPriceCents = unitPriceCents;
    return this;
  }

  withStatus(status: InventoryStatus): this {
    this.input.status = status;
    return this;
  }

  withId(id: UUID): this {
    this.input.id = id;
    return this;
  }

  build(): PharmacyItem {
    if (!this.input.organizationId) {
      throw new Error('organizationId is required');
    }
    return PharmacyItemFactory.create(this.input as PharmacyItemFactoryInput);
  }
}
