import React from "react";

import { Box, Title, Text } from "@nimbus-ds/components";

import { PageHeaderProps } from "./pageHeader.types";

const PageHeader: React.FC<PageHeaderProps> = ({
  className: _className,
  style: _style,
  title,
  subtitle,
  buttonStack,
  children,
  ...rest
}: PageHeaderProps) => (
  <Box
    as="header"
    paddingY="4"
    paddingX="6"
    display="flex"
    flexDirection="column"
    gap="4"
    {...rest}
  >
    <Box display="flex" alignItems="center" gap="2">
      <Box display="inline-flex" flex="1">
        <Title as="h1">{title}</Title>
      </Box>
      {buttonStack}
    </Box>
    {subtitle && (
      <Text color="neutral-textHigh" fontSize="base">
        {subtitle}
      </Text>
    )}
    {children}
  </Box>
);

export { PageHeader };
