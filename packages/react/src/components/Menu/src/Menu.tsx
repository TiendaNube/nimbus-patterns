import React, { useMemo, useState } from "react";
import { Box, BoxProps } from "@nimbus-ds/components";
import { MenuExpandContext } from "@common/contexts";

import { MenuButton } from "@nimbus-ds/menubutton";
import { MenuProps, MenuComponents } from "./menu.types";
import { MenuSection, MenuHeader, MenuBody, MenuFooter } from "./components";

const Menu: React.FC<MenuProps> & MenuComponents = ({
  className: _className,
  style: _style,
  children,
  expanded = true,
  showPopoversWhenCollapsed = true,
  popoverPosition = "right",
  ...rest
}: MenuProps) => {
  const [activeAccordionPopover, setActiveAccordionPopover] = useState<
    string | null
  >(null);

  const providerValue = useMemo(
    () => ({
      expanded,
      showPopoversWhenCollapsed,
      popoverPosition,
      activeAccordionPopover,
      setActiveAccordionPopover,
    }),
    [
      expanded,
      showPopoversWhenCollapsed,
      popoverPosition,
      activeAccordionPopover,
    ]
  );

  const dynamicProps: BoxProps = useMemo(
    () =>
      expanded
        ? {
            width: "100%",
          }
        : {
            width: "unset",
          },
    [expanded]
  );

  return (
    <MenuExpandContext.Provider value={providerValue}>
      <Box
        {...rest}
        display="flex"
        flexDirection="column"
        height="100%"
        backgroundColor="neutral-background"
        boxSizing="border-box"
        {...dynamicProps}
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
