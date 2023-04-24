import React, { useMemo, useState } from "react";
import { Box } from "@nimbus-ds/components";

import { MenuButtonAccordionPros } from "./menuButtonAccordion.types";
import { MenuButton } from "../../MenuButton";

const MenuButtonAccordion: React.FC<MenuButtonAccordionPros> = ({
  className: _className,
  style: _style,
  open: controlledOpen,
  active,
  menuButton,
  children,
  ...rest
}) => {
  const [isOpen, setOpen] = useState(false);
  const handleOpen = () => setOpen((prevState) => !prevState);

  const open = useMemo(
    () => (controlledOpen === undefined ? isOpen : controlledOpen),
    [controlledOpen, isOpen]
  );

  const getBackgroundColor = () => {
    if (active) {
      return "primary-surface";
    }
    return open ? "neutral-surface" : "transparent";
  };

  return (
    <Box
      {...rest}
      backgroundColor={getBackgroundColor()}
      borderRadius=".5rem"
      zIndex={open ? 1 : 0}
    >
      <MenuButton
        {...menuButton}
        onClick={controlledOpen !== undefined ? menuButton.onClick : handleOpen}
        active={active}
        aria-expanded={open}
      />
      {open && (
        <Box
          id="content-1"
          aria-hidden={!open}
          height={open ? "auto" : "0"}
          overflow="hidden"
          pl="6"
          pt="1"
          pb="1"
          pr="1"
        >
          {children}
        </Box>
      )}
    </Box>
  );
};

MenuButtonAccordion.displayName = "MenuButtonAccordion";

export { MenuButtonAccordion };
