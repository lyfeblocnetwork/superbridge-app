import NextHead from "next/head";
import { useRouter } from "next/router";
import { useMemo } from "react";

import { ThemeDto } from "@/codegen/model";
import {
  defaultBodyFont,
  defaultButtonFont,
  defaultHeadingFont,
} from "@/config/fonts";
import { useTheme } from "@/hooks/use-theme";

export const SuperbridgeHead = ({
  title,
  description,
  og,
  icon,

  headingFont,
  buttonFont,
  bodyFont,
}: {
  title: string;
  description: string;
  og: string;
  icon: string;

  headingFont?: string;
  buttonFont?: string;
  bodyFont?: string;
}) => {
  const theme = useTheme();
  const router = useRouter();

  const fonts = `
@font-face {
  font-family: sb-heading;
  src: url(${headingFont || defaultHeadingFont});
}
@font-face {
  font-family: sb-button;
  src: url(${buttonFont || defaultButtonFont});
}
@font-face {
  font-family: sb-body;
  src: url(${bodyFont || defaultBodyFont});
}`;

  const themeWithQueryParams = useMemo(() => {
    let t = theme || {};
    if (router.query.theme) {
      try {
        const parsed: Partial<ThemeDto> = JSON.parse(
          router.query.theme as string
        );
        t = {
          ...t,
          ...parsed,
        };
      } catch {}
    }
    return t;
  }, [theme]);

  return (
    <NextHead>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta property="og:title" content={title} />
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`https://superbridge.app`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:image" content={og} />
      <meta name="twitter:image" content={og} />
      <meta name="twitter:creator" content="@superbridgeapp" />
      <meta name="twitter:site" content="@superbridgeapp" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      <link rel="shortcut icon" href={icon} />
      <link rel="icon" href={icon} />
      <link rel="apple-touch-icon" href={icon} />
      <link rel="apple-touch-icon-precomposed" href={icon} />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"
      />
      <link
        rel="preload"
        href={headingFont || defaultHeadingFont}
        as="font"
        crossOrigin=""
      />
      <link
        rel="preload"
        href={buttonFont || defaultButtonFont}
        as="font"
        crossOrigin=""
      />
      <link
        rel="preload"
        href={bodyFont || defaultBodyFont}
        as="font"
        crossOrigin=""
      />
      <style>{fonts}</style>

      <style>
        {Object.entries(themeWithQueryParams)
          .map(([key, value]) => {
            if (
              !value ||
              key.includes("font") ||
              key.includes("image") ||
              key.includes("radius")
            ) {
              return "";
            }

            let formattedKey = `--${key}`;
            if (!key.includes("dark")) {
              formattedKey = `${formattedKey}-light`;
            }

            return `:root { --${key}: ${value}; }`;
          })
          .join("\n")}
      </style>
    </NextHead>
  );
};
