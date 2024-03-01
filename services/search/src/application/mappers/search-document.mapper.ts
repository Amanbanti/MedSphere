import type { SearchDocument } from '../../domain/entities/search-document.entity';

export interface SearchDocumentDto {
  id: string;
  organizationId: string;
  documentType: string;
  resourceId: string;
  title: string;
  content: string;
  indexedAt: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  version: number;
}

export class SearchDocumentMapper {
  static toDto(entity: SearchDocument): SearchDocumentDto {
    return {
      id: entity.id,
      organizationId: entity.organizationId,
      documentType: entity.documentType,
      resourceId: entity.resourceId,
      title: entity.title,
      content: entity.content,
      indexedAt: entity.indexedAt,
      tags: entity.tags,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      version: entity.version,
    };
  }
}
