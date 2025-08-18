import React, { useMemo } from "react";
import { Box } from "@nimbus-ds/components";
import { MenuContext } from "./context/MenuContext";

import { MenuProps, MenuComponents } from "./menu.types";
import {
  MenuSection,
  MenuHeader,
  MenuBody,
  MenuFooter,
  MenuButtonContainer,
  MenuButtonAccordionContainer,
} from "./components";

const Menu: React.FC<MenuProps> & MenuComponents = ({
  className: _className,
  style: _style,
  children,
  collapse = false,
  transition = false,
  ...rest
}: MenuProps) => {
  const providerValue = useMemo(
    () => ({ collapsed: collapse, transition }),
    [collapse, transition]
  );

  return (
    <MenuContext.Provider value={providerValue}>
      <Box
        {...rest}
        display="flex"
        flexDirection="column"
        flex="0 0 auto"
        height="100%"
        backgroundColor="neutral-background"
        width="100%"
        boxSizing="border-box"
        transitionProperty={transition ? "all" : undefined}
        transitionDuration={transition ? "base" : undefined}
        transitionTimingFunction={transition ? "ease-in-out" : undefined}
      >
        {children}
      </Box>
    </MenuContext.Provider>
  );
};

Menu.Section = MenuSection;
Menu.Button = MenuButtonContainer;
Menu.ButtonAccordion = MenuButtonAccordionContainer;
Menu.Header = MenuHeader;
Menu.Body = MenuBody;
Menu.Footer = MenuFooter;

Menu.displayName = "Menu";
Menu.Section.displayName = "Menu.Section";
Menu.Header.displayName = "Menu.Header";
Menu.Body.displayName = "Menu.Body";
Menu.Footer.displayName = "Menu.Footer";

export { Menu };
