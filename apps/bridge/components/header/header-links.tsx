import Link from "next/link";
import { useTranslation } from "react-i18next";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsHyperlanePlayground } from "@/hooks/apps/use-is-hyperlane";
import { useIsLzPlayground } from "@/hooks/apps/use-is-lz";
import { useIsSuperbridge } from "@/hooks/apps/use-is-superbridge";
import { useApp } from "@/hooks/use-metadata";
import { useModal } from "@/hooks/use-modal";

import {
  IconArrowUpRight,
  IconFarcaster,
  IconGithub,
  IconMenu,
  IconX,
  StickerSB,
} from "../icons";

export function HeaderLinks() {
  const { t } = useTranslation();
  const legalModal = useModal("Legal");
  const app = useApp();
  const isSuperbridge = useIsSuperbridge();
  const isLz = useIsLzPlayground();
  const isHyperlane = useIsHyperlanePlayground();

  const isPlayground = isSuperbridge || isLz || isHyperlane;

  const appLinks = [
    {
      url: "https://superbridge.app",
      label: "Superbridge",
    },
    /*{
      url: "#",
      label: "Buy",
    },*/
  ];
  const solutionLinks = [
    {
      url: "https://about.superbridge.app/rollies",
      label: "Rollups",
    },
    {
      url: "https://layerzero.superbridge.app",
      label: "Layer Zero",
    },
    {
      url: "https://hyperlane.superbridge.app",
      label: "Hyperlane",
    },
  ];

  const companyLinks = [
    {
      onClick: () => legalModal.open(),
      label: t("legal.footerButton"),
    },
  ];
  const supportLinks = [
    {
      url: "https://docs.superbridge.app/",
      label: "Docs",
    },
    {
      url: "https://help.superbridge.app",
      label: "Help center",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:ring-none focus-visible:outline-none">
        <div className="bg-card h-10 pl-2.5 pr-3 gap-1 inline-flex items-center rounded-full transition-all border-black/[0.0125] dark:border-white/[0.0125]">
          <IconMenu className="w-6 h-6 fill-foreground" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        side="bottom"
        className="border border-muted w-full max-w-[320px]"
      >
        {!isPlayground ? (
          <>
            {app.links.length !== 0 && (
              <>
                <DropdownMenuGroup className="my-2">
                  {app.links.map((link) => {
                    return (
                      <DropdownMenuItem key={link.label}>
                        {(link as any).url ? (
                          <Link
                            href={(link as any).url}
                            target="_blank"
                            className="text-sm w-full"
                          >
                            {link.label}
                          </Link>
                        ) : (
                          <button
                            onClick={(link as any).onClick}
                            className="text-sm w-full text-left"
                          >
                            {link.label}
                          </button>
                        )}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuGroup>

                <DropdownMenuSeparator />
              </>
            )}

            <DropdownMenuGroup className="my-2">
              <DropdownMenuItem>
                <a
                  href="https://help.superbridge.app"
                  target="_blank"
                  className="text-xs leading-none w-full flex gap-2 items-center"
                >
                  <IconArrowUpRight className="h-3 w-auto fill-muted-foreground" />
                  <span>Support</span>
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button
                  className="text-xs leading-none w-full flex gap-2 items-center"
                  onClick={() => legalModal.open()}
                >
                  <IconArrowUpRight className="h-3 w-auto fill-muted-foreground" />
                  <span>{t("header.legal")}</span>
                </button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuGroup className="my-2">
              <div className="px-2 pr-6">
                <a
                  href="https://superbridge.app"
                  target="_blank"
                  className=" text-[10px] leading-none w-full flex gap-1.5 items-center"
                >
                  <StickerSB className="h-5 w-auto fill-foreground" />
                  <span>{t("tos.poweredBy")}</span>
                </a>
              </div>
            </DropdownMenuGroup>
          </>
        ) : (
          <>
            <DropdownMenuGroup className="my-2">
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                App
              </DropdownMenuLabel>
              {appLinks.map((link) => {
                return (
                  <DropdownMenuItem key={link.label}>
                    {(link as any).url ? (
                      <Link
                        href={(link as any).url}
                        target="_blank"
                        className="text-sm w-full"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <button
                        onClick={(link as any).onClick}
                        className="text-sm w-full text-left"
                      >
                        {link.label}
                      </button>
                    )}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="my-2">
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Solutions
              </DropdownMenuLabel>
              {solutionLinks.map((link) => {
                return (
                  <DropdownMenuItem key={link.label}>
                    {(link as any).url ? (
                      <Link
                        href={(link as any).url}
                        target="_blank"
                        className="text-sm w-full"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <button
                        onClick={(link as any).onClick}
                        className="text-sm w-full text-left"
                      >
                        {link.label}
                      </button>
                    )}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            <DropdownMenuGroup className="my-2">
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Support
              </DropdownMenuLabel>
              {supportLinks.map((link) => {
                return (
                  <DropdownMenuItem key={link.label}>
                    {(link as any).url ? (
                      <Link
                        href={(link as any).url}
                        target="_blank"
                        className="text-sm w-full"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <button
                        onClick={(link as any).onClick}
                        className="text-sm w-full text-left"
                      >
                        {link.label}
                      </button>
                    )}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="my-2">
              <div className="flex gap-2 p-3">
                <a href="https://x.com/superbridgeapp" target="_blank">
                  <IconX className="fill-muted-foreground w-6 h-auto hover:scale-105 transition-all" />
                </a>
                <a href="https://warpcast.com/superbridge" target="_blank">
                  <IconFarcaster className="fill-muted-foreground w-6 h-auto hover:scale-105 transition-all" />
                </a>
                <a href="https://github.com/superbridgeapp" target="_blank">
                  <IconGithub className="fill-muted-foreground w-6 h-auto hover:scale-105 transition-all" />
                </a>
              </div>
              {companyLinks.map((link) => {
                return (
                  <DropdownMenuItem key={link.label}>
                    {(link as any).url ? (
                      <Link
                        href={(link as any).url}
                        target="_blank"
                        className="text-xs w-full"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <button
                        onClick={(link as any).onClick}
                        className="text-xs w-full text-left"
                      >
                        {link.label}
                      </button>
                    )}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
