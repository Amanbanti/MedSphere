import { writeFile } from './expansion-utils.mjs';

const K8S_SERVICES = [
  'api-gateway', 'auth', 'patient', 'doctor', 'appointment', 'medical-record',
  'prescription', 'laboratory', 'radiology', 'imaging', 'pharmacy', 'billing',
  'insurance', 'payment', 'notification', 'video-consultation', 'analytics',
  'search', 'audit', 'queue', 'worker',
];

function k8sDeployment(name, port) {
  return `apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${name}
  labels:
    app.kubernetes.io/name: ${name}
    app.kubernetes.io/part-of: medsphere
    app.kubernetes.io/component: microservice
spec:
  replicas: 2
  selector:
    matchLabels:
      app.kubernetes.io/name: ${name}
  template:
    metadata:
      labels:
        app.kubernetes.io/name: ${name}
        app.kubernetes.io/part-of: medsphere
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/port: "${port}"
        prometheus.io/path: "/metrics"
    spec:
      serviceAccountName: medsphere-${name}
      securityContext:
        runAsNonRoot: true
        runAsUser: 10001
        fsGroup: 10001
      containers:
        - name: ${name}
          image: ghcr.io/medsphere/${name}:{{ .Values.image.tag | default "latest" }}
          imagePullPolicy: IfNotPresent
          ports:
            - name: http
              containerPort: ${port}
              protocol: TCP
          envFrom:
            - configMapRef:
                name: ${name}-config
            - secretRef:
                name: ${name}-secrets
          resources:
            requests:
              cpu: 250m
              memory: 512Mi
            limits:
              cpu: "1"
              memory: 1Gi
          livenessProbe:
            httpGet:
              path: /health/live
              port: http
            initialDelaySeconds: 30
            periodSeconds: 15
            timeoutSeconds: 5
            failureThreshold: 3
          readinessProbe:
            httpGet:
              path: /health/ready
              port: http
            initialDelaySeconds: 10
            periodSeconds: 10
            timeoutSeconds: 3
            failureThreshold: 3
          securityContext:
            allowPrivilegeEscalation: false
            readOnlyRootFilesystem: true
            capabilities:
              drop: ["ALL"]
          volumeMounts:
            - name: tmp
              mountPath: /tmp
      volumes:
        - name: tmp
          emptyDir: {}
      topologySpreadConstraints:
        - maxSkew: 1
          topologyKey: topology.kubernetes.io/zone
          whenUnsatisfiable: ScheduleAnyway
          labelSelector:
            matchLabels:
              app.kubernetes.io/name: ${name}
---
apiVersion: v1
kind: Service
metadata:
  name: ${name}
  labels:
    app.kubernetes.io/name: ${name}
    app.kubernetes.io/part-of: medsphere
spec:
  type: ClusterIP
  selector:
    app.kubernetes.io/name: ${name}
  ports:
    - name: http
      port: 80
      targetPort: http
      protocol: TCP
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: ${name}
  labels:
    app.kubernetes.io/name: ${name}
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: ${name}
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
        - type: Percent
          value: 25
          periodSeconds: 60
    scaleUp:
      stabilizationWindowSeconds: 0
      policies:
        - type: Percent
          value: 100
          periodSeconds: 30
---
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: ${name}-ingress
  labels:
    app.kubernetes.io/name: ${name}
spec:
  podSelector:
    matchLabels:
      app.kubernetes.io/name: ${name}
  policyTypes:
    - Ingress
    - Egress
  ingress:
    - from:
        - namespaceSelector:
            matchLabels:
              kubernetes.io/metadata.name: medsphere
        - podSelector:
            matchLabels:
              app.kubernetes.io/name: api-gateway
      ports:
        - protocol: TCP
          port: ${port}
  egress:
    - to:
        - namespaceSelector:
            matchLabels:
              kubernetes.io/metadata.name: medsphere-infra
      ports:
        - protocol: TCP
          port: 5432
        - protocol: TCP
          port: 6379
        - protocol: TCP
          port: 9092
    - to:
        - namespaceSelector: {}
      ports:
        - protocol: TCP
          port: 443
        - protocol: UDP
          port: 53
        - protocol: TCP
          port: 53
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: ${name}-config
  labels:
    app.kubernetes.io/name: ${name}
data:
  NODE_ENV: production
  LOG_LEVEL: info
  SERVICE_NAME: ${name}
  HTTP_PORT: "${port}"
  METRICS_ENABLED: "true"
  TRACING_ENABLED: "true"
  KAFKA_CLIENT_ID: medsphere-${name}
  KAFKA_GROUP_ID: medsphere-${name}-consumers
  OTEL_SERVICE_NAME: ${name}
`;
}

function grafanaDashboard(name, panels) {
  return JSON.stringify(
    {
      annotations: { list: [] },
      editable: true,
      fiscalYearStartMonth: 0,
      graphTooltip: 1,
      id: null,
      links: [],
      liveNow: false,
      panels,
      refresh: '30s',
      schemaVersion: 39,
      tags: ['medsphere', name],
      templating: { list: [] },
      time: { from: 'now-6h', to: 'now' },
      timepicker: {},
      timezone: 'browser',
      title: `MedSphere — ${name}`,
      uid: `medsphere-${name.toLowerCase().replace(/\s+/g, '-')}`,
      version: 1,
    },
    null,
    2,
  );
}

function buildDashboardPanels(serviceName, metrics) {
  return metrics.map((metric, idx) => ({
    id: idx + 1,
    type: metric.type ?? 'timeseries',
    title: metric.title,
    gridPos: { h: 8, w: 12, x: (idx % 2) * 12, y: Math.floor(idx / 2) * 8 },
    targets: [
      {
        expr: metric.expr,
        legendFormat: metric.legend ?? '{{service}}',
        refId: 'A',
      },
    ],
    fieldConfig: {
      defaults: {
        unit: metric.unit ?? 'short',
        thresholds: {
          mode: 'absolute',
          steps: [
            { color: 'green', value: null },
            { color: 'yellow', value: metric.warn ?? 100 },
            { color: 'red', value: metric.crit ?? 500 },
          ],
        },
      },
    },
  }));
}

function terraformModule(name, resources) {
  return `# MedSphere Terraform module: ${name}
terraform {
  required_version = ">= 1.6.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

${resources.main}

`;
}

function tfVariables(vars) {
  return vars
    .map(
      (v) => `variable "${v.name}" {
  description = "${v.description}"
  type        = ${v.type}
  ${v.default !== undefined ? `default     = ${v.default}` : ''}
}`,
    )
    .join('\n\n');
}

function tfOutputs(outputs) {
  return outputs
    .map(
      (o) => `output "${o.name}" {
  description = "${o.description}"
  value       = ${o.value}
}`,
    )
    .join('\n\n');
}

export async function generateInfrastructure(root, stats) {
  const portBase = 3000;
  for (let i = 0; i < K8S_SERVICES.length; i++) {
    const name = K8S_SERVICES[i];
    const port = portBase + i;
    await writeFile(root, `infrastructure/kubernetes/base/${name}.yaml`, k8sDeployment(name, port), stats);
  }

  await writeFile(
    root,
    'infrastructure/kubernetes/base/kustomization.yaml',
    `apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
namespace: medsphere
resources:
${K8S_SERVICES.map((s) => `  - ${s}.yaml`).join('\n')}
commonLabels:
  app.kubernetes.io/managed-by: kustomize
  app.kubernetes.io/part-of: medsphere
`,
    stats,
  );

  await writeFile(
    root,
    'infrastructure/helm/charts/medsphere/Chart.yaml',
    `apiVersion: v2
name: medsphere
description: MedSphere enterprise HIS platform Helm chart
type: application
version: 1.0.0
appVersion: "1.0.0"
keywords:
  - healthcare
  - emr
  - ehr
  - hipaa
maintainers:
  - name: MedSphere Platform Team
    email: platform@medsphere.health
dependencies:
  - name: postgresql
    version: "15.x.x"
    repository: https://charts.bitnami.com/bitnami
    condition: postgresql.enabled
  - name: redis
    version: "19.x.x"
    repository: https://charts.bitnami.com/bitnami
    condition: redis.enabled
  - name: kafka
    version: "29.x.x"
    repository: https://charts.bitnami.com/bitnami
    condition: kafka.enabled
`,
    stats,
  );

  await writeFile(
    root,
    'infrastructure/helm/charts/medsphere/values.yaml',
    `global:
  imageRegistry: ghcr.io/medsphere
  imageTag: "1.0.0"
  environment: production
  domain: medsphere.health

postgresql:
  enabled: true
  auth:
    database: medsphere
    username: medsphere
  primary:
    persistence:
      size: 100Gi

redis:
  enabled: true
  architecture: replication
  auth:
    enabled: true

kafka:
  enabled: true
  replicaCount: 3
  persistence:
    size: 50Gi

ingress:
  enabled: true
  className: nginx
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/proxy-body-size: "50m"
  hosts:
    - host: api.medsphere.health
      paths:
        - path: /
          pathType: Prefix
          service: api-gateway
    - host: admin.medsphere.health
      paths:
        - path: /
          pathType: Prefix
          service: admin-portal

services:
${K8S_SERVICES.map((s) => `  ${s}:
    enabled: true
    replicaCount: 2
    resources:
      requests:
        cpu: 250m
        memory: 512Mi
      limits:
        cpu: "1"
        memory: 1Gi`).join('\n')}

monitoring:
  prometheus:
    enabled: true
  grafana:
    enabled: true
  alertmanager:
    enabled: true

networkPolicies:
  enabled: true

podDisruptionBudget:
  enabled: true
  minAvailable: 1
`,
    stats,
  );

  const helmTemplates = [
    {
      file: 'templates/deployment.yaml',
      content: `{{- range $name, $svc := .Values.services }}
{{- if $svc.enabled }}
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ $name }}
  labels:
    app.kubernetes.io/name: {{ $name }}
    helm.sh/chart: {{ include "medsphere.chart" . }}
spec:
  replicas: {{ $svc.replicaCount | default 2 }}
  selector:
    matchLabels:
      app.kubernetes.io/name: {{ $name }}
  template:
    metadata:
      labels:
        app.kubernetes.io/name: {{ $name }}
    spec:
      containers:
        - name: {{ $name }}
          image: "{{ $.Values.global.imageRegistry }}/{{ $name }}:{{ $.Values.global.imageTag }}"
          ports:
            - containerPort: 8080
          resources:
            {{- toYaml $svc.resources | nindent 12 }}
---
{{- end }}
{{- end }}
`,
    },
    {
      file: 'templates/service.yaml',
      content: `{{- range $name, $svc := .Values.services }}
{{- if $svc.enabled }}
apiVersion: v1
kind: Service
metadata:
  name: {{ $name }}
spec:
  selector:
    app.kubernetes.io/name: {{ $name }}
  ports:
    - port: 80
      targetPort: 8080
---
{{- end }}
{{- end }}
`,
    },
    {
      file: 'templates/ingress.yaml',
      content: `{{- if .Values.ingress.enabled }}
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: medsphere-ingress
  annotations:
    {{- toYaml .Values.ingress.annotations | nindent 4 }}
spec:
  ingressClassName: {{ .Values.ingress.className }}
  tls:
    - hosts:
        {{- range .Values.ingress.hosts }}
        - {{ .host }}
        {{- end }}
      secretName: medsphere-tls
  rules:
    {{- range .Values.ingress.hosts }}
    - host: {{ .host }}
      http:
        paths:
          {{- range .paths }}
          - path: {{ .path }}
            pathType: {{ .pathType }}
            backend:
              service:
                name: {{ .service }}
                port:
                  number: 80
          {{- end }}
    {{- end }}
{{- end }}
`,
    },
    {
      file: 'templates/configmap.yaml',
      content: `apiVersion: v1
kind: ConfigMap
metadata:
  name: medsphere-global-config
data:
  NODE_ENV: {{ .Values.global.environment | quote }}
  LOG_FORMAT: json
  CORS_ORIGINS: "https://{{ .Values.global.domain }}"
  FEATURE_FLAGS_ENABLED: "true"
`,
    },
    {
      file: 'templates/_helpers.tpl',
      content: `{{- define "medsphere.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}
`,
    },
  ];

  for (const tpl of helmTemplates) {
    await writeFile(root, `infrastructure/helm/charts/medsphere/${tpl.file}`, tpl.content, stats);
  }

  const tfModules = {
    network: {
      main: `resource "aws_vpc" "medsphere" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true
  tags = merge(var.tags, { Name = "\${var.project_name}-vpc" })
}

resource "aws_subnet" "private" {
  count             = length(var.private_subnet_cidrs)
  vpc_id            = aws_vpc.medsphere.id
  cidr_block        = var.private_subnet_cidrs[count.index]
  availability_zone = var.availability_zones[count.index]
  tags = merge(var.tags, {
    Name = "\${var.project_name}-private-\${count.index + 1}"
    Tier = "private"
  })
}

resource "aws_subnet" "public" {
  count                   = length(var.public_subnet_cidrs)
  vpc_id                  = aws_vpc.medsphere.id
  cidr_block              = var.public_subnet_cidrs[count.index]
  availability_zone       = var.availability_zones[count.index]
  map_public_ip_on_launch = true
  tags = merge(var.tags, {
    Name = "\${var.project_name}-public-\${count.index + 1}"
    Tier = "public"
  })
}

resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.medsphere.id
  tags   = merge(var.tags, { Name = "\${var.project_name}-igw" })
}

resource "aws_nat_gateway" "nat" {
  count         = var.enable_nat_gateway ? 1 : 0
  allocation_id = aws_eip.nat[0].id
  subnet_id     = aws_subnet.public[0].id
  tags          = merge(var.tags, { Name = "\${var.project_name}-nat" })
}

resource "aws_eip" "nat" {
  count  = var.enable_nat_gateway ? 1 : 0
  domain = "vpc"
  tags   = var.tags
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.medsphere.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gw.id
  }
  tags = merge(var.tags, { Name = "\${var.project_name}-public-rt" })
}

resource "aws_security_group" "eks_nodes" {
  name_prefix = "\${var.project_name}-eks-nodes-"
  vpc_id      = aws_vpc.medsphere.id
  description = "EKS worker node security group"

  ingress {
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = [var.vpc_cidr]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = var.tags
}
`,
      variables: [
        { name: 'project_name', description: 'Project name prefix', type: 'string', default: '"medsphere"' },
        { name: 'vpc_cidr', description: 'VPC CIDR block', type: 'string', default: '"10.20.0.0/16"' },
        { name: 'availability_zones', description: 'AZ list', type: 'list(string)' },
        { name: 'private_subnet_cidrs', description: 'Private subnet CIDRs', type: 'list(string)' },
        { name: 'public_subnet_cidrs', description: 'Public subnet CIDRs', type: 'list(string)' },
        { name: 'enable_nat_gateway', description: 'Enable NAT gateway', type: 'bool', default: 'true' },
        { name: 'tags', description: 'Common tags', type: 'map(string)', default: '{}' },
      ],
      outputs: [
        { name: 'vpc_id', description: 'VPC ID', value: 'aws_vpc.medsphere.id' },
        { name: 'private_subnet_ids', description: 'Private subnet IDs', value: 'aws_subnet.private[*].id' },
        { name: 'public_subnet_ids', description: 'Public subnet IDs', value: 'aws_subnet.public[*].id' },
        { name: 'eks_nodes_security_group_id', description: 'EKS nodes SG', value: 'aws_security_group.eks_nodes.id' },
      ],
    },
    database: {
      main: `resource "aws_db_subnet_group" "medsphere" {
  name       = "\${var.project_name}-db-subnet"
  subnet_ids = var.subnet_ids
  tags       = var.tags
}

resource "aws_security_group" "rds" {
  name_prefix = "\${var.project_name}-rds-"
  vpc_id      = var.vpc_id
  description = "RDS PostgreSQL access"

  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = var.allowed_security_group_ids
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = var.tags
}

resource "aws_db_instance" "primary" {
  identifier              = "\${var.project_name}-postgres"
  engine                  = "postgres"
  engine_version          = var.engine_version
  instance_class          = var.instance_class
  allocated_storage       = var.allocated_storage
  max_allocated_storage   = var.max_allocated_storage
  storage_encrypted       = true
  kms_key_id              = var.kms_key_arn
  db_name                 = var.database_name
  username                = var.master_username
  password                = var.master_password
  vpc_security_group_ids  = [aws_security_group.rds.id]
  db_subnet_group_name    = aws_db_subnet_group.medsphere.name
  backup_retention_period = var.backup_retention_days
  deletion_protection     = var.deletion_protection
  multi_az                = var.multi_az
  publicly_accessible     = false
  skip_final_snapshot     = false
  final_snapshot_identifier = "\${var.project_name}-final-snapshot"
  performance_insights_enabled = true
  enabled_cloudwatch_logs_exports = ["postgresql", "upgrade"]
  tags = var.tags
}

resource "aws_db_instance" "read_replica" {
  count                  = var.read_replica_count
  identifier             = "\${var.project_name}-postgres-replica-\${count.index + 1}"
  replicate_source_db    = aws_db_instance.primary.identifier
  instance_class         = var.replica_instance_class
  publicly_accessible    = false
  skip_final_snapshot    = true
  vpc_security_group_ids = [aws_security_group.rds.id]
  tags                   = var.tags
}
`,
      variables: [
        { name: 'project_name', description: 'Project name', type: 'string' },
        { name: 'vpc_id', description: 'VPC ID', type: 'string' },
        { name: 'subnet_ids', description: 'DB subnet IDs', type: 'list(string)' },
        { name: 'allowed_security_group_ids', description: 'Allowed SGs', type: 'list(string)' },
        { name: 'engine_version', description: 'Postgres version', type: 'string', default: '"16.3"' },
        { name: 'instance_class', description: 'Instance class', type: 'string', default: '"db.r6g.large"' },
        { name: 'allocated_storage', description: 'Storage GB', type: 'number', default: '100' },
        { name: 'max_allocated_storage', description: 'Max storage GB', type: 'number', default: '500' },
        { name: 'database_name', description: 'Database name', type: 'string', default: '"medsphere"' },
        { name: 'master_username', description: 'Master user', type: 'string' },
        { name: 'master_password', description: 'Master password', type: 'string', default: 'null' },
        { name: 'kms_key_arn', description: 'KMS key ARN', type: 'string' },
        { name: 'backup_retention_days', description: 'Backup retention', type: 'number', default: '30' },
        { name: 'deletion_protection', description: 'Deletion protection', type: 'bool', default: 'true' },
        { name: 'multi_az', description: 'Multi-AZ', type: 'bool', default: 'true' },
        { name: 'read_replica_count', description: 'Read replica count', type: 'number', default: '1' },
        { name: 'replica_instance_class', description: 'Replica class', type: 'string', default: '"db.r6g.large"' },
        { name: 'tags', description: 'Tags', type: 'map(string)', default: '{}' },
      ],
      outputs: [
        { name: 'primary_endpoint', description: 'Primary endpoint', value: 'aws_db_instance.primary.address' },
        { name: 'primary_port', description: 'Primary port', value: 'aws_db_instance.primary.port' },
        { name: 'replica_endpoints', description: 'Replica endpoints', value: 'aws_db_instance.read_replica[*].address' },
      ],
    },
    kafka: {
      main: `resource "aws_msk_cluster" "medsphere" {
  cluster_name           = "\${var.project_name}-kafka"
  kafka_version          = var.kafka_version
  number_of_broker_nodes = var.broker_count

  broker_node_group_info {
    instance_type   = var.broker_instance_type
    client_subnets  = var.subnet_ids
    security_groups = [aws_security_group.kafka.id]
    storage_info {
      ebs_storage_info {
        volume_size = var.broker_volume_gb
      }
    }
  }

  encryption_info {
    encryption_in_transit {
      client_broker = "TLS"
      in_cluster    = true
    }
    encryption_at_rest_kms_key_arn = var.kms_key_arn
  }

  logging_info {
    broker_logs {
      cloudwatch_logs {
        enabled   = true
        log_group = aws_cloudwatch_log_group.kafka.name
      }
    }
  }

  tags = var.tags
}

resource "aws_security_group" "kafka" {
  name_prefix = "\${var.project_name}-kafka-"
  vpc_id      = var.vpc_id

  ingress {
    from_port       = 9094
    to_port         = 9098
    protocol        = "tcp"
    security_groups = var.allowed_security_group_ids
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = var.tags
}

resource "aws_cloudwatch_log_group" "kafka" {
  name              = "/aws/msk/\${var.project_name}"
  retention_in_days = 30
  tags              = var.tags
}
`,
      variables: [
        { name: 'project_name', description: 'Project name', type: 'string' },
        { name: 'vpc_id', description: 'VPC ID', type: 'string' },
        { name: 'subnet_ids', description: 'Subnet IDs', type: 'list(string)' },
        { name: 'allowed_security_group_ids', description: 'Allowed SGs', type: 'list(string)' },
        { name: 'kafka_version', description: 'Kafka version', type: 'string', default: '"3.6.0"' },
        { name: 'broker_count', description: 'Broker count', type: 'number', default: '3' },
        { name: 'broker_instance_type', description: 'Broker instance', type: 'string', default: '"kafka.m5.large"' },
        { name: 'broker_volume_gb', description: 'Broker volume GB', type: 'number', default: '100' },
        { name: 'kms_key_arn', description: 'KMS key', type: 'string' },
        { name: 'tags', description: 'Tags', type: 'map(string)', default: '{}' },
      ],
      outputs: [
        { name: 'bootstrap_brokers_tls', description: 'TLS bootstrap brokers', value: 'aws_msk_cluster.medsphere.bootstrap_brokers_tls' },
        { name: 'cluster_arn', description: 'Cluster ARN', value: 'aws_msk_cluster.medsphere.arn' },
      ],
    },
    redis: {
      main: `resource "aws_elasticache_subnet_group" "medsphere" {
  name       = "\${var.project_name}-redis-subnet"
  subnet_ids = var.subnet_ids
}

resource "aws_security_group" "redis" {
  name_prefix = "\${var.project_name}-redis-"
  vpc_id      = var.vpc_id

  ingress {
    from_port       = 6379
    to_port         = 6379
    protocol        = "tcp"
    security_groups = var.allowed_security_group_ids
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = var.tags
}

resource "aws_elasticache_replication_group" "medsphere" {
  replication_group_id       = "\${var.project_name}-redis"
  description                = "MedSphere Redis cluster"
  engine                     = "redis"
  engine_version             = var.engine_version
  node_type                  = var.node_type
  num_cache_clusters         = var.num_cache_clusters
  automatic_failover_enabled = var.automatic_failover_enabled
  multi_az_enabled           = var.multi_az_enabled
  at_rest_encryption_enabled = true
  transit_encryption_enabled = true
  subnet_group_name          = aws_elasticache_subnet_group.medsphere.name
  security_group_ids         = [aws_security_group.redis.id]
  snapshot_retention_limit   = var.snapshot_retention_days
  maintenance_window         = var.maintenance_window
  tags                       = var.tags
}
`,
      variables: [
        { name: 'project_name', description: 'Project name', type: 'string' },
        { name: 'vpc_id', description: 'VPC ID', type: 'string' },
        { name: 'subnet_ids', description: 'Subnet IDs', type: 'list(string)' },
        { name: 'allowed_security_group_ids', description: 'Allowed SGs', type: 'list(string)' },
        { name: 'engine_version', description: 'Redis version', type: 'string', default: '"7.1"' },
        { name: 'node_type', description: 'Node type', type: 'string', default: '"cache.r6g.large"' },
        { name: 'num_cache_clusters', description: 'Cluster count', type: 'number', default: '2' },
        { name: 'automatic_failover_enabled', description: 'Auto failover', type: 'bool', default: 'true' },
        { name: 'multi_az_enabled', description: 'Multi-AZ', type: 'bool', default: 'true' },
        { name: 'snapshot_retention_days', description: 'Snapshot retention', type: 'number', default: '7' },
        { name: 'maintenance_window', description: 'Maintenance window', type: 'string', default: '"sun:05:00-sun:06:00"' },
        { name: 'tags', description: 'Tags', type: 'map(string)', default: '{}' },
      ],
      outputs: [
        { name: 'primary_endpoint', description: 'Primary endpoint', value: 'aws_elasticache_replication_group.medsphere.primary_endpoint_address' },
        { name: 'reader_endpoint', description: 'Reader endpoint', value: 'aws_elasticache_replication_group.medsphere.reader_endpoint_address' },
      ],
    },
    minio: {
      main: `resource "kubernetes_namespace" "minio" {
  metadata {
    name = var.namespace
    labels = {
      "app.kubernetes.io/part-of" = "medsphere"
    }
  }
}

resource "helm_release" "minio" {
  name       = "minio"
  repository = "https://charts.min.io/"
  chart      = "minio"
  namespace  = kubernetes_namespace.minio.metadata[0].name
  version    = var.chart_version

  values = [
    yamlencode({
      mode          = "distributed"
      replicas      = var.replicas
      persistence   = { size = var.storage_size }
      resources     = var.resources
      ingress       = { enabled = var.ingress_enabled, hosts = [var.ingress_host] }
      metrics       = { serviceMonitor = { enabled = true } }
      policies      = var.bucket_policies
      environment   = { MINIO_BROWSER = "off" }
      tls           = { enabled = true }
    })
  ]
}
`,
      variables: [
        { name: 'namespace', description: 'K8s namespace', type: 'string', default: '"medsphere-storage"' },
        { name: 'chart_version', description: 'Helm chart version', type: 'string', default: '"5.2.0"' },
        { name: 'replicas', description: 'Replica count', type: 'number', default: '4' },
        { name: 'storage_size', description: 'PVC size', type: 'string', default: '"500Gi"' },
        { name: 'resources', description: 'Resource limits', type: 'any', default: '{}' },
        { name: 'ingress_enabled', description: 'Enable ingress', type: 'bool', default: 'false' },
        { name: 'ingress_host', description: 'Ingress host', type: 'string', default: '"storage.medsphere.health"' },
        { name: 'bucket_policies', description: 'Bucket policies', type: 'list(any)', default: '[]' },
      ],
      outputs: [
        { name: 'namespace', description: 'MinIO namespace', value: 'kubernetes_namespace.minio.metadata[0].name' },
        { name: 'release_name', description: 'Helm release name', value: 'helm_release.minio.name' },
      ],
    },
    eks: {
      main: `resource "aws_eks_cluster" "medsphere" {
  name     = "\${var.project_name}-eks"
  role_arn = aws_iam_role.cluster.arn
  version  = var.cluster_version

  vpc_config {
    subnet_ids              = var.subnet_ids
    endpoint_private_access = true
    endpoint_public_access  = var.public_endpoint_enabled
    public_access_cidrs     = var.public_access_cidrs
    security_group_ids      = [aws_security_group.cluster.id]
  }

  encryption_config {
    provider {
      key_arn = var.kms_key_arn
    }
    resources = ["secrets"]
  }

  enabled_cluster_log_types = ["api", "audit", "authenticator", "controllerManager", "scheduler"]

  tags = var.tags

  depends_on = [
    aws_iam_role_policy_attachment.cluster_AmazonEKSClusterPolicy,
  ]
}

resource "aws_iam_role" "cluster" {
  name = "\${var.project_name}-eks-cluster-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = { Service = "eks.amazonaws.com" }
    }]
  })
  tags = var.tags
}

resource "aws_iam_role_policy_attachment" "cluster_AmazonEKSClusterPolicy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
  role       = aws_iam_role.cluster.name
}

resource "aws_eks_node_group" "general" {
  cluster_name    = aws_eks_cluster.medsphere.name
  node_group_name = "\${var.project_name}-general"
  node_role_arn   = aws_iam_role.node.arn
  subnet_ids      = var.private_subnet_ids
  instance_types  = var.node_instance_types
  capacity_type   = var.capacity_type

  scaling_config {
    desired_size = var.desired_node_count
    max_size     = var.max_node_count
    min_size     = var.min_node_count
  }

  update_config {
    max_unavailable = 1
  }

  tags = var.tags

  depends_on = [
    aws_iam_role_policy_attachment.node_AmazonEKSWorkerNodePolicy,
    aws_iam_role_policy_attachment.node_AmazonEKS_CNI_Policy,
    aws_iam_role_policy_attachment.node_AmazonEC2ContainerRegistryReadOnly,
  ]
}

resource "aws_iam_role" "node" {
  name = "\${var.project_name}-eks-node-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = { Service = "ec2.amazonaws.com" }
    }]
  })
  tags = var.tags
}

resource "aws_iam_role_policy_attachment" "node_AmazonEKSWorkerNodePolicy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
  role       = aws_iam_role.node.name
}

resource "aws_iam_role_policy_attachment" "node_AmazonEKS_CNI_Policy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
  role       = aws_iam_role.node.name
}

resource "aws_iam_role_policy_attachment" "node_AmazonEC2ContainerRegistryReadOnly" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
  role       = aws_iam_role.node.name
}

resource "aws_security_group" "cluster" {
  name_prefix = "\${var.project_name}-eks-cluster-"
  vpc_id      = var.vpc_id
  description = "EKS cluster security group"
  tags        = var.tags
}
`,
      variables: [
        { name: 'project_name', description: 'Project name', type: 'string' },
        { name: 'vpc_id', description: 'VPC ID', type: 'string' },
        { name: 'subnet_ids', description: 'Cluster subnet IDs', type: 'list(string)' },
        { name: 'private_subnet_ids', description: 'Node subnet IDs', type: 'list(string)' },
        { name: 'kms_key_arn', description: 'KMS key ARN', type: 'string' },
        { name: 'cluster_version', description: 'EKS version', type: 'string', default: '"1.29"' },
        { name: 'public_endpoint_enabled', description: 'Public API endpoint', type: 'bool', default: 'false' },
        { name: 'public_access_cidrs', description: 'Public access CIDRs', type: 'list(string)', default: '[]' },
        { name: 'node_instance_types', description: 'Node instance types', type: 'list(string)', default: '["m6i.xlarge"]' },
        { name: 'capacity_type', description: 'Capacity type', type: 'string', default: '"ON_DEMAND"' },
        { name: 'desired_node_count', description: 'Desired nodes', type: 'number', default: '3' },
        { name: 'min_node_count', description: 'Min nodes', type: 'number', default: '2' },
        { name: 'max_node_count', description: 'Max nodes', type: 'number', default: '10' },
        { name: 'tags', description: 'Tags', type: 'map(string)', default: '{}' },
      ],
      outputs: [
        { name: 'cluster_name', description: 'Cluster name', value: 'aws_eks_cluster.medsphere.name' },
        { name: 'cluster_endpoint', description: 'Cluster endpoint', value: 'aws_eks_cluster.medsphere.endpoint' },
        { name: 'cluster_ca_certificate', description: 'Cluster CA', value: 'aws_eks_cluster.medsphere.certificate_authority[0].data' },
        { name: 'node_group_arn', description: 'Node group ARN', value: 'aws_eks_node_group.general.arn' },
      ],
    },
  };

  for (const [modName, mod] of Object.entries(tfModules)) {
    const dir = modName === 'eks' ? 'eks-or-aks' : modName;
    await writeFile(root, `infrastructure/terraform/modules/${dir}/main.tf`, terraformModule(modName, mod), stats);
    await writeFile(root, `infrastructure/terraform/modules/${dir}/variables.tf`, tfVariables(mod.variables) + '\n', stats);
    await writeFile(root, `infrastructure/terraform/modules/${dir}/outputs.tf`, tfOutputs(mod.outputs) + '\n', stats);
  }

  await writeFile(
    root,
    'infrastructure/terraform/environments/dev/main.tf',
    `terraform {
  required_version = ">= 1.6.0"
  backend "s3" {
    bucket         = "medsphere-terraform-state-dev"
    key            = "dev/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "medsphere-terraform-locks"
  }
}

provider "aws" {
  region = var.aws_region
  default_tags {
    tags = local.common_tags
  }
}

locals {
  project_name = "medsphere-dev"
  common_tags = {
    Environment = "dev"
    Project     = "medsphere"
    ManagedBy   = "terraform"
  }
}

module "network" {
  source               = "../../modules/network"
  project_name         = local.project_name
  vpc_cidr             = "10.20.0.0/16"
  availability_zones   = ["us-east-1a", "us-east-1b", "us-east-1c"]
  private_subnet_cidrs = ["10.20.1.0/24", "10.20.2.0/24", "10.20.3.0/24"]
  public_subnet_cidrs  = ["10.20.101.0/24", "10.20.102.0/24", "10.20.103.0/24"]
  tags                 = local.common_tags
}

module "eks" {
  source               = "../../modules/eks-or-aks"
  project_name         = local.project_name
  vpc_id               = module.network.vpc_id
  subnet_ids           = concat(module.network.public_subnet_ids, module.network.private_subnet_ids)
  private_subnet_ids   = module.network.private_subnet_ids
  kms_key_arn          = var.kms_key_arn
  tags                 = local.common_tags
}

module "database" {
  source                     = "../../modules/database"
  project_name               = local.project_name
  vpc_id                     = module.network.vpc_id
  subnet_ids                 = module.network.private_subnet_ids
  allowed_security_group_ids = [module.network.eks_nodes_security_group_id]
  kms_key_arn                = var.kms_key_arn
  master_username            = var.db_master_username
  tags                       = local.common_tags
}

module "redis" {
  source                     = "../../modules/redis"
  project_name               = local.project_name
  vpc_id                     = module.network.vpc_id
  subnet_ids                 = module.network.private_subnet_ids
  allowed_security_group_ids = [module.network.eks_nodes_security_group_id]
  tags                       = local.common_tags
}

module "kafka" {
  source                     = "../../modules/kafka"
  project_name               = local.project_name
  vpc_id                     = module.network.vpc_id
  subnet_ids                 = module.network.private_subnet_ids
  allowed_security_group_ids = [module.network.eks_nodes_security_group_id]
  kms_key_arn                = var.kms_key_arn
  tags                       = local.common_tags
}

module "minio" {
  source = "../../modules/minio"
}

variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "kms_key_arn" {
  type = string
}

variable "db_master_username" {
  type    = string
  default = "medsphere_admin"
}
`,
    stats,
  );

  const dashboards = [
    {
      name: 'api-gateway',
      metrics: [
        { title: 'Request Rate', expr: 'sum(rate(http_requests_total{service="api-gateway"}[5m]))', unit: 'reqps' },
        { title: 'P95 Latency', expr: 'histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket{service="api-gateway"}[5m])) by (le))', unit: 's', warn: 0.5, crit: 2 },
        { title: 'Error Rate', expr: 'sum(rate(http_requests_total{service="api-gateway",status=~"5.."}[5m]))', unit: 'reqps' },
        { title: 'Active Connections', expr: 'sum(api_gateway_active_connections)', unit: 'short' },
      ],
    },
    {
      name: 'auth',
      metrics: [
        { title: 'Login Success Rate', expr: 'sum(rate(auth_login_total{result="success"}[5m]))', unit: 'reqps' },
        { title: 'Login Failures', expr: 'sum(rate(auth_login_total{result="failure"}[5m]))', unit: 'reqps' },
        { title: 'MFA Challenges', expr: 'sum(rate(auth_mfa_challenges_total[5m]))', unit: 'reqps' },
        { title: 'Active Sessions', expr: 'sum(auth_active_sessions)', unit: 'short' },
      ],
    },
    {
      name: 'clinical-latency',
      metrics: [
        { title: 'Patient API P95', expr: 'histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket{service="patient"}[5m])) by (le))', unit: 's' },
        { title: 'Medical Record P95', expr: 'histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket{service="medical-record"}[5m])) by (le))', unit: 's' },
        { title: 'Lab Order P95', expr: 'histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket{service="laboratory"}[5m])) by (le))', unit: 's' },
        { title: 'Pharmacy P95', expr: 'histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket{service="pharmacy"}[5m])) by (le))', unit: 's' },
      ],
    },
  ];

  for (const dash of dashboards) {
    await writeFile(
      root,
      `infrastructure/docker/monitoring/grafana/dashboards/${dash.name}.json`,
      grafanaDashboard(dash.name, buildDashboardPanels(dash.name, dash.metrics)),
      stats,
    );
  }

  await writeFile(
    root,
    'infrastructure/docker/monitoring/alerts/rules.yml',
    `groups:
  - name: medsphere-api
    rules:
      - alert: ApiGatewayHighErrorRate
        expr: sum(rate(http_requests_total{service="api-gateway",status=~"5.."}[5m])) / sum(rate(http_requests_total{service="api-gateway"}[5m])) > 0.05
        for: 5m
        labels:
          severity: critical
          team: platform
        annotations:
          summary: API Gateway error rate above 5%
          description: "5xx error ratio is {{ $value | humanizePercentage }} over the last 5 minutes."

      - alert: ApiGatewayHighLatency
        expr: histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket{service="api-gateway"}[5m])) by (le)) > 2
        for: 10m
        labels:
          severity: warning
          team: platform
        annotations:
          summary: API Gateway P95 latency above 2s

  - name: medsphere-auth
    rules:
      - alert: AuthLoginFailureSpike
        expr: sum(rate(auth_login_total{result="failure"}[5m])) > 10
        for: 5m
        labels:
          severity: warning
          team: security
        annotations:
          summary: Elevated authentication failures detected

      - alert: AuthServiceDown
        expr: up{job="auth"} == 0
        for: 2m
        labels:
          severity: critical
          team: security
        annotations:
          summary: Auth service is unreachable

  - name: medsphere-clinical
    rules:
      - alert: ClinicalServiceHighLatency
        expr: histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket{service=~"patient|medical-record|laboratory|pharmacy"}[5m])) by (service, le)) > 3
        for: 10m
        labels:
          severity: warning
          team: clinical
        annotations:
          summary: "{{ $labels.service }} P95 latency above 3s"

      - alert: DatabaseConnectionPoolExhausted
        expr: pg_stat_activity_count / pg_settings_max_connections > 0.85
        for: 5m
        labels:
          severity: critical
          team: platform
        annotations:
          summary: PostgreSQL connection pool above 85% utilization

  - name: medsphere-kafka
    rules:
      - alert: KafkaConsumerLag
        expr: kafka_consumergroup_lag > 10000
        for: 15m
        labels:
          severity: warning
          team: platform
        annotations:
          summary: Kafka consumer lag exceeds 10k messages for {{ $labels.consumergroup }}

      - alert: KafkaBrokerDown
        expr: kafka_brokers < 3
        for: 5m
        labels:
          severity: critical
          team: platform
        annotations:
          summary: Kafka cluster has fewer than 3 brokers online
`,
    stats,
  );
}
