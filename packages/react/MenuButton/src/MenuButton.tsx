import React from "react";
import "./menuButton.css";

import { Text } from "@nimbus-ds/text";
import { Icon } from "@nimbus-ds/icon";
import { Stack } from "@nimbus-ds/stack";

import { MenuButtonProps } from "./menuButton.types";

const MenuButton: React.FC<MenuButtonProps> = ({
  className: _className,
  style: _style,
  label,
  onClick,
  startIcon: IconSrc,
  children,
  active = false,
  ...rest
}: MenuButtonProps) => {
  const buttonClass = [
    "menu__button",
    `${active ? "menu__button--active" : ""}`
  ].join(" ");

  const activeColor = active ? "primary.interactive" : "primary.textHigh";
  const disabledColor = rest.disabled ? "neutral.textDisabled" : activeColor;

  return (
    <button {...rest} type="button" onClick={onClick} className={buttonClass}>
      {IconSrc && <Icon color={disabledColor} source={<IconSrc />} />}
      <Stack display="inline-flex" flex="1">
        <Text fontSize="base" color={disabledColor}>
          {label}
        </Text>
      </Stack>
      {children}
    </button>
  );
};

MenuButton.displayName = "MenuButton";

export { MenuButton };
