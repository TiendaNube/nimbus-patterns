import React, {
  ComponentPropsWithRef,
  forwardRef,
  useMemo,
  useState,
} from "react";
import { Box } from "@nimbus-ds/components";
import { PolymorphicForwardRefComponent } from "@nimbus-ds/typings";

import { MenuButtonAccordionBaseProps } from "./menuButtonAccordion.types";
import { MenuButton } from "../../MenuButton";

const MenuButtonAccordion = forwardRef(
  (
    {
      className: _className,
      style: _style,
      open: controlledOpen,
      active,
      menuButton,
      children,
      as,
      ...rest
    }: MenuButtonAccordionBaseProps & { as: any },
    ref
  ) => {
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
        ref={ref}
        as={as}
        backgroundColor={getBackgroundColor()}
        borderRadius=".5rem"
        zIndex={open ? 1 : 0}
        textDecoration="none"
      >
        <MenuButton
          {...menuButton}
          onClick={
            controlledOpen !== undefined ? menuButton.onClick : handleOpen
          }
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
  }
) as PolymorphicForwardRefComponent<
  "button" | "a",
  MenuButtonAccordionBaseProps
>;

MenuButtonAccordion.displayName = "MenuButtonAccordion";
export type MenuButtonAccordionProps = ComponentPropsWithRef<
  typeof MenuButtonAccordion
>;

export { MenuButtonAccordion };
