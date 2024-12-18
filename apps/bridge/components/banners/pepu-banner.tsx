import { useIsPepe } from "@/hooks/apps/use-is-pepe";

import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export const PepuBanner = () => {
  const isPepe = useIsPepe();
  if (!isPepe) {
    return null;
  }

  return (
    <Alert>
      <AlertTitle>Important! Check your wallet before you bridge</AlertTitle>
      <AlertDescription>
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
