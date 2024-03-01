variable "project_name" {
  description = "Project name"
  type        = string
  
}

variable "vpc_id" {
  description = "VPC ID"
  type        = string
  
}

variable "subnet_ids" {
  description = "DB subnet IDs"
  type        = list(string)
  
}

variable "allowed_security_group_ids" {
  description = "Allowed SGs"
  type        = list(string)
  
}

variable "engine_version" {
  description = "Postgres version"
  type        = string
  default     = "16.3"
}

variable "instance_class" {
  description = "Instance class"
  type        = string
  default     = "db.r6g.large"
}

variable "allocated_storage" {
  description = "Storage GB"
  type        = number
  default     = 100
}

variable "max_allocated_storage" {
  description = "Max storage GB"
  type        = number
  default     = 500
}

variable "database_name" {
  description = "Database name"
  type        = string
  default     = "medsphere"
}

variable "master_username" {
  description = "Master user"
  type        = string
  
}

variable "master_password" {
  description = "Master password"
  type        = string
  default     = null
}

variable "kms_key_arn" {
  description = "KMS key ARN"
  type        = string
  
}

variable "backup_retention_days" {
  description = "Backup retention"
  type        = number
  default     = 30
}

variable "deletion_protection" {
  description = "Deletion protection"
  type        = bool
  default     = true
}

variable "multi_az" {
  description = "Multi-AZ"
  type        = bool
  default     = true
}

variable "read_replica_count" {
  description = "Read replica count"
  type        = number
  default     = 1
}

variable "replica_instance_class" {
  description = "Replica class"
  type        = string
  default     = "db.r6g.large"
}

variable "tags" {
  description = "Tags"
  type        = map(string)
  default     = {}
}
