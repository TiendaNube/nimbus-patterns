import React, {
  ComponentPropsWithRef,
  forwardRef,
  useMemo,
  useId,
} from "react";

import { Popover } from "@nimbus-ds/components";
import { PolymorphicForwardRefComponent } from "@nimbus-ds/typings";

import { useMenuExpandContext } from "@common/contexts";
import { MenuButtonBaseProps, MenuButtonComponents } from "./menuButton.types";
import { MenuButtonAccordion, MenuButtonContent } from "./components";

const MenuButton = forwardRef(
  (
    {
      className: _className,
      style: _style,
      label,
      onClick,
      startIcon: IconSrc,
      children,
      active = false,
      as = "button",
      expanded: expandedProp,
      showPopoversWhenCollapsed,
      ...rest
    }: MenuButtonBaseProps & { as: any },
    ref
  ) => {
    const menuButtonId = useId();
    const {
      expanded: contextExpanded,
      showPopoversWhenCollapsed: contextShowPopoversWhenCollapsed,
      popoverPosition,
      activeAccordionPopover,
      setActiveAccordionPopover,
    } = useMenuExpandContext(false);

    const expanded = expandedProp ?? contextExpanded;
    const shouldShowPopover =
      showPopoversWhenCollapsed ?? contextShowPopoversWhenCollapsed ?? true;

    const isPopoverOpen = useMemo(
      () =>
        !expanded &&
        !!activeAccordionPopover &&
        activeAccordionPopover === menuButtonId,
      [expanded, activeAccordionPopover, menuButtonId]
    );
    const activeColor = active ? "primary-interactive" : "neutral-textHigh";
    const disabledColor = rest.disabled ? "neutral-textDisabled" : activeColor;

    const content = (
      <MenuButtonContent
        ref={ref}
        expanded={expanded}
        disabledColor={disabledColor}
        label={label}
        startIcon={IconSrc}
        active={active}
        as={as}
        onClick={onClick}
        {...rest}
      >
        {children}
      </MenuButtonContent>
    );

    return !expanded && shouldShowPopover ? (
      <Popover
        content={
          <MenuButtonContent
            expanded
            disabledColor={disabledColor}
            label={label}
            active={active}
            as={as}
            onClick={onClick}
            {...rest}
          >
            {children}
          </MenuButtonContent>
        }
        arrow
        position={popoverPosition ?? "right"}
        padding="small"
        onVisibility={(visible) => {
          setActiveAccordionPopover((prev) => {
            if (visible) {
              return menuButtonId;
            }
            return prev === menuButtonId ? null : prev;
          });
        }}
        enabledHover
        enabledClick={false}
        visible={isPopoverOpen}
      >
        {content}
      </Popover>
    ) : (
      content
    );
  }
) as PolymorphicForwardRefComponent<"button" | "a", MenuButtonBaseProps> &
  MenuButtonComponents;

MenuButton.Accordion = MenuButtonAccordion;

MenuButton.displayName = "MenuButton";

export type MenuButtonProps = ComponentPropsWithRef<typeof MenuButton>;
export { MenuButton };
