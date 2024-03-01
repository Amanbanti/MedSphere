output "namespace" {
  description = "MinIO namespace"
  value       = kubernetes_namespace.minio.metadata[0].name
}

output "release_name" {
  description = "Helm release name"
  value       = helm_release.minio.name
}
