import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

import { OpenActivity } from "@/components/activity/open-activity";
import { useIsSuperbridge } from "@/hooks/apps/use-is-superbridge";
import { useInitialise } from "@/hooks/use-initialise/use-initialise";
import {
  useBackgroundIcon,
  useBackgroundImageBlendMode,
  useBackgroundImageOpacity,
  useBackgroundImagePosition,
  useBackgroundImageRepeat,
  useBackgroundImageSize,
} from "@/hooks/use-theme";
import { useConfigState } from "@/state/config";

import { Header } from "./header";
import { Modals } from "./modals";
import { FiatNetworkSelectorModal } from "./modals/network-selector/fiat-network-selector-modal";
import { TokenNetworkSelectorModal } from "./modals/network-selector/token-network-selector-modal";

export function Layout({ children }: { children: any }) {
  useInitialise();

  const displayTransactions = useConfigState.useDisplayTransactions();
  const displayTokenNetworkSelector =
    useConfigState.useDisplayTokenNetworkSelector();
  const displayFiatNetworkSelector =
    useConfigState.useDisplayFiatNetworkSelector();

  const imageBackground = useBackgroundIcon();
  const backgroundImageBlendMode = useBackgroundImageBlendMode();
  const backgroundImagePosition = useBackgroundImagePosition();
  const backgroundImageSize = useBackgroundImageSize();
  const backgroundImageRepeat = useBackgroundImageRepeat();
  const backgroundImageOpacity = useBackgroundImageOpacity();

  const isSuperbridge = useIsSuperbridge();

  return (
    <div
      className={clsx(
        isSuperbridge && "tracking-tight",
        "bg-background w-screen h-screen overflow-hidden z-40 relative transition-colors duration-1000  flex justify-center"
      )}
    >
      {isSuperbridge && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gradient-to-t from-[rgba(168,130,253,0.27)] via-[rgba(168,130,253,0.05)] to-[rgba(168,130,253,0)] inset-0 z-0 fixed mix-blend-plus-lighter"
          />
        </>
      )}
      <div
        className={clsx(`inset-0 z-0 fixed transition-all bg-cover`)}
        style={{
          backgroundImage: imageBackground
            ? `url(${imageBackground})`
            : undefined,
          opacity:
            !!backgroundImageOpacity &&
            typeof backgroundImageOpacity === "string"
              ? parseInt(backgroundImageOpacity) / 100
              : undefined,
          mixBlendMode: backgroundImageBlendMode as any,
          backgroundSize: backgroundImageSize,
          backgroundRepeat: backgroundImageRepeat,
          backgroundPosition: backgroundImagePosition,
        }}
      />

      <Header />

      {/* bridge */}
      {children}

      {/* Transactions container */}
      <AnimatePresence mode="wait" initial={false}>
        {displayTransactions && (
          <>
            <OpenActivity key="transactionItemsContainer" />
            {/* fade background */}
            <motion.div
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              // transition={{ ease: "easeOut", duration: 1 }}
              className="h-screen w-screen z-10 backdrop-blur-lg  bg-white/0"
            ></motion.div>
          </>
        )}

        {displayTokenNetworkSelector && (
          <>
            <TokenNetworkSelectorModal key="tokenNetworkSelector" />
            {/* fade background */}
            <motion.div
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              // transition={{ duration: 0.2 }}
              className="h-screen w-screen z-10 backdrop-blur-lg  bg-white/0"
            ></motion.div>
          </>
        )}

        {displayFiatNetworkSelector && (
          <>
            <FiatNetworkSelectorModal key="fiatNetworkSelector" />
            {/* fade background */}
            <motion.div
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              // transition={{ duration: 0.2 }}
              className="h-screen w-screen z-10 backdrop-blur-lg  bg-white/0"
            ></motion.div>
          </>
        )}
      </AnimatePresence>

      <Modals />
    </div>
  );
}
