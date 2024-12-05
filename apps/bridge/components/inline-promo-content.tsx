import { useIsHyperlanePlayground } from "@/hooks/apps/use-is-hyperlane";
import { useIsLzPlayground } from "@/hooks/apps/use-is-lz";
import { useIsWidget } from "@/hooks/use-is-widget";

import { HLContent } from "./inline-promo-content/HLcontent";
import { LZContent } from "./inline-promo-content/LZcontent";
import { Footer } from "./inline-promo-content/footer";

export const InlinePromoContent = () => {
  const isHyperlane = useIsHyperlanePlayground();
  const isLz = useIsLzPlayground();
  const isWidget = useIsWidget();

  if (isWidget) {
    return null;
  }

  if (isHyperlane) {
    return (
      <div className="w-full px-3 md:px-8">
        <HLContent />
        <Footer />
      </div>
    );
  }

  if (isLz) {
    return (
      <div className="w-full px-3 md:px-8">
        <LZContent />
        <Footer />
      </div>
    );
  }

  return null;
};
