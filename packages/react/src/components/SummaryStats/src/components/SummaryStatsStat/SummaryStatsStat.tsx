import React, { useId } from "react";

import { Box, Text, Icon, Tooltip } from "@nimbus-ds/components";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  InfoCircleIcon,
} from "@nimbus-ds/icons";

import { useSummaryStatsContext } from "../../contexts";
import {
  SummaryStatsTrendIndicator,
  trendConfig,
} from "../SummaryStatsTrendIndicator";
import { SummaryStatsStatProps } from "./summaryStatsStat.types";

const SummaryStatsStat: React.FC<SummaryStatsStatProps> = ({
  className: _className,
  style: _style,
  id: providedId,
  value,
  description,
  trend,
  trendText,
  infoTooltip,
  ...rest
}: SummaryStatsStatProps) => {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const { selectedId, onSelect, expandable, layout } =
    useSummaryStatsContext(false);
  const isSelected = selectedId === id;

  const handleClick = () => {
    if (expandable) {
      onSelect(id);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (expandable && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      onSelect(id);
    }
  };

  return (
    <Box
      {...rest}
      display="flex"
      flexDirection="column"
      gap="1"
      padding="4"
      backgroundColor={isSelected ? "neutral-surface" : "neutral-background"}
      borderStyle="solid"
      borderWidth="none"
      borderBottomWidth={{ xs: "1", md: layout === "grid" ? "1" : "none" }}
      borderColor={
        isSelected ? "primary-interactive" : "neutral-surfaceHighlight"
      }
      flex="1"
      cursor={expandable ? "pointer" : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={expandable ? 0 : undefined}
      role={expandable ? "button" : undefined}
      aria-expanded={expandable ? isSelected : undefined}
      aria-label={
        trend && trendText
          ? `${description}: ${value}, ${trendConfig[trend].label} of ${trendText}`
          : undefined
      }
    >
      {/* First row: Value + Trend + Chevron */}
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center" gap="1">
          <Text fontSize="highlight" fontWeight="bold" color="neutral-textHigh">
            {value}
          </Text>
          {trend && (
            <SummaryStatsTrendIndicator trend={trend} text={trendText} />
          )}
        </Box>
        {expandable && (
          <Icon
            source={
              isSelected ? (
                <ChevronUpIcon size="small" />
              ) : (
                <ChevronDownIcon size="small" />
              )
            }
            color="neutral-textLow"
          />
        )}
      </Box>

      {/* Second row: Description + Info icon */}
      <Box display="flex" alignItems="center" gap="1">
        <Text fontSize="caption" color="neutral-textLow">
          {description}
        </Text>
        {infoTooltip && (
          <Tooltip content={infoTooltip} position="top">
            <Icon
              source={<InfoCircleIcon size="small" />}
              color="neutral-textLow"
              cursor="pointer"
            />
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};

SummaryStatsStat.displayName = "SummaryStatsStat";

export { SummaryStatsStat };
