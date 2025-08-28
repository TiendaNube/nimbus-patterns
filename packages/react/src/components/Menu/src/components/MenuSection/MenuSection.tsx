import React from "react";

import { Text, Box, BoxProperties } from "@nimbus-ds/components";
import { useMenuExpandContext } from "@common/contexts";

import { MenuSectionProps } from "./menuSection.types";

const MenuSection: React.FC<MenuSectionProps> = ({
  className: _className,
  style: _style,
  title,
  children,
  ...rest
}: MenuSectionProps) => {
  const { expanded } = useMenuExpandContext();

  const collapsedProps: BoxProperties = !expanded
    ? {
        maxWidth: "32px",
        pt: "2",
      }
    : {};

  return (
    <Box
      {...collapsedProps}
      {...rest}
      display="flex"
      flexDirection="column"
      gap="1-5"
    >
      {title &&
        (expanded ? (
          <Box pl="2" pt="2">
            <Text color="neutral-textDisabled" fontSize="caption">
              {title}
            </Text>
          </Box>
        ) : (
          <Box
            borderTopWidth="1"
            borderBottomWidth="none"
            borderColor="neutral-surfaceHighlight"
            borderStyle="solid"
            width="100%"
            // Margin to approximate to the same height of the Section expanded title
            marginTop="2"
            marginBottom="3"
            data-testid="menu-section--collapsed"
          />
        ))}
      {children}
    </Box>
  );
};

export { MenuSection };
