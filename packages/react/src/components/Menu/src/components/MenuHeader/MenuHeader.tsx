import React, { useMemo } from "react";

import { Box, BoxProperties } from "@nimbus-ds/components";
import { useMenuExpandContext } from "@common/contexts";

import { MenuHeaderProps } from "./menuHeader.types";

const MenuHeader: React.FC<MenuHeaderProps> = ({
  className: _className,
  style: _style,
  children,
  ...rest
}: MenuHeaderProps) => {
  const { expanded } = useMenuExpandContext();

  const dynamicProps: BoxProperties = useMemo(
    () =>
      !expanded
        ? {
            justifyContent: "center",
            paddingX: "3",
            paddingY: "4",
          }
        : {
            padding: "4",
          },
    [expanded]
  );

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
