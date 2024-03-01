terraform {
  required_version = ">= 1.6.0"
  backend "s3" {
    bucket         = "medsphere-terraform-state-dev"
    key            = "dev/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "medsphere-terraform-locks"
  }
}

provider "aws" {
  region = var.aws_region
  default_tags {
    tags = local.common_tags
  }
}

locals {
  project_name = "medsphere-dev"
  common_tags = {
    Environment = "dev"
    Project     = "medsphere"
    ManagedBy   = "terraform"
  }
}

module "network" {
  source               = "../../modules/network"
  project_name         = local.project_name
  vpc_cidr             = "10.20.0.0/16"
  availability_zones   = ["us-east-1a", "us-east-1b", "us-east-1c"]
  private_subnet_cidrs = ["10.20.1.0/24", "10.20.2.0/24", "10.20.3.0/24"]
  public_subnet_cidrs  = ["10.20.101.0/24", "10.20.102.0/24", "10.20.103.0/24"]
  tags                 = local.common_tags
}

module "eks" {
  source               = "../../modules/eks-or-aks"
  project_name         = local.project_name
  vpc_id               = module.network.vpc_id
  subnet_ids           = concat(module.network.public_subnet_ids, module.network.private_subnet_ids)
  private_subnet_ids   = module.network.private_subnet_ids
  kms_key_arn          = var.kms_key_arn
  tags                 = local.common_tags
}

module "database" {
  source                     = "../../modules/database"
  project_name               = local.project_name
  vpc_id                     = module.network.vpc_id
  subnet_ids                 = module.network.private_subnet_ids
  allowed_security_group_ids = [module.network.eks_nodes_security_group_id]
  kms_key_arn                = var.kms_key_arn
  master_username            = var.db_master_username
  tags                       = local.common_tags
}

module "redis" {
  source                     = "../../modules/redis"
  project_name               = local.project_name
  vpc_id                     = module.network.vpc_id
  subnet_ids                 = module.network.private_subnet_ids
  allowed_security_group_ids = [module.network.eks_nodes_security_group_id]
  tags                       = local.common_tags
}

module "kafka" {
  source                     = "../../modules/kafka"
  project_name               = local.project_name
  vpc_id                     = module.network.vpc_id
  subnet_ids                 = module.network.private_subnet_ids
  allowed_security_group_ids = [module.network.eks_nodes_security_group_id]
  kms_key_arn                = var.kms_key_arn
  tags                       = local.common_tags
}

module "minio" {
  source = "../../modules/minio"
}

variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "kms_key_arn" {
  type = string
}

variable "db_master_username" {
  type    = string
  default = "medsphere_admin"
}
