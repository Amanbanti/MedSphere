output "cluster_name" {
  description = "Cluster name"
  value       = aws_eks_cluster.medsphere.name
}

output "cluster_endpoint" {
  description = "Cluster endpoint"
  value       = aws_eks_cluster.medsphere.endpoint
}

output "cluster_ca_certificate" {
  description = "Cluster CA"
  value       = aws_eks_cluster.medsphere.certificate_authority[0].data
}

output "node_group_arn" {
  description = "Node group ARN"
  value       = aws_eks_node_group.general.arn
}
