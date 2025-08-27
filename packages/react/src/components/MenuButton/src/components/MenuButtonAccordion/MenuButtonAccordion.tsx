import React, {
  ComponentPropsWithRef,
  forwardRef,
  useMemo,
  useState,
} from "react";
import { Box } from "@nimbus-ds/components";
import { PolymorphicForwardRefComponent } from "@nimbus-ds/typings";

import { useMenuExpandContext } from "@common/contexts";
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
      expanded: expandedProp,
      ...rest
    }: MenuButtonAccordionBaseProps & { as: any },
    ref
  ) => {
    const { expanded: contextExpanded } = useMenuExpandContext(false);
    const expanded = expandedProp ?? contextExpanded;

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
        borderRadius="2"
        zIndex={open ? "100" : undefined}
        textDecoration="none"
        alignSelf={expanded ? "stretch" : "center"}
      >
        <MenuButton
          {...menuButton}
          onClick={
            controlledOpen !== undefined ? menuButton.onClick : handleOpen
          }
          active={active}
          aria-expanded={open && expanded}
        />
        {open && expanded && (
          <Box
            id="content-1"
            aria-hidden={!open}
            height={open ? "auto" : "0"}
            overflow="hidden"
            display="flex"
            flexDirection="column"
            gap="0-5"
            pl="6"
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
