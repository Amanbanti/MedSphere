import { createRng, pick, escapeYaml } from './bulk-seed.mjs';
import { writeFile } from './expansion-utils.mjs';

const OPENAPI_SERVICES = [
  { file: 'auth', title: 'MedSphere Auth API', tag: 'Authentication', basePath: '/auth/v1' },
  { file: 'patient', title: 'MedSphere Patient API', tag: 'Patients', basePath: '/patients/v1' },
  { file: 'appointment', title: 'MedSphere Appointment API', tag: 'Appointments', basePath: '/appointments/v1' },
  { file: 'emr', title: 'MedSphere EMR API', tag: 'Clinical Records', basePath: '/emr/v1' },
  { file: 'laboratory', title: 'MedSphere Laboratory API', tag: 'Laboratory', basePath: '/laboratory/v1' },
  { file: 'radiology', title: 'MedSphere Radiology API', tag: 'Radiology', basePath: '/radiology/v1' },
  { file: 'pharmacy', title: 'MedSphere Pharmacy API', tag: 'Pharmacy', basePath: '/pharmacy/v1' },
  { file: 'billing', title: 'MedSphere Billing API', tag: 'Billing', basePath: '/billing/v1' },
  { file: 'insurance', title: 'MedSphere Insurance API', tag: 'Insurance', basePath: '/insurance/v1' },
  { file: 'telemedicine', title: 'MedSphere Telemedicine API', tag: 'Telemedicine', basePath: '/telemedicine/v1' },
  { file: 'notification', title: 'MedSphere Notification API', tag: 'Notifications', basePath: '/notifications/v1' },
  { file: 'analytics', title: 'MedSphere Analytics API', tag: 'Analytics', basePath: '/analytics/v1' },
  { file: 'search', title: 'MedSphere Search API', tag: 'Search', basePath: '/search/v1' },
];

const RESOURCE_TYPES = [
  'patients', 'encounters', 'orders', 'results', 'prescriptions', 'claims', 'invoices',
  'appointments', 'providers', 'facilities', 'documents', 'allergies', 'medications',
  'vitals', 'problems', 'procedures', 'immunizations', 'care-plans', 'consents',
];

const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete'];

function generateSchema(name, rng, depth = 0) {
  if (depth > 2) {
    return `    ${name}:
      type: object
      additionalProperties: true`;
  }
  const fields = [
    'id', 'organizationId', 'facilityId', 'patientId', 'status', 'code', 'displayName',
    'description', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy', 'version', 'metadata',
  ];
  const lines = [`    ${name}:`, '      type: object', '      required:', '        - id', '        - organizationId', '      properties:'];
  for (const f of fields) {
    if (f === 'id' || f.endsWith('Id')) {
      lines.push(`        ${f}:`);
      lines.push('          type: string');
      lines.push('          format: uuid');
      lines.push(`          example: "550e8400-e29b-41d4-a716-446655440000"`);
    } else if (f === 'status') {
      lines.push(`        ${f}:`);
      lines.push('          type: string');
      lines.push(`          enum: [draft, active, completed, cancelled, entered_in_error]`);
    } else if (f.endsWith('At')) {
      lines.push(`        ${f}:`);
      lines.push('          type: string');
      lines.push('          format: date-time');
    } else if (f === 'metadata') {
      lines.push(`        ${f}:`);
      lines.push('          type: object');
      lines.push('          additionalProperties: true');
    } else {
      lines.push(`        ${f}:`);
      lines.push('          type: string');
      lines.push(`          example: "${escapeYaml(f)} value"`);
    }
  }
  if (depth < 2) {
    lines.push(`        nested:`);
    lines.push(`          $ref: '#/components/schemas/${name}Nested'`);
  }
  return lines.join('\n');
}

function generatePaths(service, rng) {
  const paths = [];
  const resources = pickN(rng, RESOURCE_TYPES, 12);
  for (const resource of resources) {
    const base = `${service.basePath}/${resource}`;
    paths.push(`  ${base}:`);
    paths.push('    get:');
    paths.push(`      operationId: list${resource.replace(/-/g, '')}`);
    paths.push(`      tags: [${service.tag}]`);
    paths.push(`      summary: List ${resource}`);
    paths.push('      parameters:');
    paths.push('        - $ref: "#/components/parameters/PageParam"');
    paths.push('        - $ref: "#/components/parameters/PageSizeParam"');
    paths.push('        - $ref: "#/components/parameters/OrganizationIdHeader"');
    paths.push('        - name: status');
    paths.push('          in: query');
    paths.push('          schema:');
    paths.push('            type: string');
    paths.push('      responses:');
    paths.push("        '200':");
    paths.push('          description: Paginated list');
    paths.push('          content:');
    paths.push('            application/json:');
    paths.push('              schema:');
    paths.push(`                $ref: '#/components/schemas/${pascal(resource)}ListResponse'`);
    paths.push("        '401':");
    paths.push('          $ref: "#/components/responses/Unauthorized"');
    paths.push('    post:');
    paths.push(`      operationId: create${pascal(resource.replace(/-/g, ''))}`);
    paths.push(`      tags: [${service.tag}]`);
    paths.push(`      summary: Create ${resource.slice(0, -1) || resource}`);
    paths.push('      requestBody:');
    paths.push('        required: true');
    paths.push('        content:');
    paths.push('          application/json:');
    paths.push('              schema:');
    paths.push(`                $ref: '#/components/schemas/${pascal(resource)}CreateRequest'`);
    paths.push('      responses:');
    paths.push("        '201':");
    paths.push('          description: Created');
    paths.push('          content:');
    paths.push('            application/json:');
    paths.push('              schema:');
    paths.push(`                $ref: '#/components/schemas/${pascal(resource)}Response'`);
    paths.push(`  ${base}/{id}:`);
    paths.push('    get:');
    paths.push(`      operationId: get${pascal(resource.replace(/-/g, ''))}ById`);
    paths.push(`      tags: [${service.tag}]`);
    paths.push('      parameters:');
    paths.push('        - $ref: "#/components/parameters/ResourceIdParam"');
    paths.push('      responses:');
    paths.push("        '200':");
    paths.push('          description: Resource detail');
    paths.push('          content:');
    paths.push('            application/json:');
    paths.push('              schema:');
    paths.push(`                $ref: '#/components/schemas/${pascal(resource)}Response'`);
    paths.push('    patch:');
    paths.push(`      operationId: update${pascal(resource.replace(/-/g, ''))}`);
    paths.push(`      tags: [${service.tag}]`);
    paths.push('      parameters:');
    paths.push('        - $ref: "#/components/parameters/ResourceIdParam"');
    paths.push('      requestBody:');
    paths.push('        content:');
    paths.push('          application/json:');
    paths.push('              schema:');
    paths.push(`                $ref: '#/components/schemas/${pascal(resource)}UpdateRequest'`);
    paths.push('      responses:');
    paths.push("        '200':");
    paths.push('          description: Updated');
    paths.push('    delete:');
    paths.push(`      operationId: delete${pascal(resource.replace(/-/g, ''))}`);
    paths.push(`      tags: [${service.tag}]`);
    paths.push('      parameters:');
    paths.push('        - $ref: "#/components/parameters/ResourceIdParam"');
    paths.push('      responses:');
    paths.push("        '204':");
    paths.push('          description: Deleted');
  }
  return paths.join('\n');
}

function pascal(str) {
  return str.split(/[-_]/).map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join('');
}

function pickN(rng, arr, n) {
  const copy = [...arr];
  const out = [];
  for (let i = 0; i < n && copy.length; i++) {
    const idx = Math.floor(rng() * copy.length);
    out.push(copy.splice(idx, 1)[0]);
  }
  return out;
}

function generateServiceOpenApi(service) {
  const rng = createRng(service.file.length * 7919);
  const schemas = [];
  for (const resource of RESOURCE_TYPES) {
    const base = pascal(resource);
    schemas.push(generateSchema(`${base}Response`, rng, 0));
    schemas.push(generateSchema(`${base}CreateRequest`, rng, 1));
    schemas.push(generateSchema(`${base}UpdateRequest`, rng, 1));
    schemas.push(generateSchema(`${base}ListResponse`, rng, 1));
    schemas.push(`    ${base}ListResponse:
      type: object
      properties:
        data:
          type: array
          items:
            $ref: '#/components/schemas/${base}Response'
        meta:
          $ref: '#/components/schemas/PaginationMeta'`);
    schemas.push(`    ${base}ResponseNested:
      type: object
      properties:
        detail:
          type: string`);
  }

  return `openapi: 3.1.0
info:
  title: ${service.title}
  version: 1.0.0
  description: |
    MedSphere enterprise healthcare API specification (synthetic development artifact).
    Covers ${service.tag.toLowerCase()} domain operations with RBAC, audit, and multi-tenant scoping.
  contact:
    name: MedSphere Platform Engineering
    email: api@medsphere.internal
  license:
    name: Proprietary
servers:
  - url: https://api.medsphere.internal${service.basePath}
    description: Production
  - url: https://api.staging.medsphere.internal${service.basePath}
    description: Staging
  - url: http://localhost:8080${service.basePath}
    description: Local gateway
tags:
  - name: ${service.tag}
    description: ${service.title} operations
paths:
${generatePaths(service, rng)}
components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
    mTLS:
      type: mutualTLS
  parameters:
    PageParam:
      name: page
      in: query
      schema:
        type: integer
        minimum: 1
        default: 1
    PageSizeParam:
      name: pageSize
      in: query
      schema:
        type: integer
        minimum: 1
        maximum: 100
        default: 25
    OrganizationIdHeader:
      name: X-Organization-Id
      in: header
      required: true
      schema:
        type: string
        format: uuid
    ResourceIdParam:
      name: id
      in: path
      required: true
      schema:
        type: string
        format: uuid
  responses:
    Unauthorized:
      description: Missing or invalid credentials
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    Forbidden:
      description: Insufficient permissions
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    NotFound:
      description: Resource not found
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ErrorResponse'
    ValidationError:
      description: Request validation failed
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ValidationErrorResponse'
  schemas:
    PaginationMeta:
      type: object
      properties:
        page:
          type: integer
        pageSize:
          type: integer
        totalItems:
          type: integer
        totalPages:
          type: integer
        hasNext:
          type: boolean
        hasPrevious:
          type: boolean
    ErrorResponse:
      type: object
      required: [code, message]
      properties:
        code:
          type: string
        message:
          type: string
        traceId:
          type: string
          format: uuid
    ValidationErrorResponse:
      allOf:
        - $ref: '#/components/schemas/ErrorResponse'
        - type: object
          properties:
            fieldErrors:
              type: array
              items:
                type: object
                properties:
                  field:
                    type: string
                  message:
                    type: string
${schemas.join('\n')}
security:
  - bearerAuth: []
`;
}

function generateRootOpenApi() {
  const refs = OPENAPI_SERVICES.map((s) => `  /${s.file}:
    $ref: './${s.file}.openapi.yaml'`).join('\n');
  return `openapi: 3.1.0
info:
  title: MedSphere Platform API
  version: 1.0.0
  description: |
    Root OpenAPI composition for MedSphere hospital information system APIs.
    Individual domain specifications are split by bounded context.
  contact:
    name: MedSphere Platform Engineering
servers:
  - url: https://api.medsphere.internal
    description: Production API gateway
tags:
${OPENAPI_SERVICES.map((s) => `  - name: ${s.tag}\n    description: ${s.title}`).join('\n')}
paths:
${OPENAPI_SERVICES.flatMap((s) => [
    `  ${s.basePath}/health:`,
    '    get:',
    `      operationId: ${s.file}HealthCheck`,
    `      tags: [${s.tag}]`,
    '      summary: Health check',
    '      responses:',
    "        '200':",
    '          description: Service healthy',
    '          content:',
    '            application/json:',
    '              schema:',
    '                type: object',
    '                properties:',
    '                  status:',
    '                    type: string',
    '                    example: ok',
  ].join('\n')).join('\n')}
components:
  schemas:
    HealthStatus:
      type: object
      properties:
        status:
          type: string
        version:
          type: string
        timestamp:
          type: string
          format: date-time
`;
}

export async function generateOpenApiSpecs(root, stats) {
  await writeFile(root, 'docs/api/openapi/openapi.root.yaml', generateRootOpenApi(), stats);
  for (const service of OPENAPI_SERVICES) {
    await writeFile(root, `docs/api/openapi/${service.file}.openapi.yaml`, generateServiceOpenApi(service), stats);
  }
}
