import { useDeletedAt } from "@/hooks/use-metadata";

import { EchosBanner } from "./echos-banner";
import { FaultProofsBanner } from "./fault-proofs-banner";
import { GravityBanner } from "./gravity-banner";
import { PepuBanner } from "./pepu-banner";
import { ScheduledDeletion } from "./scheduled-deletion";

export const Banners = () => {
  const deletedAt = useDeletedAt();

  return (
    <>
      {deletedAt && deletedAt > Date.now() && <ScheduledDeletion />}
      <FaultProofsBanner />
      <GravityBanner />
      <PepuBanner />
      <EchosBanner />
    </>
  );
};
