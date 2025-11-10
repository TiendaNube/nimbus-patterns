import React, { useMemo } from "react";
import { ChevronRightIcon } from "@nimbus-ds/icons";
import { Box, BoxProperties, Icon } from "@nimbus-ds/components";
import { MenuButton } from "@nimbus-ds/menubutton";

import { useMenuExpandContext } from "@common/contexts";
import { MenuFooterProps } from "./menuFooter.types";

const MenuFooter: React.FC<MenuFooterProps> = ({
  className: _className,
  style: _style,
  ...rest
}: MenuFooterProps) => {
  const { expanded } = useMenuExpandContext(false);
  const activeColor = rest.active ? "primary-interactive" : "neutral-textHigh";
  const disabledColor = rest.disabled ? "neutral-textDisabled" : activeColor;

  const dynamicProps: BoxProperties = useMemo(
    () =>
      expanded
        ? {
            pl: "2",
          }
        : { justifyContent: "center", pl: "1" },
    [expanded]
  );

  return (
    <Box
      boxSizing="border-box"
      display="flex"
      flex="0 1 auto"
      paddingY="3"
      width="100%"
      {...dynamicProps}
    >
      <MenuButton {...rest}>
        <Icon source={<ChevronRightIcon size={16} />} color={disabledColor} />
      </MenuButton>
    </Box>
  );
};

export { MenuFooter };
