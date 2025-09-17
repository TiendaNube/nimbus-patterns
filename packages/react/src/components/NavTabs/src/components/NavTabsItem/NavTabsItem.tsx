import React from "react";

import {
  Icon,
  Box,
  BoxProperties,
  IconProperties,
} from "@nimbus-ds/components";

import { NavTabsItemProps } from "./navTabsItem.types";

interface NavTabsItemAppearance {
  container: BoxProperties;
  icon: Partial<IconProperties>;
}

const NavTabsItem: React.FC<NavTabsItemProps> = ({
  className: _className,
  style: _style,
  icon,
  active = false,
  badge = false,
  onClick,
  ariaLabel,
  appearance = "default",
  ...rest
}: NavTabsItemProps) => {
  const defaultAppearance: NavTabsItemAppearance = {
    container: {
      backgroundColor: active ? "primary-surface" : "transparent",
      borderColor: "transparent",
    },
    icon: {
      color: active ? "primary-interactive" : "primary-textLow",
    },
  };

  const aiGenerativeAppearance: NavTabsItemAppearance = {
    container: {
      borderColor: "transparent",
      background: "ai-generative-interactive-border",
      borderWidth: "1",
      borderStyle: "solid",
    },
    icon: {
      color: "ai-generative",
    },
  };

  return (
    <Box
      {...rest}
      className={_className}
      style={_style}
      {...(appearance === "default"
        ? defaultAppearance.container
        : aiGenerativeAppearance.container)}
      as="button"
      borderWidth="1"
      borderStyle="solid"
      borderRadius="2"
      cursor="pointer"
      type="button"
      p="2-5"
      position="relative"
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <Icon
        source={icon}
        {...(appearance === "default"
          ? defaultAppearance.icon
          : aiGenerativeAppearance.icon)}
      />
      {badge && (
        <Box
          borderRadius="full"
          backgroundColor="primary-interactive"
          height=".25rem"
          position="absolute"
          right=".25rem"
          top=".25rem"
          width=".25rem"
        />
      )}
    </Box>
  );
};

export { NavTabsItem };
