import type { UUID } from '@medsphere/shared';
import { SearchDocumentFactory, type SearchDocumentFactoryInput } from '../factories/search-document.factory';
import { SearchDocument } from '../entities/search-document.entity';

export class SearchDocumentBuilder {
  private readonly input: Partial<SearchDocumentFactoryInput> = {};

  static create(): SearchDocumentBuilder {
    return new SearchDocumentBuilder();
  }

  withOrganization(organizationId: UUID): this {
    this.input.organizationId = organizationId;
    return this;
  }

  withDocumentType(documentType: string): this {
    this.input.documentType = documentType;
    return this;
  }

  withResourceId(resourceId: string): this {
    this.input.resourceId = resourceId;
    return this;
  }

  withTitle(title: string): this {
    this.input.title = title;
    return this;
  }

  withContent(content: string): this {
    this.input.content = content;
    return this;
  }

  withIndexedAt(indexedAt: string): this {
    this.input.indexedAt = indexedAt;
    return this;
  }

  withTags(tags: string[]): this {
    this.input.tags = tags;
    return this;
  }

  withId(id: UUID): this {
    this.input.id = id;
    return this;
  }

  build(): SearchDocument {
    if (!this.input.organizationId) {
      throw new Error('organizationId is required');
    }
    return SearchDocumentFactory.create(this.input as SearchDocumentFactoryInput);
  }
}
