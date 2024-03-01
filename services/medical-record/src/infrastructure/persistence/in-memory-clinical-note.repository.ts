import { Injectable } from '@nestjs/common';
import type { UUID } from '@medsphere/shared';
import { ClinicalNote } from '../../domain/entities/clinical-note.entity';
import type { ClinicalNoteRepository } from '../../domain/repositories/medical-record.repository';

@Injectable()
export class InMemoryClinicalNoteRepository implements ClinicalNoteRepository {
  private readonly store = new Map<string, ClinicalNote>();

  private key(organizationId: UUID, id: UUID): string {
    return `${organizationId}:${id}`;
  }

  async save(record: ClinicalNote): Promise<void> {
    this.store.set(this.key(record.organizationId, record.id), record);
  }

  async findById(organizationId: UUID, id: UUID): Promise<ClinicalNote | null> {
    return this.store.get(this.key(organizationId, id)) ?? null;
  }

  async listByParent(organizationId: UUID, parentId: UUID): Promise<ClinicalNote[]> {
    const fk = 'recordId';
    return [...this.store.values()].filter(
      (item) => item.organizationId === organizationId && (item as unknown as Record<string, UUID>)[fk] === parentId,
    );
  }
}
