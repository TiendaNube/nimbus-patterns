import React, { useMemo } from "react";
import { ChevronRightIcon } from "@nimbus-ds/icons";
import { Box, BoxProperties, Icon } from "@nimbus-ds/components";
import { MenuButton } from "@nimbus-ds/menubutton";

import { useMenuExpandContext } from "@common/contexts";
import { useNorteUiTheme } from "@common/hooks";
import { MenuFooterProps } from "./menuFooter.types";

const MenuFooter: React.FC<MenuFooterProps> = ({
  className,
  style: _style,
  ...rest
}: MenuFooterProps) => {
  const { expanded } = useMenuExpandContext(false);
  const { isNorteUi, isNorteUiLight } = useNorteUiTheme();
  const restColor = isNorteUiLight ? "neutral-textLow" : "neutral-textHigh";
  const activeColor = rest.active ? "primary-interactive" : restColor;
  const disabledColor = rest.disabled ? "neutral-textDisabled" : activeColor;

  const dynamicProps: BoxProperties = useMemo(() => {
    if (isNorteUi) {
      return expanded ? { px: "2" } : { justifyContent: "center", px: "2" };
    }
    return expanded
      ? {
          pl: "2",
        }
      : { justifyContent: "center", pl: "1" };
  }, [expanded, isNorteUi]);

  return (
    <Box
      className={className}
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
