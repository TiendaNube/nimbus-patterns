import React, { ComponentPropsWithRef, forwardRef } from "react";

import { Icon, Box, Text, BoxProperties } from "@nimbus-ds/components";
import { PolymorphicForwardRefComponent } from "@nimbus-ds/typings";

import { MenuButtonBaseProps, MenuButtonComponents } from "./menuButton.types";
import { MenuButtonAccordion } from "./components";
import { useMenuExpandContext } from "@common/contexts";

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
      ...rest
    }: MenuButtonBaseProps & { as: any },
    ref
  ) => {
    const { expanded } = useMenuExpandContext(false);

    const activeColor = active ? "primary-interactive" : "neutral-textHigh";
    const disabledColor = rest.disabled ? "neutral-textDisabled" : activeColor;

    const collapsedProps: BoxProperties = !expanded
      ? {
          justifyContent: "center",
        }
      : {};

    return (
      <Box
        {...rest}
        ref={ref}
        as={as}
        type="button"
        onClick={onClick}
        alignItems="center"
        textDecoration="none"
        backgroundColor={{
          xs: active ? "primary-surface" : "transparent",
          hover: "primary-surface",
          active: "primary-surfaceHighlight",
          disabled: "neutral-surfaceDisabled",
        }}
        borderRadius="2"
        borderWidth="none"
        cursor={{
          xs: "pointer",
          disabled: "not-allowed",
        }}
        display="flex"
        gap="2"
        px="2"
        py={{
          xs: "2",
          md: "1",
        }}
        width="100%"
        transitionProperty="all"
        transitionDuration="base"
        transitionTimingFunction="ease-in-out"
        maxHeight={{
          xs: "34px",
          md: "26px",
        }}
        {...collapsedProps}
      >
        {IconSrc && (
          <Icon color={disabledColor} source={<IconSrc size={16} />} />
        )}

        {expanded && (
          <Box display="inline-flex" flex="1">
            <Text
              fontSize="base"
              color={disabledColor}
              lineClamp={1}
              wordBreak="break-all"
            >
              {label}
            </Text>
          </Box>
        )}
        {expanded && children}
      </Box>
    );
  }
) as PolymorphicForwardRefComponent<"button" | "a", MenuButtonBaseProps> &
  MenuButtonComponents;

MenuButton.Accordion = MenuButtonAccordion;

MenuButton.displayName = "MenuButton";
MenuButton.Accordion.displayName = "MenuButton.Accordion";

export type MenuButtonProps = ComponentPropsWithRef<typeof MenuButton>;
export { MenuButton };
