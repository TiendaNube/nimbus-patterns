import React from "react";
import { Box, BoxProps, Text } from "@nimbus-ds/components";
import { PlanDisplayCardProps } from "./planDisplayCard.types";

const GRADIENT_BACKGROUND =
  "linear-gradient(194.55deg, var(--nimbus-colors-primary-surface) 4.18%, var(--nimbus-colors-neutral-background) 45.97%)";

// Placeholder for the ribbon label on cards that don't carry one. It must be a non-breaking
// space: a plain " " is collapsible, so it is dropped during white-space processing and the
// label's `<p>` ends up with no line box at all — leaving the card with only `pt`/`pb` of
// reserved space instead of a full ribbon's height, which is what breaks the alignment
// between ribbon and non-ribbon cards. A NBSP is not collapsible, so it always generates a
// line box of exactly the same height as a real label (same Text props below), and it draws
// no glyph, so it stays invisible on any background.
const RIBBON_HEIGHT_PLACEHOLDER = "\u00A0";

// The ribbon needs a top-only border radius and a negative bottom margin, and Box exposes
// neither (`borderRadius` is all-corners, and the spacing scale has no negative values), so
// this one wrapper stays a native element. Every other value below is a Box token prop.
const RIBBON_WRAPPER_STYLE: React.CSSProperties = {
  borderTopLeftRadius: "var(--nimbus-shape-border-radius-2)",
  borderTopRightRadius: "var(--nimbus-shape-border-radius-2)",
  marginBottom: "calc(var(--nimbus-spacing-2) * -1)",
  // Clips the ribbon's own background to the rounded corners above.
  overflow: "hidden",
};

type SurfaceTreatment = Partial<
  Pick<BoxProps, "borderColor" | "borderStyle" | "borderWidth" | "boxShadow">
>;

const getSurfaceTreatment = (
  hasRibbon: boolean,
  hasLegacyHighlight: boolean
): SurfaceTreatment => {
  if (hasRibbon) {
    return {
      borderColor: "primary-interactive",
      borderStyle: "solid",
      borderWidth: "2",
    };
  }

  if (hasLegacyHighlight) {
    return {
      borderColor: "primary-interactive",
      borderStyle: "solid",
      borderWidth: "3",
      boxShadow: "3",
    };
  }

  return { boxShadow: "2" };
};

const PlanDisplayCard: React.FC<PlanDisplayCardProps> = ({
  highlighted,
  ribbonLabel,
  gradient,
  children,
  ...rest
}) => {
  const hasRibbon = Boolean(ribbonLabel);
  const hasLegacyHighlight = Boolean(highlighted && !hasRibbon && !gradient);
  const surfaceTreatment = getSurfaceTreatment(hasRibbon, hasLegacyHighlight);

  return (
    <Box {...rest} display="flex" flexDirection="column" height="100%">
      {/* Ribbon area: visible when `ribbonLabel` is set, an invisible placeholder of the
          same height otherwise. Rendering it on every card reserves identical top space so
          the content rows (subtitle, price, bullets) align across the grid. */}
      <div style={RIBBON_WRAPPER_STYLE}>
        <Box
          aria-hidden={hasRibbon ? undefined : true}
          display="flex"
          justifyContent="center"
          alignItems="center"
          pt="0-5"
          pb="2"
          backgroundColor={hasRibbon ? "primary-interactive" : undefined}
        >
          <Text
            fontWeight="medium"
            color="neutral-background"
            textAlign="center"
          >
            {ribbonLabel || RIBBON_HEIGHT_PLACEHOLDER}
          </Text>
        </Box>
      </div>
      {/* Content grows to fill the card height (cards in a row stretch to match), so footers
          anchored with `margin-top: auto` line up at the bottom. `backgroundImage` carries the
          gradient: unlike most sprinkles it accepts an arbitrary CSS value, so the variant
          needs no inline style. */}
      <Box
        flex="1 1 auto"
        display="flex"
        flexDirection="column"
        padding="4"
        backgroundColor="neutral-background"
        backgroundImage={
          gradient && !hasRibbon ? GRADIENT_BACKGROUND : undefined
        }
        borderRadius="2"
        overflow="hidden"
        {...surfaceTreatment}
      >
        {children}
      </Box>
    </Box>
  );
};

export { PlanDisplayCard };
