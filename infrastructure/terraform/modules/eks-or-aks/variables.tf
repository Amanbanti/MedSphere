variable "project_name" {
  description = "Project name"
  type        = string
  
}

variable "vpc_id" {
  description = "VPC ID"
  type        = string
  
}

variable "subnet_ids" {
  description = "Cluster subnet IDs"
  type        = list(string)
  
}

variable "private_subnet_ids" {
  description = "Node subnet IDs"
  type        = list(string)
  
}

variable "kms_key_arn" {
  description = "KMS key ARN"
  type        = string
  
}

variable "cluster_version" {
  description = "EKS version"
  type        = string
  default     = "1.29"
}

variable "public_endpoint_enabled" {
  description = "Public API endpoint"
  type        = bool
  default     = false
}

variable "public_access_cidrs" {
  description = "Public access CIDRs"
  type        = list(string)
  default     = []
}

variable "node_instance_types" {
  description = "Node instance types"
  type        = list(string)
  default     = ["m6i.xlarge"]
}

variable "capacity_type" {
  description = "Capacity type"
  type        = string
  default     = "ON_DEMAND"
}

variable "desired_node_count" {
  description = "Desired nodes"
  type        = number
  default     = 3
}

variable "min_node_count" {
  description = "Min nodes"
  type        = number
  default     = 2
}

variable "max_node_count" {
  description = "Max nodes"
  type        = number
  default     = 10
}

variable "tags" {
  description = "Tags"
  type        = map(string)
  default     = {}
}
