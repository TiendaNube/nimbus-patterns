import React from "react";
import { Box, Divider, Text } from "@nimbus-ds/components";
import { PlanDisplayCardFooterProperties } from "./planDisplayCardFooter.types";

const PlanDisplayCardFooter: React.FC<PlanDisplayCardFooterProperties> = ({
  icon,
  children,
}) => (
  // `marginTop: auto` pins the footer to the bottom of the (full-height, flex-column) card
  // so footers stay aligned across cards in the same row. Native element on purpose: Box
  // discards `style`, so the `margin-top: auto` would be a no-op on a Box.
  <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
    <Box mt="3" mb="3">
      <Divider />
    </Box>

    {icon ? (
      <Box display="flex" gap="2" alignItems="flex-start">
        <Text as="span" color="primary-interactive">
          <Box display="flex" alignItems="center">
            {icon}
          </Box>
        </Text>
        <Box>{children}</Box>
      </Box>
    ) : (
      <Box>{children}</Box>
    )}
  </div>
);

export { PlanDisplayCardFooter };
