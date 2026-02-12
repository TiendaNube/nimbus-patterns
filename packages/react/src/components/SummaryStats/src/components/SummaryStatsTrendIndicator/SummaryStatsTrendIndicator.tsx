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
 * SummaryStatsTrendIndicator displays a trend direction (up, down, or neutral) with
 * an icon and optional text, using semantic colors from trendConfig. Typically used
 * inside SummaryStats.Stat to show metric changes.
 *
 * Renders a Box containing an icon (when not neutral) and optional text, both styled
 * according to the trend via trendConfig (ArrowupIcon/ArrowDownIcon, success/danger/neutral colors).
 *
 * @param props - Props for SummaryStatsTrendIndicator; see SummaryStatsTrendIndicatorProps.
 * @param props.className - Optional CSS class name applied to the root element (forwarded via rest).
 * @param props.style - Optional inline styles for the root element (forwarded via rest).
 * @param props.trend - Direction of the trend: "up" | "down" | "neutral"; drives icon and color.
 * @param props.text - Optional label to show next to the icon (e.g. "8%", "+15%").
 * @param props.rest - Remaining HTML attributes (excluding color) spread onto the root Box.
 * @returns JSX element: a Box with icon and optional Text, with aria-label from trendConfig.
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
      role="img"
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
