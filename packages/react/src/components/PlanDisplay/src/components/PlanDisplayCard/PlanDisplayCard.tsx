import React from "react";
import { Box, Text } from "@nimbus-ds/components";
import { PlanDisplayCardProps } from "./planDisplayCard.types";

// Fixed Plans 2.0 gradient (decision 11): consumers select it with the
// boolean `gradient` prop, they cannot supply their own gradient value.
const gradientBackground =
  "linear-gradient(194.55deg, var(--nimbus-colors-primary-surface) 4.18%, var(--nimbus-colors-neutral-background) 45.97%)";

// Issue #185 validation amendment — "Card structure, divider, and bullet
// typography refinements": the ribbon-reservation region and the card-body
// surface are two structurally distinct blocks, not one shared, clipped
// wrapper. They connect visually only through this shared top-corner radius
// token and a negative spacing-2 overlap, never by clipping both into a
// single surface — that approach would make the reserved (empty) ribbon
// area on a non-ribbon card show through as padding inside the default card
// body. `Box` has no per-corner border-radius prop and — like `Text` —
// silently drops a raw `style` prop rather than forwarding it to the
// rendered element, so this geometry is applied on plain native wrapper
// `div`s that carry no visual role of their own; every token-driven property
// (padding, color, shadow, border, radius) stays on the inner `Box`
// elements that carry the stable `data-testid`s used by tests below.
// Exported (test-only; not re-exported from this directory's `index.ts`,
// so the `PlanDisplay` public surface is unaffected) so unit tests can
// assert the exact token wiring directly: jsdom's CSS parser does not
// evaluate `calc()` for margin properties, so the negative overlap does not
// come through on a rendered element's `style` attribute under jsdom even
// though it is valid, correctly-applied CSS in a real browser.
export const ribbonRadiusToken = "var(--nimbus-shape-border-radius-2)";
export const bodySurfaceOverlap = "calc(var(--nimbus-spacing-2) * -1)";

const PlanDisplayCard: React.FC<PlanDisplayCardProps> = ({
  ribbonLabel,
  gradient,
  children,
  ...rest
}) => {
  const hasRibbon = Boolean(ribbonLabel);

  // ribbonLabel takes precedence: when present, the gradient is fully
  // suppressed — not layered underneath the ribbon (validation amendment,
  // AC-02).
  const showGradient = Boolean(gradient) && !hasRibbon;

  return (
    <Box display="flex" flexDirection="column" height="100%" {...rest}>
      {/*
        Ribbon-reservation region: always rendered, before the card-body
        surface, and outside it — every card reserves this same full-width
        area, including cards without a ribbonLabel, so comparable cards in
        a comparison stay aligned (AC-07). The outer div supplies only the
        top-corner radius token and clips the inner Box's background to that
        rounded shape; every token-driven prop (padding, background, text)
        lives on the inner Box, which keeps the stable data-testid.
      */}
      <div
        style={{
          borderTopLeftRadius: ribbonRadiusToken,
          borderTopRightRadius: ribbonRadiusToken,
          overflow: "hidden",
        }}
      >
        <Box
          data-testid="plan-display-card-ribbon"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
          pt="0-5"
          pb="2"
          backgroundColor={hasRibbon ? "primary-interactive" : undefined}
        >
          <Text
            as="span"
            fontWeight="bold"
            fontSize="caption"
            textAlign="center"
            color="neutral-background"
            aria-hidden={hasRibbon ? undefined : true}
            style={hasRibbon ? undefined : { visibility: "hidden" }}
          >
            {ribbonLabel ?? " "}
          </Text>
        </Box>
      </div>

      {/*
        Card-body surface: a distinct lower block with its own radius,
        border, and shadow — never nested inside the ribbon-reservation
        region above. The negative spacing-2 margin on the wrapping div
        pulls it up under the ribbon's bottom padding so the two read as one
        continuous shape, without clipping them into a shared surface.
      */}
      <div style={{ marginTop: bodySurfaceOverlap }}>
        <Box
          data-testid="plan-display-card-surface"
          display="flex"
          flexDirection="column"
          flex="1"
          padding="4"
          borderRadius="2"
          boxShadow={hasRibbon ? undefined : "2"}
          borderWidth={hasRibbon ? "2" : undefined}
          borderStyle={hasRibbon ? "solid" : undefined}
          borderColor={hasRibbon ? "primary-interactive" : undefined}
          backgroundColor={showGradient ? undefined : "neutral-background"}
          backgroundImage={showGradient ? gradientBackground : undefined}
        >
          {children}
        </Box>
      </div>
    </Box>
  );
};

export { PlanDisplayCard };
