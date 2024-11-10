import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { useMemo } from "react";
import { isPresent } from "ts-is-present";
import { fallback, http } from "wagmi";

import { DeploymentDto } from "@/codegen/model";

import { useAllChains } from "../use-chains";

export function useStatusWagmiConfig(deployments: DeploymentDto[]) {
  const allChains = useAllChains();
  return useMemo(() => {
    const chains = deployments
      .flatMap((d) => {
        const l1 = allChains.find((x) => x.id === d.l1ChainId);
        const l2 = allChains.find((x) => x.id === d.l2ChainId);
        if (!l1 || !l2) return null;
        return [l1, l2];
      })
      .filter(isPresent);

    const transports = chains.reduce(
      (accum, chain) => ({
        ...accum,
        [chain.id]: fallback(
          chain.rpcUrls.default.http.map((url) => http(url))
        ),
      }),
      {}
    );

    return getDefaultConfig({
      appName: "Superbridge",
      projectId: "50c3481ab766b0e9c611c9356a42987b",
      // @ts-expect-error
      chains,
      transports,
      ssr: true,
    });
  }, [deployments, allChains]);
}
