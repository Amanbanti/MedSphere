import { v4 as uuidv4 } from 'uuid';
import { nowIso, type UUID } from '@medsphere/shared';
import { SearchDocument } from '../entities/search-document.entity';

export interface SearchDocumentFactoryInput {
  organizationId: UUID;
  documentType: string;
  resourceId: string;
  title: string;
  content: string;
  indexedAt: string;
  tags: string[];
  id?: UUID;
  now?: string;
}

export class SearchDocumentFactory {
  static create(input: SearchDocumentFactoryInput): SearchDocument {
    const now = input.now ?? nowIso();
    const id = input.id ?? (uuidv4() as UUID);
    return SearchDocument.register({
      id,
      organizationId: input.organizationId,
      now,
      documentType: input.documentType,
      resourceId: input.resourceId,
      title: input.title,
      content: input.content,
      indexedAt: input.indexedAt,
      tags: input.tags,
    } as Parameters<typeof SearchDocument.register>[0]);
  }

  static reconstitute(props: Parameters<typeof SearchDocument.reconstitute>[0]): SearchDocument {
    return SearchDocument.reconstitute(props);
  }

  static clone(source: SearchDocument, overrides: Partial<SearchDocumentFactoryInput> = {}): SearchDocument {
    const snapshot = source.toSnapshot();
    return SearchDocumentFactory.create({
      organizationId: snapshot.organizationId as UUID,
      documentType: (overrides.documentType ?? snapshot.documentType) as string,
      resourceId: (overrides.resourceId ?? snapshot.resourceId) as string,
      title: (overrides.title ?? snapshot.title) as string,
      content: (overrides.content ?? snapshot.content) as string,
      indexedAt: (overrides.indexedAt ?? snapshot.indexedAt) as string,
      tags: (overrides.tags ?? snapshot.tags) as string[],
      id: overrides.id,
      now: overrides.now,
    });
  }
}
