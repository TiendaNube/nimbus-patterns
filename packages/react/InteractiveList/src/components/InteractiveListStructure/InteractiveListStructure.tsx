import React from "react";

import { InteractiveListStructureProps } from "./interactiveListStructure.types";

import { Box, Text } from "@nimbus-ds/components";

const InteractiveListStructure: React.FC<InteractiveListStructureProps> = ({
  className: _className,
  style: _style,
  title,
  showTitle = true,
  description,
  children,
  ...rest
}: InteractiveListStructureProps) => (
  <Box
    className={_className}
    style={_style}
    display="flex"
    flexDirection="column"
    gap="1"
    width="100%"
    flex="1 1 auto"
    {...rest}
  >
    {showTitle && <Text color="neutral-textHigh">{title}</Text>}
    {description && (
      <Text fontSize="caption" color="neutral-textLow">
        {description}
      </Text>
    )}
    {children}
  </Box>
);

export { InteractiveListStructure };
