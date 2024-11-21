import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect } from "react";

import { useIsSuperbridge } from "@/hooks/apps/use-is-superbridge";
import { useDeployments } from "@/hooks/deployments/use-deployments";
import { useIsWidget } from "@/hooks/use-is-widget";
import { useNavIcon } from "@/hooks/use-theme";

import { HeaderLinks } from "./header/header-links";
import { SBLockup, SBLockupSmall } from "./icons";

export function Header() {
  const deployments = useDeployments();
  const isSuperbridge = useIsSuperbridge();
  const navIcon = useNavIcon();

  const widget = useIsWidget();

  if (widget) {
    return null;
  }

  return (
    <nav className="flex justify-between items-center p-3 md:p-6 fixed top-0 left-0 w-screen z-10">
      <div>
        {isSuperbridge ? (
          <div className="flex gap-2 items-center">
            <SBLockup className="hidden md:inline-flex h-8 w-auto" />
            <SBLockupSmall className="md:hidden h-8 w-auto" />
          </div>
        ) : (
          <img
            src={navIcon}
            width="0"
            height="0"
            sizes="100vw"
            alt={deployments[0]?.name}
            draggable={false}
            className="inline-flex w-auto max-w-40 h-8"
          />
        )}
      </div>

      <div className="flex gap-3">
        <ConnectButton
          chainStatus="icon"
          label="Connect"
          showBalance={{ smallScreen: false, largeScreen: false }}
          accountStatus={{
            smallScreen: "avatar",
            largeScreen: "avatar",
          }}
        />
        <HeaderLinks />
      </div>
    </nav>
  );
}
