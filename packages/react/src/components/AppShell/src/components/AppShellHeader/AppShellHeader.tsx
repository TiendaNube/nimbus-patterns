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
    backgroundColor="neutral-surface"
    gap="2"
    {...rest}
    display="flex"
    justifyContent={leftSlot ? "space-between" : "flex-end"}
    position="sticky"
    top="0"
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
