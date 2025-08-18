import React from "react";

import { Text, Box } from "@nimbus-ds/components";
import { useMenuContext } from "../../context/MenuContext";

import { MenuSectionProps } from "./menuSection.types";

const MenuSection: React.FC<MenuSectionProps> = ({
  className: _className,
  style: _style,
  title,
  children,
  ...rest
}: MenuSectionProps) => {
  const { collapsed } = useMenuContext();

  return (
    <Box
      {...rest}
      display="flex"
      flexDirection="column"
      gap="1-5"
      alignItems={collapsed ? "center" : "flex-start"}
    >
      {title &&
        (collapsed ? (
          <Box
            borderTopWidth="1"
            borderBottomWidth="none"
            borderColor="neutral-surfaceHighlight"
            borderStyle="solid"
            width="100%"
          />
        ) : (
          <Box>
            <Text color="neutral-textDisabled" fontSize="caption">
              {title}
            </Text>
          </Box>
        ))}
      {children}
    </Box>
  );
};

export { MenuSection };
