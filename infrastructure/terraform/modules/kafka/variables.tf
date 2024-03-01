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

variable "kafka_version" {
  description = "Kafka version"
  type        = string
  default     = "3.6.0"
}

variable "broker_count" {
  description = "Broker count"
  type        = number
  default     = 3
}

variable "broker_instance_type" {
  description = "Broker instance"
  type        = string
  default     = "kafka.m5.large"
}

variable "broker_volume_gb" {
  description = "Broker volume GB"
  type        = number
  default     = 100
}

variable "kms_key_arn" {
  description = "KMS key"
  type        = string
  
}

variable "tags" {
  description = "Tags"
  type        = map(string)
  default     = {}
}
