import React from "react";
import { Box, Text } from "@nimbus-ds/components";
import { PlanDisplayPriceProps } from "./planDisplayPrice.types";

// Reading order — current price, previous price, period, annual note — is
// preserved by the source order below, matching document/DOM order for
// screen readers.
const PlanDisplayPrice: React.FC<PlanDisplayPriceProps> = ({
  price,
  previousPrice,
  period,
  annualNote,
}) => (
  <Box display="flex" flexDirection="column" gap="1">
    <Box display="flex" alignItems="baseline" gap="2">
      <Text fontWeight="bold" fontSize="highlight">
        {price}
      </Text>
      {previousPrice && (
        <Text
          as="span"
          textDecoration="line-through"
          color="neutral-textDisabled"
        >
          {previousPrice}
        </Text>
      )}
      {period && (
        <Text as="span" color="neutral-textLow">
          {period}
        </Text>
      )}
    </Box>
    {annualNote && (
      <Text fontSize="caption" color="neutral-textLow">
        {annualNote}
      </Text>
    )}
  </Box>
);

export { PlanDisplayPrice };
