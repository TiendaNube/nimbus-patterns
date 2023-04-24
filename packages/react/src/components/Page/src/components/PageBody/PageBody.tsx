import React from "react";

import { Box } from "@nimbus-ds/components";

import { PageBodyProps } from "./pageBody.types";

const PageBody: React.FC<PageBodyProps> = ({
  className: _className,
  style: _style,
  children,
  ...rest
}: PageBodyProps) => (
  <Box as="section" paddingY="4" paddingX="6" {...rest}>
    {children}
  </Box>
);

export { PageBody };
