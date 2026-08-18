import React from "react";
import { Box, Text } from "@nimbus-ds/components";
import { PlanDisplayCardProps } from "./planDisplayCard.types";

const GRADIENT_BACKGROUND =
  "linear-gradient(194.55deg, var(--nimbus-colors-primary-surface) 4.18%, var(--nimbus-colors-neutral-background) 45.97%)";

const PlanDisplayCard: React.FC<PlanDisplayCardProps> = ({
  ribbonLabel,
  gradient,
  children,
  style,
  ...rest
}) => {
  const hasRibbon = Boolean(ribbonLabel);

  return (
    <Box {...rest} display="flex" flexDirection="column" height="100%">
      {/* Ribbon area: visible when `ribbonLabel` is set, an invisible placeholder of the
          same height otherwise. Rendering it on every card reserves identical top space so
          the content rows (subtitle, price, bullets) align across the grid. */}
      <div
        aria-hidden={hasRibbon ? undefined : true}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: hasRibbon
            ? "var(--nimbus-colors-primary-interactive)"
            : "transparent",
          paddingTop: "var(--nimbus-spacing-0-5)",
          paddingBottom: "var(--nimbus-spacing-2)",
          borderTopLeftRadius: "var(--nimbus-shape-border-radius-2)",
          borderTopRightRadius: "var(--nimbus-shape-border-radius-2)",
          marginBottom: "calc(var(--nimbus-spacing-2) * -1)",
        }}
      >
        <Text fontWeight="medium" color="neutral-background" textAlign="center">
          {ribbonLabel || " "}
        </Text>
      </div>
      {/* Content grows to fill the card height (cards in a row stretch to match), so footers
          anchored with `margin-top: auto` line up at the bottom. */}
      <Box
        flex="1 1 auto"
        display="flex"
        flexDirection="column"
        backgroundColor="neutral-background"
        borderRadius="2"
        overflow="hidden"
        {...(hasRibbon
          ? {
              borderColor: "primary-interactive",
              borderStyle: "solid",
              borderWidth: "2",
            }
          : { boxShadow: "2" })}
      >
        {/* Content lives in a native element because @nimbus-ds/components Box drops the
            `style` prop (it renders only sprinkle-generated styles). Routing the gradient
            background and any consumer `style` through here is the only way they take effect.
            The div fills the card as a flex column so footers still anchor with `margin-top: auto`. */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: "1 1 auto",
            padding: "var(--nimbus-spacing-4)",
            background: gradient && !hasRibbon ? GRADIENT_BACKGROUND : undefined,
            ...style,
          }}
        >
          {children}
        </div>
      </Box>
    </Box>
  );
};

export { PlanDisplayCard };
