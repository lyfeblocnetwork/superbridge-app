import Image from "next/image";

import { OnrampQuoteProvider } from "@/codegen/model";

const icons = {
  [OnrampQuoteProvider.Moonpay]: "/img/networks/across.svg",
  [OnrampQuoteProvider.Halliday]: "/img/networks/across.svg",
  [OnrampQuoteProvider.Transak]: "/img/networks/across.svg",
  [OnrampQuoteProvider.ramp]: "/img/networks/across.svg",
};

export const FiatOnrampProviderIcon = ({
  provider,
  className,
}: {
  provider: OnrampQuoteProvider;
  className?: string;
}) => {
  let icon = icons[provider];

  return (
    <Image
      alt={`${provider} icon`}
      src={icon}
      className={className}
      height={16}
      width={16}
    />
  );
};
