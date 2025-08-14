import React from "react";
import { ChevronRightIcon } from "@nimbus-ds/icons";
import { Box, Icon } from "@nimbus-ds/components";
import { MenuButton } from "@nimbus-ds/menubutton";

import { MenuFooterProps } from "./menuFooter.types";
import { useMenuContext } from "../../context/MenuContext";

const MenuFooter: React.FC<MenuFooterProps> = ({
  className: _className,
  style: _style,
  ...rest
}: MenuFooterProps) => {
  const { collapsed } = useMenuContext();
  const activeColor = rest.active ? "primary-interactive" : "neutral-textHigh";
  const disabledColor = rest.disabled ? "neutral-textDisabled" : activeColor;

  return (
    <Box
      boxSizing="border-box"
      display="flex"
      flex="0 1 auto"
      paddingX="2"
      paddingY="3"
      width="100%"
    >
      <MenuButton collapsed={collapsed} {...rest}>
        <Icon source={<ChevronRightIcon size={16} />} color={disabledColor} />
      </MenuButton>
    </Box>
  );
};

export { MenuFooter };
