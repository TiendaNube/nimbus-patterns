import React, {
  ComponentPropsWithRef,
  forwardRef,
  useMemo,
  useState,
} from "react";
import { Box, Tooltip } from "@nimbus-ds/components";
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
      tooltipText,
      ...rest
    }: MenuButtonAccordionBaseProps & { as: any },
    ref
  ) => {
    const {
      expanded: contextExpanded,
      showTooltipsWhenCollapsed,
      tooltipsPosition,
    } = useMenuExpandContext(false);
    const expanded = expandedProp ?? contextExpanded;

    const [isOpen, setOpen] = useState(false);
    const handleOpen = () => setOpen((prevState) => !prevState);

    const open = useMemo(
      () => controlledOpen ?? isOpen,
      [controlledOpen, isOpen]
    );

    const getBackgroundColor = () => {
      if (active) {
        return "primary-surface";
      }
      return open ? "neutral-surface" : "transparent";
    };

    const content = (
      <Box
        {...rest}
        ref={ref}
        as={as}
        backgroundColor={getBackgroundColor()}
        borderRadius="2"
        zIndex={open ? "100" : undefined}
        textDecoration="none"
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

    return !expanded && showTooltipsWhenCollapsed ? (
      <Tooltip
        content={tooltipText ?? menuButton.label ?? ""}
        position={tooltipsPosition}
      >
        {content}
      </Tooltip>
    ) : (
      content
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
