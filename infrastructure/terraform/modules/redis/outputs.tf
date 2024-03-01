output "primary_endpoint" {
  description = "Primary endpoint"
  value       = aws_elasticache_replication_group.medsphere.primary_endpoint_address
}

output "reader_endpoint" {
  description = "Reader endpoint"
  value       = aws_elasticache_replication_group.medsphere.reader_endpoint_address
}
