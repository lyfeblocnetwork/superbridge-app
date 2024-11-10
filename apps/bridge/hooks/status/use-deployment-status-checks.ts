import { isPresent } from "ts-is-present";

import { DeploymentDto } from "@/codegen/model";
import { isOptimism } from "@/utils/deployments/is-mainnet";

import { useChainsForDeployment } from "../deployments/use-deployment-chains";
import { useIndexingStatuses } from "./use-indexing-statuses";
import { useLastObservedBlock } from "./use-last-observed-block";
import { useLatestStateRoot } from "./use-latest-state-root";
import { usePaused } from "./use-paused";

export const useDeploymentStatusChecks = (deployment: DeploymentDto | null) => {
  const chains = useChainsForDeployment(deployment?.id);
  const l1LastObservedBlock = useLastObservedBlock(chains?.l1);
  const l2LastObservedBlock = useLastObservedBlock(chains?.l2);

  const paused = usePaused(
    deployment && isOptimism(deployment) ? deployment : undefined
  );
  const indexingStatuses = useIndexingStatuses(deployment);
  const lastObservedStateRoot = useLatestStateRoot(
    deployment && isOptimism(deployment) ? deployment : undefined
  );

  return [
    l1LastObservedBlock,
    l2LastObservedBlock,
    deployment && isOptimism(deployment) ? paused : null,
    deployment && isOptimism(deployment) ? lastObservedStateRoot : null,
    ...indexingStatuses,
  ].filter(isPresent);
};
