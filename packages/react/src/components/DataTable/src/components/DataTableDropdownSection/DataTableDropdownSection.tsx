import React from "react";
import { Box } from "@nimbus-ds/components";
import type { DataTableDropdownSectionProps } from "./dataTableDropdownSection.types";

/**
 * Divider component for separating groups of actions in the DataTable Dropdown.
 */
const DataTableDropdownSection: React.FC<DataTableDropdownSectionProps> = ({
  children,
  ...rest
}: DataTableDropdownSectionProps) => (
  <Box display="flex" flexDirection="column" gap="1" p="2" {...rest}>
    {children}
  </Box>
);

DataTableDropdownSection.displayName = "DataTable.DropdownSection";

export { DataTableDropdownSection };
