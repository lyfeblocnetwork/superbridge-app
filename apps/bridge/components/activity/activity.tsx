import { AnimatePresence, motion } from "framer-motion";

import { useConfigState } from "@/state/config";

import { OpenActivity } from "./open-activity";

export const Activity = () => {
  const displayTransactions = useConfigState.useDisplayTransactions();

  console.log("11 Activity");

  return (
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
    </AnimatePresence>
  );
};
