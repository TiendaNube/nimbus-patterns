import React, { useId, useEffect } from "react";

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
  children,
  value,
  description,
  trend,
  trendText,
  infoTooltip,
  ...rest
}: SummaryStatsStatProps) => {
  const id = useId();
  const { activeId, onToggle, expandable, layout, registerStat } =
    useSummaryStatsContext(false);
  const isActive = activeId === id;

  // Register this stat and its expandable content
  useEffect(() => {
    registerStat(id, children);
  }, [id, children, registerStat]);

  const handleClick = () => {
    if (expandable) {
      onToggle(id);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (expandable && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      onToggle(id);
    }
  };

  return (
    <Box
      {...rest}
      display="flex"
      flexDirection="column"
      padding={isActive ? "2" : "none"}
      backgroundColor="neutral-background"
      borderStyle="solid"
      borderWidth="none"
      borderBottomWidth={{ xs: "1", md: layout === "grid" ? "1" : "none" }}
      borderColor="neutral-surfaceHighlight"
      flex="1"
    >
      <Box
        display="flex"
        flexDirection="column"
        gap="1"
        padding={isActive ? "2" : "4"}
        backgroundColor={isActive ? "primary-surface" : "neutral-background"}
        borderRadius={isActive ? "2" : "none"}
        cursor={expandable ? "pointer" : undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={expandable ? 0 : undefined}
        role={expandable ? "button" : undefined}
        aria-expanded={expandable ? isActive : undefined}
        aria-label={
          trend && trendText
            ? `${description}: ${value}, ${trendConfig[trend].label} of ${trendText}`
            : undefined
        }
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap="1">
            <Text
              fontSize="highlight"
              fontWeight="bold"
              color="neutral-textHigh"
            >
              {value}
            </Text>
            {trend && (
              <SummaryStatsTrendIndicator trend={trend} text={trendText} />
            )}
          </Box>
          {expandable && (
            <Icon
              source={
                isActive ? (
                  <ChevronUpIcon size="small" />
                ) : (
                  <ChevronDownIcon size="small" />
                )
              }
              color="neutral-textLow"
            />
          )}
        </Box>

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
    </Box>
  );
};

SummaryStatsStat.displayName = "SummaryStatsStat";

export { SummaryStatsStat };
