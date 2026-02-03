import React from "react";

import { Box, Icon, Text } from "@nimbus-ds/components";

import { DataTableDropdownActionProps } from "./dataTableDropdownAction.types";

/**
 * Action item for the DataTable Dropdown component.
 * Renders a clickable button with an optional icon and label.
 */
const DataTableDropdownAction: React.FC<DataTableDropdownActionProps> = ({
  icon,
  label,
  onClick,
  ...rest
}: DataTableDropdownActionProps) => (
  <Box
    {...rest}
    as="button"
    type="button"
    cursor="pointer"
    backgroundColor={{
      xs: "transparent",
      hover: "neutral-surface",
      active: "neutral-surfaceHighlight",
    }}
    borderWidth="none"
    display="flex"
    alignItems="center"
    gap="2"
    borderRadius="1"
    py="1-5"
    px="2"
    transitionDuration="fast"
    transitionProperty="background-color"
    transitionTimingFunction="ease-in-out"
    onClick={onClick}
  >
    {icon && <Icon source={icon} color="neutral-textHigh" />}
    <Text color="neutral-textHigh" fontSize="base" lineHeight="base">
      {label}
    </Text>
  </Box>
);

DataTableDropdownAction.displayName = "DataTable.DropdownAction";

export { DataTableDropdownAction };
