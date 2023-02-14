import React from "react";

import { Box } from "@nimbus-ds/box";

import { LayoutSection } from "./components";

import { LayoutProps, LayoutComponents } from "./layout.types";

import { colQuantity } from "./layout.definitions";

const Layout: React.FC<LayoutProps> & LayoutComponents = ({
  className: _className,
  style: _style,
  children,
  columns = "1",
  ...rest
}: LayoutProps) => (
  <Box
    {...rest}
    boxSizing="border-box"
    display="grid"
    gridTemplateColumns={{
      xs: "1fr",
      md: colQuantity[columns]
    }}
    gridGap={rest.gap || "4"}
  >
    {children}
  </Box>
);

Layout.Section = LayoutSection;
Layout.displayName = "Layout";

export { Layout };
