import React from "react";

import { Box } from "@nimbus-ds/components";

import { NavTabsProps, NavTabsComponents } from "./navTabs.types";

import { NavTabsItem } from "./components";

const NavTabs: React.FC<NavTabsProps> & NavTabsComponents = ({
  className: _className,
  style: _style,
  children,
  ...rest
}: NavTabsProps) => (
  <Box
    {...rest}
    className={_className}
    style={_style}
    alignItems="center"
    backgroundColor="neutral-background"
    borderStyle="solid"
    borderWidth="none"
    borderTopWidth="1"
    borderColor="neutral-surfaceHighlight"
    bottom="0"
    display="flex"
    justifyContent="space-between"
    left="0"
    position="fixed"
    px="4"
    py="2"
    width="100%"
    zIndex="500"
  >
    {children}
  </Box>
);

NavTabs.Item = NavTabsItem;

NavTabs.displayName = "NavTabs";
NavTabs.Item.displayName = "NavTabs.Item";

export { NavTabs };
