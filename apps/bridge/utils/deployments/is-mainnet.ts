import {
  ArbitrumContractAddressesDto,
  DeploymentDto,
  DeploymentFamily,
  DeploymentType,
  OptimismConfigDto,
  OptimismContractAddressesDto,
} from "@/codegen/model";

export const isMainnet = (d: DeploymentDto | null) => {
  return d?.type === DeploymentType.mainnet;
};

export interface ArbitrumDeploymentDto extends DeploymentDto {
  contractAddresses: ArbitrumContractAddressesDto;
}

export const isArbitrum = (d: DeploymentDto): d is ArbitrumDeploymentDto => {
  return d.family === DeploymentFamily.arbitrum;
};

export interface OptimismDeploymentDto extends DeploymentDto {
  contractAddresses: OptimismContractAddressesDto;
  config: OptimismConfigDto;
}

export const isOptimism = (d: DeploymentDto): d is OptimismDeploymentDto => {
  return d.family === DeploymentFamily.optimism;
};
