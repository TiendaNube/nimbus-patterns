import React from "react";

import { Icon, Box } from "@nimbus-ds/components";
import { GenerativeStarsIcon } from "@nimbus-ds/icons";
import tokens from "@nimbus-ds/tokens/dist/js/tokens";

import { NavTabsItemProps } from "./navTabsItem.types";

const interactiveButtonProps = {
  borderColor: "transparent",
  borderRadius: "2",
  cursor: "pointer",
  as: "button",
  type: "button",
  p: "2-5",
  position: "relative",
} as const;

const Badge: React.FC = () => (
  <Box
    borderRadius="full"
    backgroundColor="primary-interactive"
    height=".25rem"
    position="absolute"
    right=".25rem"
    top=".25rem"
    width=".25rem"
  />
);

const NavTabsItem: React.FC<NavTabsItemProps> = ({
  style: _style,
  appearance = "neutral",
  icon,
  active = false,
  badge = false,
  onClick,
  ariaLabel,
  ...rest
}: NavTabsItemProps) => {
  if (appearance === "ai-generative") {
    // aiGradient stops are identical across light/dark themes (a fixed AI
    // brand accent), so no theme lookup is needed here.
    const { aiGradient } = tokens.color.light;
    const gradient = `linear-gradient(66deg, ${aiGradient["blue-high"].value} 0%, ${aiGradient["purple-high"].value} 50%, ${aiGradient["pink-high"].value} 100%)`;

    return (
      // Plain div, not Box: this wrapper is purely decorative (no `as`, no
      // a11y role) and needs an arbitrary background-image + exact padding
      // for the gradient-border effect — going through Box's CSS-in-JS
      // sprinkles for that combination produced unreproducible rendering
      // bugs. The interactive button below stays a Box.
      <div
        style={{
          display: "inline-flex",
          backgroundImage: gradient,
          // 10px = the inner button's 8px radius (borderRadius="2") + the
          // 2px padding below, so the gradient ring is concentric.
          borderRadius: "10px",
          padding: "2px",
        }}
      >
        <Box
          {...rest}
          {...interactiveButtonProps}
          style={_style}
          backgroundColor="neutral-background"
          onClick={onClick}
          aria-label={ariaLabel}
        >
          <Icon
            source={<GenerativeStarsIcon size="medium" />}
            color="ai-generative"
          />
          {badge && <Badge />}
        </Box>
      </div>
    );
  }

  return (
    <Box
      {...rest}
      {...interactiveButtonProps}
      style={_style}
      backgroundColor={active ? "primary-surface" : "transparent"}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <Icon
        source={icon}
        color={active ? "primary-interactive" : "primary-textLow"}
      />
      {badge && <Badge />}
    </Box>
  );
};

export { NavTabsItem };
