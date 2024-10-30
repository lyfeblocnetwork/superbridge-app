import {
  isSuperbridge,
  isSuperbridgeMainnet,
  isSuperbridgeTestnet,
} from "@/utils/is-superbridge";

import { useHost } from "../use-metadata";

export const useIsSuperbridge = () => {
  return isSuperbridge(useHost());
};

export const useIsSuperbridgeMainnet = () => {
  return isSuperbridgeMainnet(useHost());
};

export const useIsSuperbridgeTestnet = () => {
  return isSuperbridgeTestnet(useHost());
};
