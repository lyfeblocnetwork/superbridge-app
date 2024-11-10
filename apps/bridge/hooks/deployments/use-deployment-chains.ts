import { useAllChains } from "../use-chains";
import { useDeployment } from "./use-deployment";
import { useDeploymentById } from "./use-deployment-by-id";

export const useDeploymentChains = () => {
  const chains = useAllChains();
  const deployment = useDeployment();

  const l1 = chains.find((x) => x.id === deployment?.l1ChainId);
  const l2 = chains.find((x) => x.id === deployment?.l2ChainId);

  if (!l1 || !l2) {
    return null;
  }

  return { l1, l2 };
};

export const useChainsForDeployment = (id: string | undefined) => {
  const chains = useAllChains();
  const deployment = useDeploymentById(id);

  const l1 = chains.find((x) => x.id === deployment?.l1ChainId);
  const l2 = chains.find((x) => x.id === deployment?.l2ChainId);

  if (!l1 || !l2) {
    return null;
  }

  return { l1, l2 };
};
