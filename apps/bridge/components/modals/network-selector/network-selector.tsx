import { AnimatePresence, motion } from "framer-motion";

import { useConfigState } from "@/state/config";

import { NetworkSelectorModal } from "./network-selector-modal";

export const NetworkSelector = () => {
  const displayNetworkSelector = useConfigState.useDisplayNetworkSelector();

  return (
    <AnimatePresence mode="wait" initial={false}>
      {displayNetworkSelector && (
        <>
          <NetworkSelectorModal key="networkSelector" />
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
  );
};
