import React from "react";

import { Box, Checkbox, Label, Text } from "@nimbus-ds/components";

import { DataTableBulkActionsProps } from "./dataTableBulkActions.types";

const DataTableBulkActions: React.FC<DataTableBulkActionsProps> = ({
  className: _className,
  style: _style,
  checkbox,
  link,
  action,
  label,
  ...rest
}: DataTableBulkActionsProps) => (
  <Box
    {...rest}
    position="sticky"
    top="0"
    left="0"
    width="100%"
    backgroundColor="neutral.surface"
    display="flex"
    alignItems="center"
    gap="4"
    p="2"
    boxSizing="border-box"
    borderRadius=".5rem .5rem 0 0"
  >
    <Checkbox {...checkbox} id="select-all" />
    <Label htmlFor="select-all">
      <Text color="neutral.textLow" fontSize="base">
        {label}
      </Text>
    </Label>
    {link}
    {action}
  </Box>
);

export { DataTableBulkActions };
