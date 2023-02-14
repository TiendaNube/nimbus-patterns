import React from "react";

import { Box } from "@nimbus-ds/box";

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

LayoutSection.displayName = "Layout.Section";

export { LayoutSection };
