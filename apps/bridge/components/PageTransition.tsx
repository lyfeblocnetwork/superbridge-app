import clsx from "clsx";

import { useIsWidget } from "@/hooks/use-is-widget";

export function PageTransition({
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  const isWidget = useIsWidget();
  return (
    <div
      className={clsx(
        "flex items-start justify-center fixed inset-0 h-screen w-screen overflow-x-hidden",
        isWidget ? "overflow-y-hidden" : "overflow-y-auto"
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
