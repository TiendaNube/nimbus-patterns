import React, { useCallback } from "react";

import { Box, Icon, Text } from "@nimbus-ds/components";

import { useDataTableDropdownContext } from "../DataTableDropdown";
import { DataTableDropdownActionProps } from "./dataTableDropdownAction.types";

/**
 * Action item for the DataTable Dropdown component.
 * Renders a clickable button with an optional icon and label.
 * Hides the parent dropdown before firing the provided onClick handler.
 */
const DataTableDropdownAction: React.FC<DataTableDropdownActionProps> = ({
  icon,
  label,
  onClick,
  disabled,
  ...rest
}: DataTableDropdownActionProps) => {
  const { setDropdownVisibility } = useDataTableDropdownContext();
  const textColor = disabled ? "neutral-textDisabled" : "neutral-textHigh";

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setDropdownVisibility(false);
      onClick?.(event);
    },
    [onClick, setDropdownVisibility]
  );

  return (
    <Box
      {...rest}
      as="button"
      type="button"
      disabled={disabled}
      cursor={{
        xs: "pointer",
        disabled: "auto",
      }}
      backgroundColor={{
        xs: "transparent",
        hover: "neutral-surface",
        active: "neutral-surfaceHighlight",
        disabled: "neutral-surfaceDisabled",
      }}
      borderWidth="none"
      display="flex"
      alignItems="center"
      gap="2"
      borderRadius="2"
      py="1-5"
      px="2"
      transitionDuration="fast"
      transitionProperty="background-color"
      transitionTimingFunction="ease-in-out"
      onClick={handleClick}
    >
      {icon && <Icon source={icon} color={textColor} />}
      <Text color={textColor} fontSize="base" lineHeight="base">
        {label}
      </Text>
    </Box>
  );
};

DataTableDropdownAction.displayName = "DataTable.DropdownAction";

export { DataTableDropdownAction };
