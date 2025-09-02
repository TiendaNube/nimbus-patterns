import React from "react";

import { Box } from "@nimbus-ds/components";

import { AppShellHeaderProps } from "./appShellHeader.types";

const AppShellHeader: React.FC<AppShellHeaderProps> = ({
  className: _className,
  style: _style,
  leftSlot,
  rightSlot,
  ...rest
}: AppShellHeaderProps) => (
  <Box
    padding="2"
    {...rest}
    display="flex"
    justifyContent={leftSlot ? "space-between" : "flex-end"}
    gap="2"
    position="sticky"
    top="0"
    zIndex="900"
    backgroundColor="neutral-surface"
  >
    {leftSlot}
    {rightSlot && (
      <Box display="flex" gap={{ xs: "1", md: "2" }}>
        {rightSlot}
      </Box>
    )}
  </Box>
);

export { AppShellHeader };
