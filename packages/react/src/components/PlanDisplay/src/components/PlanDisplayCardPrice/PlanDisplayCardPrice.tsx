import React from "react";
import { Box, Text, Title } from "@nimbus-ds/components";
import { PlanDisplayCardPriceProps } from "./planDisplayCardPrice.types";

const PlanDisplayCardPrice: React.FC<PlanDisplayCardPriceProps> = ({
  price,
  previousPrice,
  period,
  annualNote,
}) => (
  <Box display="flex" flexDirection="column" gap="2">
    <Box display="flex" alignItems="center" gap="0-5">
      <Title as="h3" color="neutral-textHigh">
        {price}
      </Title>
      {previousPrice && (
        <Text as="span" fontSize="base">
          {/* `neutral-interactivePressed` is not exposed by Text's `color` prop,
              so the token is applied via its CSS variable. */}
          <span
            style={{
              color: "var(--nimbus-colors-neutral-interactivePressed)",
              textDecoration: "line-through",
            }}
          >
            {previousPrice}
          </span>
        </Text>
      )}
      {period && (
        <Text as="span" color="neutral-textHigh">
          {period}
        </Text>
      )}
    </Box>
    {annualNote && (
      <Text as="p" fontSize="caption" color="neutral-textLow">
        {annualNote}
      </Text>
    )}
  </Box>
);

export { PlanDisplayCardPrice };
