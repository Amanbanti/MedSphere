output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.medsphere.id
}

output "private_subnet_ids" {
  description = "Private subnet IDs"
  value       = aws_subnet.private[*].id
}

output "public_subnet_ids" {
  description = "Public subnet IDs"
  value       = aws_subnet.public[*].id
}

output "eks_nodes_security_group_id" {
  description = "EKS nodes SG"
  value       = aws_security_group.eks_nodes.id
}
