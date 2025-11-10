import React, { useMemo } from "react";
import { Box, BoxProperties } from "@nimbus-ds/components";
import { useMenuExpandContext } from "@common/contexts";

import { MenuBodyProps } from "./menuBody.types";

const MenuBody: React.FC<MenuBodyProps> = ({
  className: _className,
  style: _style,
  children,
  ...rest
}: MenuBodyProps) => {
  const { expanded } = useMenuExpandContext(false);

  const dynamicProps: BoxProperties = useMemo(
    () =>
      expanded
        ? {
            pb: "4",
            px: "2",
          }
        : {
            alignItems: "center",
            pl: "1",
          },
    [expanded]
  );

  return (
    <Box
      {...rest}
      display="flex"
      flexDirection="column"
      flex="1 1 auto"
      gap="2"
      width="100%"
      overflowY="auto"
      overflowX="hidden"
      boxSizing="border-box"
      {...dynamicProps}
    >
      {children}
    </Box>
  );
};

export { MenuBody };
