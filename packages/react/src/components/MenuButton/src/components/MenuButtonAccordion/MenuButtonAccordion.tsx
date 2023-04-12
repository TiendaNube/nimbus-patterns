import React, { useState } from "react";
import { Box } from "@nimbus-ds/components";

import { MenuButtonAccordionPros } from "./menuButtonAccordion.types";
import { MenuButton } from "../../MenuButton";

const MenuButtonAccordion: React.FC<MenuButtonAccordionPros> = ({
  className: _className,
  style: _style,
  controlled = false,
  menuButton,
  children,
  ...rest
}) => {
  const [open, setOpen] = useState(controlled ?? false);
  const handleOpen = () => setOpen((prevState) => !prevState);
  return (
    <Box
      {...rest}
      backgroundColor={open ? "primary-surface" : "neutral-background"}
      borderRadius=".5rem"
    >
      <MenuButton
        {...menuButton}
        onClick={controlled ? menuButton.onClick : handleOpen}
        active={open}
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
