import { useMemo } from "react";

import { useFromChain, useToChain } from "../use-chain";
import { useAllDeployments } from "./use-all-deployments";

export const useDeployment = () => {
  const from = useFromChain();
  const to = useToChain();
  const deployments = useAllDeployments();

  return useMemo(
    () =>
      deployments.find(
        (x) =>
          (x.l1ChainId === from?.id && x.l2ChainId === to?.id) ||
          (x.l1ChainId === to?.id && x.l2ChainId === from?.id)
      ) ?? null,
    [from, to, deployments]
  );
};
