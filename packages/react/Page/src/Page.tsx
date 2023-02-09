import React from "react";

import { Box } from "@nimbus-ds/box";

import { PageComponents, PageProps } from "./page.types";
import { PageBody, PageHeader } from "./components";

const Page: React.FC<PageProps> & PageComponents = ({
  className: _className,
  style: _style,
  children,
  maxWidth = "1200px",
  ...rest
}: PageProps) => (
  <Box as="main" {...rest} maxWidth={maxWidth} marginX="auto">
    {children}
  </Box>
);

Page.Header = PageHeader;
Page.Body = PageBody;
Page.displayName = "Page";

export { Page };
