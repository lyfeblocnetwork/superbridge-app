import { DeploymentDto } from "@/codegen/model";

export const useFaultProofUpgradeTime = (
  deployment: DeploymentDto | null | undefined
) => {
  return deployment?.name === "soneium-minato"
    ? new Date("11/04/2024").getTime()
    : null;
};
