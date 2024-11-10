import { BridgeConfigDto, DeploymentType } from "@/codegen/model";

import { isSuperbridge } from "../is-superbridge";

export const parseSuperbridgeTestnets = (
  { fromChainId, toChainId }: { fromChainId: number; toChainId: number },
  {
    dto,
    host,
    url,
  }: {
    dto: BridgeConfigDto | null;
    host: string;
    url: string;
  }
): boolean => {
  if (!isSuperbridge(host)) {
    return false;
  }

  return (
    dto?.deployments.find(
      (x) =>
        (x.l1ChainId === fromChainId && x.l2ChainId === toChainId) ||
        (x.l1ChainId === toChainId && x.l2ChainId === fromChainId)
    )?.type === DeploymentType.testnet
  );
};
