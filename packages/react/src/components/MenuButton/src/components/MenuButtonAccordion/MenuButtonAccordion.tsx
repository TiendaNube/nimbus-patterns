import React, {
  ComponentPropsWithRef,
  forwardRef,
  useMemo,
  useState,
  useId,
} from "react";
import { Box, Popover } from "@nimbus-ds/components";
import { PolymorphicForwardRefComponent } from "@nimbus-ds/typings";

import { MenuExpandContext, useMenuExpandContext } from "@common/contexts";
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
    const accordionId = useId();
    const {
      expanded: contextExpanded,
      tooltipsPosition,
      showTooltipsWhenCollapsed,
      activeAccordionPopover,
      setActiveAccordionPopover,
    } = useMenuExpandContext(false);
    const expanded = expandedProp ?? contextExpanded;

    const [isOpen, setOpen] = useState(false);
    const handleOpen = () => setOpen((prevState) => !prevState);

    const isPopoverOpen = useMemo(
      () =>
        !expanded &&
        !!activeAccordionPopover &&
        activeAccordionPopover === accordionId,
      [expanded, activeAccordionPopover, accordionId]
    );

    const open = useMemo(
      () => controlledOpen ?? isOpen,
      [controlledOpen, isOpen]
    );

    const popoverContextValue = useMemo(
      () => ({
        expanded: true,
        tooltipsPosition,
        activeAccordionPopover: null,
        setActiveAccordionPopover: () => void 0,
      }),
      [tooltipsPosition]
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
          showTooltipsWhenCollapsed={false}
          expanded={expanded}
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

    if (!expanded && showTooltipsWhenCollapsed) {
      return (
        <Popover
          content={
            <MenuExpandContext.Provider value={popoverContextValue}>
              <Box
                minWidth="200px"
                display="flex"
                flexDirection="column"
                gap="0-5"
              >
                {children}
              </Box>
            </MenuExpandContext.Provider>
          }
          arrow
          position={tooltipsPosition ?? "right"}
          padding="small"
          enabledClick={false}
          onVisibility={(visible) => {
            setActiveAccordionPopover((prev) => {
              if (visible) {
                return accordionId;
              }
              return prev === accordionId ? null : prev;
            });
          }}
          enabledHover
          visible={isPopoverOpen}
        >
          {content}
        </Popover>
      );
    }

    return content;
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
