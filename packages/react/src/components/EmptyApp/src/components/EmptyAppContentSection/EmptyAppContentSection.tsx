import React from "react";

import { Box, Title, Text } from "@nimbus-ds/components";

import { EmptyAppContentSectionProps } from "./emptyAppContentSection.types";

const EmptyAppContentSection: React.FC<EmptyAppContentSectionProps> = ({
  title,
  subtitle,
  actions,
  children,
  ...rest
}: EmptyAppContentSectionProps) => (
  <Box
    display="flex"
    flexDirection="column"
    px="4"
    py="12"
    gap="10"
    alignItems="center"
    maxWidth="1200px"
    mx="auto"
    {...rest}
  >
    <Box display="flex" flexDirection="column" gap="4" alignItems="center">
      <Box display="flex" flexDirection="column" gap="2" alignItems="center">
        <Title as="h2" textAlign="center">
          {title}
        </Title>
        {subtitle && (
          <Text fontSize="highlight" textAlign="center">
            {subtitle}
          </Text>
        )}
      </Box>
      {actions && (
        <Box display="flex" gap="2" alignItems="center">
          {actions}
        </Box>
      )}
    </Box>
    {children}
  </Box>
);

export { EmptyAppContentSection };
