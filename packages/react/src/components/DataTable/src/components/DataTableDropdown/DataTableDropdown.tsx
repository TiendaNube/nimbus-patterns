import React from "react";

import { Box, Icon, Popover, Text } from "@nimbus-ds/components";
import { ChevronDownIcon } from "@nimbus-ds/icons";

import { DataTableDropdownProps } from "./dataTableDropdown.types";

/**
 * Dropdown component for DataTable bulk actions.
 * Renders a trigger button with a popover containing action items.
 */
const DataTableDropdown: React.FC<DataTableDropdownProps> = ({
  placeholder,
  children,
  ...rest
}: DataTableDropdownProps) => (
  <Popover
    content={
      <Box display="flex" flexDirection="column" width="100%">
        {children}
      </Box>
    }
    arrow={false}
    position="bottom-start"
    offset={6}
    padding="none"
    enabledHover={false}
    enabledClick
    width={{ xs: "180px", md: "240px" }}
  >
    <Box
      {...rest}
      as="button"
      type="button"
      cursor="pointer"
      backgroundColor="neutral-background"
      boxShadow={{ focusWithin: "focusRing" }}
      borderWidth="1"
      borderStyle="solid"
      borderColor="neutral-interactive"
      borderRadius="2"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      gap="2"
      py="1"
      px="2"
      width={{ xs: "180px", md: "240px" }}
    >
      <Text color="neutral-textLow" fontSize="base" lineHeight="base">
        {placeholder}
      </Text>
      <Icon source={<ChevronDownIcon />} color="neutral-textLow" />
    </Box>
  </Popover>
);

DataTableDropdown.displayName = "DataTable.Dropdown";

export { DataTableDropdown };
