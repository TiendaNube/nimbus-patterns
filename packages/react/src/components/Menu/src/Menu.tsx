import React, { useMemo } from "react";
import { Box } from "@nimbus-ds/components";
import { MenuExpandContext } from "@common/contexts";

import { MenuButton } from "@nimbus-ds/menubutton";
import { MenuProps, MenuComponents } from "./menu.types";
import { MenuSection, MenuHeader, MenuBody, MenuFooter } from "./components";

const Menu: React.FC<MenuProps> & MenuComponents = ({
  className: _className,
  style: _style,
  children,
  expanded: expandedProp = true,
  ...rest
}: MenuProps) => {
  const providerValue = useMemo(
    () => ({ expanded: expandedProp }),
    [expandedProp]
  );

  return (
    <MenuExpandContext.Provider value={providerValue}>
      <Box
        {...rest}
        display="flex"
        flexDirection="column"
        height="100%"
        backgroundColor="neutral-background"
        width={expandedProp ? "100%" : "unset"}
        boxSizing="border-box"
      >
        {children}
      </Box>
    </MenuExpandContext.Provider>
  );
};

Menu.Section = MenuSection;
Menu.Button = MenuButton;
Menu.ButtonAccordion = MenuButton?.Accordion;
Menu.Header = MenuHeader;
Menu.Body = MenuBody;
Menu.Footer = MenuFooter;

Menu.displayName = "Menu";
Menu.Section.displayName = "Menu.Section";
Menu.Header.displayName = "Menu.Header";
Menu.Body.displayName = "Menu.Body";
Menu.Footer.displayName = "Menu.Footer";

export { Menu };
