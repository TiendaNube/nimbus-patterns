import React from "react";
import { Box } from "@nimbus-ds/components";
import { TollbarButtonProps } from "./tollbarButton.types";

const TollbarButton: React.FC<TollbarButtonProps> = ({
  ref: _ref,
  backgroundColor,
  selected,
  ...props
}) => (
  <Box
    as="button"
    backgroundColor={{
      hover: "primary-surface",
      xs: selected ? "primary-surface" : "transparent",
    }}
    pointerEvents={props.disabled ? "none" : "auto"}
    borderRadius="1"
    cursor="pointer"
    borderWidth="none"
    color={props.disabled ? "neutral-interactive" : "primary-interactive"}
    height="32px"
    minWidth="32px"
    {...props}
    p="2"
  />
);

export { TollbarButton };
