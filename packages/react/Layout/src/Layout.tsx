import React from "react";

import { Box } from "@nimbus-ds/box";

import { LayoutSection } from "./components";

import { LayoutProps, LayoutComponents } from "./layout.types";

const Layout: React.FC<LayoutProps> & LayoutComponents = ({
  className: _className,
  style: _style,
  children,
  columns = "1",
  ...rest
}: LayoutProps) => {
  const layoutType = (columns: string) => {
    if (columns === "1") return "1fr";
    if (columns === "2 - asymmetric") return "2fr 1fr";
    if (columns === "2 - symmetric") return "1fr 1fr";
    if (columns === "3") return "1fr 1fr 1fr";
  };

  return (
    <Box
      {...rest}
      boxSizing="border-box"
      display="grid"
      gridTemplateColumns={{
        xs: "1fr",
        md: layoutType(columns)
      }}
      gridGap={rest.gap || "4"}
    >
      {children}
    </Box>
  );
};

Layout.Section = LayoutSection;
Layout.displayName = "Layout";

export { Layout };
