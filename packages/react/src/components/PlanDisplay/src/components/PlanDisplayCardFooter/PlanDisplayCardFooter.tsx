import React from "react";
import { Box, Text } from "@nimbus-ds/components";
import { PlanDisplayCardFooterProps } from "./planDisplayCardFooter.types";
import PlanDisplayCardSpacing from "../PlanDisplayCardSpacing";

const PlanDisplayCardFooter: React.FC<PlanDisplayCardFooterProps> = ({
  icon,
  children,
}) => (
  // `mt="auto"` pins the footer to the bottom of the (full-height, flex-column) card
  // so footers stay aligned across cards in the same row.
  <Box display="flex" flexDirection="column" mt="auto">
    <PlanDisplayCardSpacing />

    {icon ? (
      <Box display="flex" gap="2" alignItems="flex-start">
        <Text as="span" color="primary-interactive">
          <Box as="span" display="flex" alignItems="center">
            {icon}
          </Box>
        </Text>
        <Box>{children}</Box>
      </Box>
    ) : (
      <Box>{children}</Box>
    )}
  </Box>
);

export { PlanDisplayCardFooter };
