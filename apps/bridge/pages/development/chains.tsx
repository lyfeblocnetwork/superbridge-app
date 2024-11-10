import { mainnet, optimism } from "viem/chains";

import { useBridgeControllerGetChains } from "@/codegen/index";
import { ChainDto } from "@/codegen/model";
import { Providers } from "@/components/Providers";
import { ChainCard } from "@/components/chain-card";
import { NetworkIcon } from "@/components/network-icon";
import { cardThemes } from "@/config/card-themes";
import { InjectedStoreProvider } from "@/state/injected";

function Page() {
  const chains = useBridgeControllerGetChains();

  if (process.env["NODE_ENV"] !== "development") {
    return null;
  }

  return (
    <div className="grid grid-cols-4 gap-6 overflow-scroll h-screen max-w-screen-lg mx-auto py-20">
      {chains.data?.data
        .sort((a, b) => {
          if (cardThemes[a.id] && cardThemes[b.id]) return 0;
          return !cardThemes[a.id] ? -1 : 1;
        })
        .map((x) => (
          <div key={x.id} className="flex flex-col gap-2">
            <ChainCard chain={x} onSelect={() => {}} />
            <NetworkIcon chain={x} className="h-12 w-12 rounded-sm" />
            <span className="text-xs text-muted-foreground">
              Chain ID: {x.id}
            </span>
          </div>
        ))}
    </div>
  );
}

export default function ChainsPage() {
  return (
    <InjectedStoreProvider
      initialValues={{
        acrossDomains: [],
        cctpDomains: [],
        chains: [
          mainnet as unknown as ChainDto,
          optimism as unknown as ChainDto,
        ],
        deployments: [],
        fromChainId: 1,
        toChainId: 1,
        lzDomains: [],
        hyperlaneMailboxes: [],
        app: {
          head: {
            description: "",
            favicon: "",
            title: "",
            og: "",
          },
          links: [],
          theme: {},
          metadata: {
            gId: "",
          },
          tos: null,
        },
        host: "",
        superbridgeTestnets: false,
        widget: false,
        superbridgeConfig: null,
        isPaid: true,
        deletedAt: null,
      }}
    >
      <Providers>
        <Page />
      </Providers>
    </InjectedStoreProvider>
  );
}
