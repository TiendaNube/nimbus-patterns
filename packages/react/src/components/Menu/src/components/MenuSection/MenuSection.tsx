import React from "react";

import { Text, Box } from "@nimbus-ds/components";

import { MenuSectionProps } from "./menuSection.types";

const MenuSection: React.FC<MenuSectionProps> = ({
  className: _className,
  style: _style,
  title,
  children,
  ...rest
}: MenuSectionProps) => (
  <Box {...rest} display="flex" flexDirection="column" gap="1-5">
    {title && (
      <Box pl="2" pt="2">
        <Text color="neutral-textDisabled" fontSize="caption">
          {title}
        </Text>
      </Box>
    )}
    {children}
  </Box>
);

export { MenuSection };
