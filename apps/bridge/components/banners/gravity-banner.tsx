import { useDeployment } from "@/hooks/deployments/use-deployment";

import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export const GravityBanner = () => {
  const deployment = useDeployment();

  if (deployment?.name !== "gravity-mainnet") {
    return null;
  }

  return (
    <Alert>
      <AlertTitle>Bridging USDC, USDT, or WETH?</AlertTitle>
      <AlertDescription>
        Please visit{" "}
        <a
          href="https://stargate.finance/bridge"
          target="_blank"
          className="underline"
        >
          Stargate
        </a>{" "}
        or{" "}
        <a
          href="https://app.symbiosis.finance/swap?chainIn=Ethereum&chainOut=Gravity&tokenIn=ETH&tokenOut=G"
          target="_blank"
          className="underline"
        >
          Symbiosis
        </a>
        .
      </AlertDescription>
    </Alert>
  );
};
