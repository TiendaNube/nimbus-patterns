import React from "react";

import { ChevronRightIcon } from "@nimbus-ds/icons";
import { Box, Icon } from "@nimbus-ds/components";
import { MenuButton } from "@nimbus-ds/menubutton";

import { MenuFooterProps } from "./menuFooter.types";

const MenuFooter: React.FC<MenuFooterProps> = ({
  className: _className,
  style: _style,
  ...rest
}: MenuFooterProps) => {
  const activeColor = rest.active ? "primary-interactive" : "primary-textHigh";
  const disabledColor = rest.disabled ? "neutral-textDisabled" : activeColor;

  return (
    <Box
      boxSizing="border-box"
      display="flex"
      flex="0 1 auto"
      paddingX="2"
      paddingY="4"
      width="100%"
    >
      <MenuButton {...rest}>
        <Icon source={<ChevronRightIcon />} color={disabledColor} />
      </MenuButton>
    </Box>
  );
};

export { MenuFooter };
