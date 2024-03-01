import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CorrelationId, CurrentUser } from '@medsphere/auth-sdk';
import { successBody, type JwtAccessPayload, type ListQuery, type UUID } from '@medsphere/shared';
import { IndexSearchDocumentUseCase } from '../../application/use-cases/index-search-document.use-case';
import { SearchDocumentsUseCase } from '../../application/use-cases/search-documents.use-case';
import { ReindexSearchCorpusUseCase } from '../../application/use-cases/reindex-search-corpus.use-case';
import { DeleteSearchDocumentUseCase } from '../../application/use-cases/delete-search-document.use-case';

@Controller('search-documents')
export class SearchDocumentController {
  constructor(
    private readonly indexSearchDocumentUseCase: IndexSearchDocumentUseCase,
    private readonly searchDocumentsUseCase: SearchDocumentsUseCase,
    private readonly reindexSearchCorpusUseCase: ReindexSearchCorpusUseCase,
    private readonly deleteSearchDocumentUseCase: DeleteSearchDocumentUseCase,
  ) {}

  @Post('/index')
  async indexSearchDocument(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    
    @Body() body: Record<string, unknown>,
    
  ) {
    const result = await this.indexSearchDocumentUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }

  @Get('')
  async searchDocuments(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    
    
    @Query() query: Record<string, unknown>,
  ) {
    const result = await this.searchDocumentsUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }

  @Post('/reindex')
  async reindexSearchCorpus(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    
    @Body() body: Record<string, unknown>,
    
  ) {
    const result = await this.reindexSearchCorpusUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      
      
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }

  @Delete('/:id')
  async deleteSearchDocument(
    @CurrentUser() user: JwtAccessPayload,
    @CorrelationId() correlationId: string,
    @Param('id') id: string,
    @Body() body: Record<string, unknown>,
    
  ) {
    const result = await this.deleteSearchDocumentUseCase.execute({
      organizationId: user.orgId as UUID,
      actorId: user.sub as UUID,
      correlationId,
      id: id as UUID,
      
      
      
      
      payload: body,
      query: query as ListQuery,
    });
    return successBody(result, correlationId);
  }
}
