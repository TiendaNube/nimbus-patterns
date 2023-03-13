import React from "react";

import { Box } from "@nimbus-ds/components";

import { LayoutSectionProps } from "./layoutSection.types";

const LayoutSection: React.FC<LayoutSectionProps> = ({
  className: _className,
  style: _style,
  children,
  ...rest
}: LayoutSectionProps) => (
  <Box
    {...rest}
    boxSizing="border-box"
    display="flex"
    flexDirection="column"
    gap={rest.gap || "4"}
  >
    {children}
  </Box>
);

export { LayoutSection };
