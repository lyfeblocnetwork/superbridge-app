import { mainnet, optimism } from "viem/chains";

import {
  useBridgeControllerGetHyperlaneMailboxes,
  useBridgeControllerGetLzDomains,
} from "@/codegen/index";
import { ChainDto } from "@/codegen/model";
import { Providers } from "@/components/Providers";
import { ChainCard } from "@/components/chain-card";
import { NetworkIcon } from "@/components/network-icon";
import { cardThemes } from "@/config/card-themes";
import { InjectedStoreProvider } from "@/state/injected";

function Page() {
  const mailboxes = useBridgeControllerGetHyperlaneMailboxes();
  const lzDomains = useBridgeControllerGetLzDomains();

  if (process.env["NODE_ENV"] !== "development") {
    return null;
  }

  const chains: ChainDto[] = Object.values(
    [...(mailboxes.data?.data ?? []), ...(lzDomains.data?.data ?? [])].reduce(
      (accum, c) => ({ ...accum, [c.id]: c.chain }),
      {}
    )
  );

  return (
    <div className="flex gap-4 flex-wrap overflow-scroll h-screen">
      {chains
        .sort((a, b) => {
          if (cardThemes[a.id] && cardThemes[b.id]) return 0;
          return !cardThemes[a.id] ? -1 : 1;
        })
        .map((x) => (
          <div key={x.id} className="">
            <ChainCard chain={x} onSelect={() => {}} />
            <NetworkIcon chain={x} className="h-12 w-12 " />
            <div>Chain ID: {x.id}</div>
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
