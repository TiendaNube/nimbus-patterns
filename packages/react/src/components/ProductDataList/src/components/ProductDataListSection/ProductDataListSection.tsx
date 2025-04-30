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
  <Box display="flex" flexDirection="column" gap="4"  {...props}>
    <Box display="flex" flexDirection="column" gap="4">
      <Box display="flex" flexDirection="column" gap="1">
        {title && <Text fontSize="highlight">{title}</Text>}
        {description && <Text color="neutral-textLow">{description}</Text>}
        {content}
      </Box>
      {link}
    </Box>
    {children}
  </Box>
);

export { ProductDataListSection };
