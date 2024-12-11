import { AnimatePresence, motion } from "framer-motion";

import { useFiatOnrampQuote } from "@/hooks/fiat-onramp/use-fiat-onramp-quote";
import { useFiatOnrampState } from "@/state/fiat-onramp";

import { IconSpinner } from "../icons";
import { FiatOnrampQuote } from "./fiat-onramp-quote";

export const FiatOnrampQuotePreview = () => {
  const amount = useFiatOnrampState.useAmount();
  const quote = useFiatOnrampQuote();

  return (
    <AnimatePresence mode="wait">
      {quote.isLoading && (
        <motion.div
          key={"loading route quote"}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={`flex gap-2 justify-center w-full items-center py-4`}
        >
          <IconSpinner className="text-muted-foreground w-4 h-4" />
          <span className="text-xs text-muted-foreground">Loading</span>
        </motion.div>
      )}

      {!quote.isLoading && !quote.data && !!amount && (
        <motion.div key={"empty route quote"} exit={{ opacity: 0 }}>
          No quotes
        </motion.div>
      )}

      {quote.data && (
        <motion.div
          key={"fiat onramp quote"}
          exit={{ opacity: 0, scale: 0.98 }}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1, transition: { delay: 0.2 } }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={`flex flex-col gap-2 relative`}
        >
          <div className="p-4 border rounded-xl">
            <FiatOnrampQuote quote={quote.data} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
