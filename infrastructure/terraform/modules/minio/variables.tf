variable "namespace" {
  description = "K8s namespace"
  type        = string
  default     = "medsphere-storage"
}

variable "chart_version" {
  description = "Helm chart version"
  type        = string
  default     = "5.2.0"
}

variable "replicas" {
  description = "Replica count"
  type        = number
  default     = 4
}

variable "storage_size" {
  description = "PVC size"
  type        = string
  default     = "500Gi"
}

variable "resources" {
  description = "Resource limits"
  type        = any
  default     = {}
}

variable "ingress_enabled" {
  description = "Enable ingress"
  type        = bool
  default     = false
}

variable "ingress_host" {
  description = "Ingress host"
  type        = string
  default     = "storage.medsphere.health"
}

variable "bucket_policies" {
  description = "Bucket policies"
  type        = list(any)
  default     = []
}
