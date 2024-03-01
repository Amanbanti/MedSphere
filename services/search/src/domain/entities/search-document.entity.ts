import type { ISODateString, UUID } from '@medsphere/shared';
import { ConflictError, InvalidStateError } from '../errors/search.errors';

export interface SearchDocumentProps {
  id: UUID;
  organizationId: UUID;
  documentType: string;
  resourceId: string;
  title: string;
  content: string;
  indexedAt: ISODateString;
  tags: string[];
  createdAt: ISODateString;
  updatedAt: ISODateString;
  deletedAt: ISODateString | null;
  version: number;
}

export class SearchDocument {
  private readonly props: SearchDocumentProps;

  private constructor(props: SearchDocumentProps) {
    this.props = { ...props };
  }

  static create(props: SearchDocumentProps): SearchDocument {
    return new SearchDocument(props);
  }

  static register(input: {
    id: UUID;
    organizationId: UUID;
    now: ISODateString;
    documentType: string;
    resourceId: string;
    title: string;
    content: string;
    indexedAt: ISODateString;
    tags: string[];
  }): SearchDocument {
    return new SearchDocument({
      id: input.id,
      organizationId: input.organizationId,
      documentType: input.documentType,
      resourceId: input.resourceId,
      title: input.title,
      content: input.content,
      indexedAt: input.indexedAt,
      tags: input.tags ?? [],
      createdAt: input.now,
      updatedAt: input.now,
      deletedAt: null,
      version: 1,
    });
  }

  get documentType(): string {
    return this.props.documentType;
  }

  get resourceId(): string {
    return this.props.resourceId;
  }

  get title(): string {
    return this.props.title;
  }

  get content(): string {
    return this.props.content;
  }

  get indexedAt(): ISODateString {
    return this.props.indexedAt;
  }

  get tags(): string[] {
    return this.props.tags;
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
      throw new InvalidStateError('SearchDocument has been deleted');
    }
  }

  touch(now: ISODateString): void {
    this.props.updatedAt = now;
    this.props.version += 1;
  }

  softDelete(now: ISODateString): void {
    if (this.isDeleted()) {
      throw new ConflictError('SearchDocument is already deleted');
    }
    this.props.deletedAt = now;
    this.touch(now);
  }

  toProps(): SearchDocumentProps {
    return { ...this.props };
  }
}
