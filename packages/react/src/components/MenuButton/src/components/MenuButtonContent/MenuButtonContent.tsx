import React, { forwardRef } from "react";

import {
  Icon,
  Box,
  Text,
  BoxProperties,
  PolymorphicForwardRefComponent,
} from "@nimbus-ds/components";

import { MenuButtonContentProps } from "./menuButtonContent.types";

const MenuButtonContent = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  MenuButtonContentProps
>(
  (
    {
      expanded,
      disabledColor,
      label,
      startIcon: IconSrc,
      children,
      active,
      as = "button",
      onClick,
      ...rest
    },
    ref
  ) => {
    const collapsedProps: BoxProperties = !expanded
      ? {
          justifyContent: "center",
          paddingX: "none",
        }
      : {};

    return (
      <Box
        {...rest}
        ref={ref as any}
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
) as PolymorphicForwardRefComponent<"button" | "a", MenuButtonContentProps>;

MenuButtonContent.displayName = "MenuButtonContent";

export { MenuButtonContent };
