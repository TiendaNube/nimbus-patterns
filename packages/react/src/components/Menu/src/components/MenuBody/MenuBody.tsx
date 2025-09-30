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
      !expanded
        ? {
            alignItems: "center",
          }
        : {
            pb: "4",
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
      paddingX="2"
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
