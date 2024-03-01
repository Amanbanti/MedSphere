variable "project_name" {
  description = "Project name"
  type        = string
  
}

variable "vpc_id" {
  description = "VPC ID"
  type        = string
  
}

variable "subnet_ids" {
  description = "Subnet IDs"
  type        = list(string)
  
}

variable "allowed_security_group_ids" {
  description = "Allowed SGs"
  type        = list(string)
  
}

variable "engine_version" {
  description = "Redis version"
  type        = string
  default     = "7.1"
}

variable "node_type" {
  description = "Node type"
  type        = string
  default     = "cache.r6g.large"
}

variable "num_cache_clusters" {
  description = "Cluster count"
  type        = number
  default     = 2
}

variable "automatic_failover_enabled" {
  description = "Auto failover"
  type        = bool
  default     = true
}

variable "multi_az_enabled" {
  description = "Multi-AZ"
  type        = bool
  default     = true
}

variable "snapshot_retention_days" {
  description = "Snapshot retention"
  type        = number
  default     = 7
}

variable "maintenance_window" {
  description = "Maintenance window"
  type        = string
  default     = "sun:05:00-sun:06:00"
}

variable "tags" {
  description = "Tags"
  type        = map(string)
  default     = {}
}
