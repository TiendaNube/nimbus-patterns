import React from "react";

import { Box, Icon, Text } from "@nimbus-ds/components";
import { CloseIcon, CheckIcon } from "@nimbus-ds/icons";

import { EmptyAppPlanItemProps } from "./emptyAppPlanItem.types";

const EmptyAppPlanItem: React.FC<EmptyAppPlanItemProps> = ({
  disabled = false,
  label,
  ...rest
}: EmptyAppPlanItemProps) => (
  <Box display="flex" alignItems="center" gap="2" {...rest}>
    {disabled ? (
      <Icon source={<CloseIcon />} color="neutral-textDisabled" />
    ) : (
      <Icon source={<CheckIcon />} color="success-interactive" />
    )}
    <Text color={disabled ? "neutral-textDisabled" : "neutral-textHigh"}>
      {label}
    </Text>
  </Box>
);

export { EmptyAppPlanItem };
