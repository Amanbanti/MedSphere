import { IsObject, IsOptional, IsString, IsNumber } from 'class-validator';

export class IndexSearchDocumentRequestDto {
  documentType: string;
  resourceId: string;
  title: string;
  content: string;
  metadata?: Record<string, unknown>;
}

export class ReindexSearchCorpusRequestDto {
  documentType: string;
  resourceId: string;
  title: string;
  content: string;
  metadata?: Record<string, unknown>;
}

export class DeleteSearchDocumentRequestDto {
  documentType: string;
  resourceId: string;
  title: string;
  content: string;
  metadata?: Record<string, unknown>;
}
