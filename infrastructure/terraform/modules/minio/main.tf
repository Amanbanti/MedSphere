# MedSphere Terraform module: minio
terraform {
  required_version = ">= 1.6.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

resource "kubernetes_namespace" "minio" {
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


