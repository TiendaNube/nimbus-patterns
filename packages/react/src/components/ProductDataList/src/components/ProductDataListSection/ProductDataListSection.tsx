import React from "react";
import { Box, Text } from "@nimbus-ds/components";
import { ProductDataListSectionProps } from "./ProductDataListSection.types";

const ProductDataListSection: React.FC<ProductDataListSectionProps> = ({
  title,
  description,
  content,
  link,
  children,
  ...props
}: ProductDataListSectionProps) => (
  <Box {...props}>
    <Box display="flex" flexDirection="column" gap="4">
      <Box display="flex" flexDirection="column" gap="1">
        <Text fontSize="highlight">{title}</Text>
        <Text color="neutral-textLow">{description}</Text>
        {content}
      </Box>
      {link}
    </Box>
    {children}
  </Box>
);

export { ProductDataListSection };
