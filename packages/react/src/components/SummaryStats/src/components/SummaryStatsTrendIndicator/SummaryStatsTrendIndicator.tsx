import React from "react";

import { Box, Text, Icon } from "@nimbus-ds/components";
import { ArrowupIcon, ArrowDownIcon } from "@nimbus-ds/icons";

import { SummaryStatsTrendIndicatorProps } from "./summaryStatsTrendIndicator.types";

const trendConfig = {
  up: {
    icon: ArrowupIcon,
    color: "success-interactive" as const,
    label: "increase",
  },
  down: {
    icon: ArrowDownIcon,
    color: "danger-interactive" as const,
    label: "decrease",
  },
  neutral: {
    icon: null,
    color: "neutral-textLow" as const,
    label: "no change",
  },
};

/**
 * SummaryStatsTrendIndicator renders an icon and optional text for a trend direction
 * (up, down, or neutral) with semantic colors. Used inside SummaryStats.Stat.
 *
 * @param props - SummaryStatsTrendIndicatorProps (trend, optional text, className, style, rest)
 * @returns JSX with icon and optional text based on trendConfig
 */
const SummaryStatsTrendIndicator: React.FC<SummaryStatsTrendIndicatorProps> = ({
  className: _className,
  style: _style,
  trend,
  text,
  ...rest
}: SummaryStatsTrendIndicatorProps) => {
  const trendInfo = trendConfig[trend];

  return (
    <Box
      {...rest}
      display="flex"
      alignItems="center"
      gap="0-5"
      aria-label={trendInfo.label}
    >
      {trendInfo.icon && (
        <Icon
          source={<trendInfo.icon size="small" />}
          color={trendInfo.color}
        />
      )}
      {text && (
        <Text fontSize="caption" color={trendInfo.color}>
          {text}
        </Text>
      )}
    </Box>
  );
};

SummaryStatsTrendIndicator.displayName = "SummaryStatsTrendIndicator";

export { SummaryStatsTrendIndicator, trendConfig };
