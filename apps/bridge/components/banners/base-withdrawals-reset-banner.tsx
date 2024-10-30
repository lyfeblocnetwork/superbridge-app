import clsx from "clsx";

import { optimismFaultProofs } from "@/constants/links";

import { IconAlert } from "../icons";
import { Alert } from "../ui/alert";

export const BaseMainnetWithdrawalsResetBanner = ({ className }: any) => {
  return (
    <Alert
      variant={"horizontal"}
      className={clsx("flex items-start gap-4", className)}
    >
      <div className="animate-wiggle-waggle drop-shadow-lg">
        <IconAlert className="h-8 w-8 shrink-0" />
      </div>
      <div className="prose">
        <p className="text-xs text-foreground">
          Pending withdrawals from Base were reset on October 30 following
          activation of the fault proof upgrade. Recently proved withdrawals
          will need to be reproven.
        </p>
        <p className="text-xs">
          <a
            href={optimismFaultProofs}
            target="_blank"
            className="cursor-pointer hover:underline text-muted-foreground"
          >
            More info
          </a>
        </p>
      </div>
    </Alert>
  );
};
