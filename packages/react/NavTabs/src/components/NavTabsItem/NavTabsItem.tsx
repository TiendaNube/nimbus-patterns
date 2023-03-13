import React from "react";

import { Icon, Box } from "@nimbus-ds/components";

import { NavTabsItemProps } from "./navTabsItem.types";

const NavTabsItem: React.FC<NavTabsItemProps> = ({
  className: _className,
  style: _style,
  icon,
  active = false,
  badge = false,
  onClick,
  ...rest
}: NavTabsItemProps) => (
  <Box
    {...rest}
    className={_className}
    style={_style}
    backgroundColor={active ? "primary.surface" : "transparent"}
    borderColor="transparent"
    borderRadius=".5rem"
    cursor="pointer"
    as="button"
    type="button"
    p="2,5"
    position="relative"
    onClick={onClick}
  >
    <Icon
      source={icon}
      color={active ? "primary.interactive" : "primary.textLow"}
    />
    {badge && (
      <Box
        borderRadius="100%"
        backgroundColor="primary.interactive"
        height=".25rem"
        position="absolute"
        right=".25rem"
        top=".25rem"
        width=".25rem"
      />
    )}
  </Box>
);

export { NavTabsItem };
