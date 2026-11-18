import React, { useMemo } from "react";

import { Box, BoxProperties } from "@nimbus-ds/components";
import { useMenuExpandContext } from "@common/contexts";
import { useIsNorteUiTheme } from "../../hooks";

import { MenuHeaderProps } from "./menuHeader.types";

const MenuHeader: React.FC<MenuHeaderProps> = ({
  style: _style,
  children,
  ...rest
}: MenuHeaderProps) => {
  const { expanded } = useMenuExpandContext(false);
  const isNorteUi = useIsNorteUiTheme();

  const dynamicProps: BoxProperties = useMemo(() => {
    if (expanded) return { padding: "4" };
    return isNorteUi
      ? { justifyContent: "center", paddingX: "2", paddingY: "4" }
      : { justifyContent: "center", pl: "1", paddingY: "4" };
  }, [expanded, isNorteUi]);

  return (
    <Box
      {...rest}
      boxSizing="border-box"
      display="flex"
      flex="0 1 auto"
      width="100%"
      overflow="hidden"
      {...dynamicProps}
    >
      {children}
    </Box>
  );
};

export { MenuHeader };
