import { useIsPepe } from "@/hooks/apps/use-is-pepe";

import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export const PepuBanner = () => {
  const isPepe = useIsPepe();
  if (!isPepe) {
    return null;
  }

  return (
    <Alert>
      <AlertTitle>
        IMPORTANT! Check your wallet supports custom networks BEFORE you bridge
      </AlertTitle>
      <AlertDescription>
        <div className="text-foreground my-2">
          DO NOT BRIDGE TO PEPE UNCHAINED L2 WITH:
          <ul className="list-inside list-disc">
            <li>Binance Web3 wallet</li>
            <li>Coinbase Smart Wallet</li>
            <li>Best Wallet</li>
            <li>ByBit (cloud wallet)</li>
            <li>
              <a
                href="https://help.superbridge.app/en/articles/10293436-pepe-unchained-pepu-troubleshooting"
                target="_blank"
                className="underline text-foreground"
              >
                And more…
              </a>
            </li>
          </ul>
        </div>
        To make transactions, stake, or withdraw from Pepe Unchained Layer 2
        your wallet needs support for custom networks. If your wallet does not
        have support for custom networks, then do not bridge until you have
        imported your wallet into one that does.{" "}
        <a
          href="https://help.superbridge.app/en/articles/10293436-pepe-unchained-pepu-troubleshooting"
          target="_blank"
          className="underline text-foreground"
        >
          Learn more…
        </a>
      </AlertDescription>
    </Alert>
  );
};
