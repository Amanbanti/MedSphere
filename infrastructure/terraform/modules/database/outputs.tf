output "primary_endpoint" {
  description = "Primary endpoint"
  value       = aws_db_instance.primary.address
}

output "primary_port" {
  description = "Primary port"
  value       = aws_db_instance.primary.port
}

output "replica_endpoints" {
  description = "Replica endpoints"
  value       = aws_db_instance.read_replica[*].address
}
