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
    {...rest}
    padding="2"
    display="flex"
    justifyContent={leftSlot ? "space-between" : "flex-end"}
    gap="2"
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
