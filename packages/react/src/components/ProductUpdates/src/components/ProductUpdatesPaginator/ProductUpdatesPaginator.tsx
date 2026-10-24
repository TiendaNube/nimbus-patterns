import React from "react";

import { Box } from "@nimbus-ds/components";

import { ProductUpdatesPaginatorProps } from "./productUpdatesPaginator.types";

// Box ignores `style` and its background tokens do not include `neutral-interactiveHover`,
// so the neutral inactive dots are native elements using the CSS variables of the Nimbus tokens.
// The colour goes through a custom property, as Box does with its own background tokens.
const NEUTRAL_INACTIVE_DOT_STYLE = {
  width: "6px",
  height: "6px",
  borderRadius: "var(--nimbus-shape-border-radius-full)",
  "--paginator-dot-background": "var(--nimbus-colors-neutral-interactiveHover)",
  backgroundColor: "var(--paginator-dot-background)"
} as React.CSSProperties;

const ProductUpdatesPaginator: React.FC<ProductUpdatesPaginatorProps> = ({
  totalItems,
  activeIndex,
  appearance = "primary",
  ...rest
}: ProductUpdatesPaginatorProps) => {
  const isNeutral = appearance === "neutral";
  const activeColor = isNeutral ? "primary-interactive" : "neutral-background";

  return (
    <Box
      display="flex"
      flexDirection="row"
      gap="1-5"
      alignItems="center"
      role="img"
      aria-label={`Step ${activeIndex + 1} of ${totalItems}`}
      {...rest}
    >
      {Array.from({ length: totalItems }, (_, index) => index).map((index) => {
        const isActive = index === activeIndex;
        if (isNeutral && !isActive) {
          return (
            <div
              key={`paginator-dot-${index}`}
              style={NEUTRAL_INACTIVE_DOT_STYLE}
              aria-hidden="true"
            />
          );
        }
        return (
          <Box
            key={`paginator-dot-${index}`}
            width={isActive ? "24px" : "6px"}
            height="6px"
            borderRadius="full"
            backgroundColor={isActive ? activeColor : "primary-textLow"}
            aria-hidden="true"
          />
        );
      })}
    </Box>
  );
};

export { ProductUpdatesPaginator };
