import React, { useMemo } from "react";
import { Box, BoxProperties } from "@nimbus-ds/components";
import { useMenuExpandContext } from "@common/contexts";
import { useNorteUiTheme } from "@common/hooks";

import { MenuBodyProps } from "./menuBody.types";

const MenuBody: React.FC<MenuBodyProps> = ({
  style: _style,
  children,
  ...rest
}: MenuBodyProps) => {
  const { expanded } = useMenuExpandContext(false);
  const { isNorteUi } = useNorteUiTheme();

  const dynamicProps: BoxProperties = useMemo(() => {
    if (expanded) {
      return {
        pb: "4",
        px: "2",
      };
    }
    if (isNorteUi) {
      return {
        alignItems: "center",
        px: "2",
        pb: "4",
      };
    }
    return {
      alignItems: "center",
      pl: "1",
    };
  }, [expanded, isNorteUi]);

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
