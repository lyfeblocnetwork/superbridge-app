import { useMemo, useState } from "react";
import { isPresent } from "ts-is-present";
import { Address, isAddressEqual } from "viem";

import { useOnrampControllerGetSupportedAssets } from "@/codegen/index";
import { BridgeableTokenDto, ChainDto } from "@/codegen/model";
import { useAllTokens } from "@/hooks/tokens";
import { useAllChains } from "@/hooks/use-chains";
import { useHost } from "@/hooks/use-metadata";

import { NetworkIcon } from "../network-icon";
import { TokenIcon } from "../token-icon";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const deduplicateChains = (array: ChainDto[]): ChainDto[] => {
  const seen = new Map<string, ChainDto>();

  array.forEach((item) => {
    if (!seen.has(item.id.toString())) {
      seen.set(item.id.toString(), item);
    }
  });

  return Array.from(seen.values());
};

const deduplicateTokens = (
  array: BridgeableTokenDto[]
): BridgeableTokenDto[] => {
  const seen = new Map<string, BridgeableTokenDto>();

  array.forEach((item) => {
    const key = `${item.chainId}-${item.address}`;
    if (!seen.has(key)) {
      seen.set(key, item);
    }
  });

  return Array.from(seen.values());
};

export const FiatOnramp = () => {
  const supportedAssets = useOnrampControllerGetSupportedAssets(useHost());
  const tokens = useAllTokens();
  const chains = useAllChains();

  const [assetAddress, setAssetAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);

  const { availableChains, availableAssets, asset, chain } = useMemo(() => {
    const availableChains = deduplicateChains(
      (supportedAssets.data?.data.assets ?? [])
        .map((a) => {
          return chains.find((x) => x.id === a.chainId);
        })
        .filter(isPresent)
    );

    const chain =
      availableChains.find((x) => x.id === chainId) || availableChains[0];

    const availableAssets = deduplicateTokens(
      (supportedAssets.data?.data.assets ?? [])
        .map((a) => {
          if (!chain) return null;

          const t = tokens.data.find(
            (t) =>
              t[chain.id]?.address &&
              isAddressEqual(
                t[chain.id]!.address as Address,
                a.address as Address
              )
          );

          return t?.[chain.id];
        })
        .filter(isPresent)
    );

    const asset =
      availableAssets.find((x) => x.address === assetAddress) ||
      availableAssets[0];

    return {
      availableAssets,
      availableChains,
      chain,
      asset,
    };
  }, [chains, tokens.data, supportedAssets.data?.data, chainId, assetAddress]);

  console.log({ availableChains, availableAssets, asset, chain });

  return (
    <div className="flex flex-col gap-3 px-4 py-4">
      <div className="flex flex-col gap-1.5">
        <Input />
      </div>

      <Select value={asset.address} onValueChange={(c) => setAssetAddress(c)}>
        <SelectTrigger className="max-w-[166px]">
          <SelectValue asChild>
            <div className="flex items-center gap-2">
              <TokenIcon token={asset} className="h-4 w-4" />
              <div>{asset.symbol}</div>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {availableAssets.map((a) => {
            const chain = chains.find((x) => x.id === a.chainId);
            if (!chain) return null;
            return (
              <SelectItem key={a.address} value={a.address}>
                <div className="flex items-center gap-2">
                  <TokenIcon token={a} className="h-4 w-4" />
                  <div>{a.symbol}</div>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      <Select
        value={chain.id.toString()}
        onValueChange={(c) => setChainId(parseInt(c))}
      >
        <SelectTrigger className="">
          <SelectValue asChild>
            <div className="flex items-center">
              <NetworkIcon className="h-4 w-4" chain={chain} />
              <div>
                <div>Buy on</div>
                <div>{chain?.name}</div>
              </div>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {availableChains.map((c) => (
            <SelectItem key={c.id.toString()} value={c.id.toString()}>
              <NetworkIcon chain={{ id: c.id, name: "" }} />
              <div></div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
