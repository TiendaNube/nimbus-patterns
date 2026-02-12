import React, { useId, useEffect, useCallback } from "react";

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

/**
 * Displays a single stat card with a primary value, description, optional trend
 * indicator, and optional info tooltip. Used as a child of SummaryStats. In
 * expandable mode, shows additional content on click.
 *
 * @param props - SummaryStatsStatProps
 * @param props.value - Main value to display (e.g. "$1,000", "156").
 * @param props.description - Short label for the metric.
 * @param props.trend - Trend direction: "up" | "down" | "neutral".
 * @param props.trendText - Trend label (e.g. "15%", "-8%").
 * @param props.infoTooltip - If set, shows an info icon with this tooltip content.
 * @param props.children - Content shown in the expandable area when this stat is active.
 * @param props.className - Optional CSS class (passed to root).
 * @param props.style - Optional inline styles (passed to root).
 *
 * @example
 * <SummaryStats>
 *   <SummaryStats.Stat value="$1,000" description="Total Sales" trend="up" trendText="15%" />
 * </SummaryStats>
 *
 * @example
 * <SummaryStats expandable>
 *   <SummaryStats.Stat value="$1,000" description="Total Sales">
 *     <Chart />
 *   </SummaryStats.Stat>
 * </SummaryStats>
 */
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
  const {
    activeId,
    onToggle,
    expandable,
    layout,
    registerStat,
    statIds,
    isHorizontalLayout,
  } = useSummaryStatsContext(false);
  const isActive = activeId === id;
  const isLastStat = statIds.length > 0 && statIds[statIds.length - 1] === id;

  const statIndex = statIds.indexOf(id);
  const isSecondColumn = (statIndex + 1) % 2 === 0;
  const isFirstColumn = !isSecondColumn;
  const isInLastRow = statIndex >= statIds.length - 2;

  const showVerticalSeparator = layout === "grid" ? isFirstColumn : !isLastStat;

  const shouldShow = layout === "grid" && !isInLastRow;
  const shouldAlwaysBeFlex = layout === "grid" || isHorizontalLayout;
  const isGridVisible = layout === "grid" && !isInLastRow;
  const isListVisible = layout !== "grid" && !isHorizontalLayout && !isLastStat;

  const verticalSeparatorDisplay = shouldAlwaysBeFlex
    ? "flex"
    : { xs: "none" as const, md: "flex" as const };

  const showHorizontalSeparator = {
    xs: isGridVisible || isListVisible ? "block" : "none",
    md: shouldShow ? "block" : "none",
  } as const;

  useEffect(() => {
    registerStat(id, children);
  }, [children, id, registerStat]);

  const handleClick = useCallback(() => {
    if (expandable) {
      onToggle(id);
    }
  }, [expandable, onToggle, id]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (expandable && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        onToggle(id);
      }
    },
    [expandable, onToggle, id]
  );

  return (
    <Box
      {...rest}
      display="flex"
      flexDirection="column"
      backgroundColor="neutral-background"
      flex="1"
    >
      <Box
        display="flex"
        flexDirection="row"
        alignItems="stretch"
        flex="1"
        paddingLeft="1"
        paddingRight={isLastStat ? "1" : undefined}
      >
        <Box
          display="flex"
          flexDirection="column"
          gap="1"
          padding="1"
          flex="1"
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
              : `${description}: ${value}`
          }
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap="2"
          >
            <Box display="flex" alignItems="center" gap="1">
              <Text
                fontSize="base"
                fontWeight="medium"
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
              <Tooltip content={infoTooltip} position="bottom">
                <Icon
                  source={<InfoCircleIcon size="small" />}
                  color="neutral-textLow"
                  cursor="pointer"
                  data-testid="summary-stats-stat-info-icon"
                />
              </Tooltip>
            )}
          </Box>
        </Box>

        {showVerticalSeparator && (
          <Box
            display={verticalSeparatorDisplay}
            alignItems="center"
            marginLeft="1"
          >
            <Box
              width="1px"
              height="100%"
              backgroundColor="neutral-surfaceDisabled"
            />
          </Box>
        )}
      </Box>

      <Box
        display={showHorizontalSeparator}
        width="100%"
        height="1px"
        backgroundColor="neutral-surfaceDisabled"
      />
    </Box>
  );
};

SummaryStatsStat.displayName = "SummaryStatsStat";

export { SummaryStatsStat };
