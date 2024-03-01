output "bootstrap_brokers_tls" {
  description = "TLS bootstrap brokers"
  value       = aws_msk_cluster.medsphere.bootstrap_brokers_tls
}

output "cluster_arn" {
  description = "Cluster ARN"
  value       = aws_msk_cluster.medsphere.arn
}
