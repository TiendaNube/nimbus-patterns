import React, { ComponentPropsWithRef, forwardRef } from "react";

import { Text, Icon, Box } from "@nimbus-ds/components";
import { PolymorphicForwardRefComponent } from "@nimbus-ds/typings";

import { MenuButtonBaseProps } from "./menuButton.types";

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
    const activeColor = active ? "primary-interactive" : "primary-textHigh";
    const disabledColor = rest.disabled ? "neutral-textDisabled" : activeColor;

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
        boxShadow={{
          focus: "focusRing",
        }}
        borderRadius=".5rem"
        borderWidth="0"
        cursor={{
          xs: "pointer",
          disabled: "not-allowed",
        }}
        display="flex"
        gap="2"
        padding="2"
        width="100%"
        transitionProperty="all"
        transitionDuration="base"
        transitionTimingFunction="ease-in-out"
      >
        {IconSrc && <Icon color={disabledColor} source={<IconSrc />} />}
        <Box display="inline-flex" flex="1">
          <Text fontSize="base" color={disabledColor}>
            {label}
          </Text>
        </Box>
        {children}
      </Box>
    );
  }
) as PolymorphicForwardRefComponent<"button" | "a", MenuButtonBaseProps>;

MenuButton.displayName = "MenuButton";

export type MenuButtonProps = ComponentPropsWithRef<typeof MenuButton>;
export { MenuButton };
