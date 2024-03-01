import type { ISODateString, UUID } from '@medsphere/shared';
import { InventoryStatus } from '../enums/pharmacy.enums';
import { ConflictError, InvalidStateError } from '../errors/pharmacy.errors';

export interface PharmacyItemProps {
  id: UUID;
  organizationId: UUID;
  ndcCode: string;
  drugName: string;
  strength: string;
  form: string;
  quantityOnHand: number;
  reorderLevel: number;
  unitPriceCents: number;
  status: InventoryStatus;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  deletedAt: ISODateString | null;
  version: number;
}

export class PharmacyItem {
  private readonly props: PharmacyItemProps;

  private constructor(props: PharmacyItemProps) {
    this.props = { ...props };
  }

  static create(props: PharmacyItemProps): PharmacyItem {
    return new PharmacyItem(props);
  }

  static register(input: {
    id: UUID;
    organizationId: UUID;
    now: ISODateString;
    ndcCode: string;
    drugName: string;
    strength: string;
    form: string;
    quantityOnHand: number;
    reorderLevel: number;
    unitPriceCents: number;
    status: InventoryStatus;
  }): PharmacyItem {
    return new PharmacyItem({
      id: input.id,
      organizationId: input.organizationId,
      ndcCode: input.ndcCode,
      drugName: input.drugName,
      strength: input.strength,
      form: input.form,
      quantityOnHand: input.quantityOnHand,
      reorderLevel: input.reorderLevel,
      unitPriceCents: input.unitPriceCents,
      status: input.status,
      createdAt: input.now,
      updatedAt: input.now,
      deletedAt: null,
      version: 1,
    });
  }

  get ndcCode(): string {
    return this.props.ndcCode;
  }

  get drugName(): string {
    return this.props.drugName;
  }

  get strength(): string {
    return this.props.strength;
  }

  get form(): string {
    return this.props.form;
  }

  get quantityOnHand(): number {
    return this.props.quantityOnHand;
  }

  get reorderLevel(): number {
    return this.props.reorderLevel;
  }

  get unitPriceCents(): number {
    return this.props.unitPriceCents;
  }

  get status(): InventoryStatus {
    return this.props.status;
  }

  get id(): UUID {
    return this.props.id;
  }

  get organizationId(): UUID {
    return this.props.organizationId;
  }

  get createdAt(): ISODateString {
    return this.props.createdAt;
  }

  get updatedAt(): ISODateString {
    return this.props.updatedAt;
  }

  get deletedAt(): ISODateString | null {
    return this.props.deletedAt;
  }

  get version(): number {
    return this.props.version;
  }

  isDeleted(): boolean {
    return this.props.deletedAt !== null;
  }

  assertActive(): void {
    if (this.isDeleted()) {
      throw new InvalidStateError('PharmacyItem has been deleted');
    }
  }

  touch(now: ISODateString): void {
    this.props.updatedAt = now;
    this.props.version += 1;
  }

  softDelete(now: ISODateString): void {
    if (this.isDeleted()) {
      throw new ConflictError('PharmacyItem is already deleted');
    }
    this.props.deletedAt = now;
    this.touch(now);
  }

  toProps(): PharmacyItemProps {
    return { ...this.props };
  }

  dispense(now: ISODateString, payload: Record<string, unknown> = {}): void {
    this.assertActive();
    for (const field of ["ndcCode","drugName","strength","form","quantityOnHand","reorderLevel","unitPriceCents","status"]) {
      if (payload[field] !== undefined) {
        (this.props as Record<string, unknown>)[field] = payload[field];
      }
    }
    this.touch(now);
  }

  updatePricing(now: ISODateString, payload: Record<string, unknown> = {}): void {
    this.assertActive();
    for (const field of ["ndcCode","drugName","strength","form","quantityOnHand","reorderLevel","unitPriceCents","status"]) {
      if (payload[field] !== undefined) {
        (this.props as Record<string, unknown>)[field] = payload[field];
      }
    }
    this.touch(now);
  }
}
