import React from "react";

import { Text, Icon, Box } from "@nimbus-ds/components";

import { MenuButtonProps } from "./menuButton.types";

const MenuButton: React.FC<MenuButtonProps> = ({
  className: _className,
  style: _style,
  label,
  onClick,
  startIcon: IconSrc,
  children,
  active = false,
  ...rest
}: MenuButtonProps) => {
  const activeColor = active ? "primary.interactive" : "primary.textHigh";
  const disabledColor = rest.disabled ? "neutral.textDisabled" : activeColor;

  return (
    <Box
      {...rest}
      as="button"
      type="button"
      onClick={onClick}
      alignItems="center"
      backgroundColor={{
        xs: active ? "primary.surface" : "transparent",
        hover: "primary.surface",
        active: "primary.surfaceHighlight",
        disabled: "neutral.surfaceDisabled",
      }}
      boxShadow={{
        focus: "focusRing",
      }}
      borderRadius=".5rem"
      borderWidth="0"
      cursor={{
        xs: "pointer",
        disabled: "not-allowed",
      }}
      display="flex"
      gap="2"
      padding="2"
      width="100%"
      transitionProperty="all"
      transitionDuration="base"
      transitionTimingFunction="ease-in-out"
    >
      {IconSrc && <Icon color={disabledColor} source={<IconSrc />} />}
      <Box display="inline-flex" flex="1">
        <Text fontSize="base" color={disabledColor}>
          {label}
        </Text>
      </Box>
      {children}
    </Box>
  );
};

MenuButton.displayName = "MenuButton";

export { MenuButton };
