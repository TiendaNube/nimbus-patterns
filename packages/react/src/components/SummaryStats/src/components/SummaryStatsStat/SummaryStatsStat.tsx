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
import type { TrendDirection } from "../SummaryStatsTrendIndicator/summaryStatsTrendIndicator.types";

function getSeparatorConfig(
  statIndex: number,
  statIds: string[],
  id: string,
  layout: "horizontal" | "grid",
  isHorizontalLayout: boolean
): {
  showVerticalSeparator: boolean;
  paddingRight: "1" | undefined;
  verticalSeparatorDisplay: "flex" | { xs: "none"; md: "flex" };
  showHorizontalSeparator: { xs: "block" | "none"; md: "block" | "none" };
} {
  const isLastStat = statIds.length > 0 && statIds.at(-1) === id;
  const isFirstColumn = (statIndex + 1) % 2 !== 0;
  const isInLastRow = statIndex >= statIds.length - 2;
  const showVerticalSeparator = layout === "grid" ? isFirstColumn : !isLastStat;
  const shouldAlwaysBeFlex = layout === "grid" || isHorizontalLayout;
  const shouldShow = layout === "grid" && !isInLastRow;
  const isGridVisible = layout === "grid" && !isInLastRow;
  const isListVisible = layout !== "grid" && !isHorizontalLayout && !isLastStat;

  return {
    showVerticalSeparator,
    paddingRight: isLastStat ? "1" : undefined,
    verticalSeparatorDisplay: shouldAlwaysBeFlex
      ? ("flex" as const)
      : { xs: "none" as const, md: "flex" as const },
    showHorizontalSeparator: {
      xs: isGridVisible || isListVisible ? "block" : "none",
      md: shouldShow ? "block" : "none",
    } as const,
  };
}

function getAriaLabel(
  description: string,
  value: string,
  trend?: TrendDirection,
  trendText?: string
): string {
  if (trend && trendText) {
    return `${description}: ${value}, ${trendConfig[trend].label} of ${trendText}`;
  }
  return `${description}: ${value}`;
}

const ExpandableChevron: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const IconSource = isActive ? ChevronUpIcon : ChevronDownIcon;
  return <Icon source={<IconSource size="small" />} color="neutral-textLow" />;
};

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
    isScrollPaneBlock,
  } = useSummaryStatsContext(false);
  const isActive = activeId === id;
  const statIndex = statIds.indexOf(id);
  const isLastStatInOddGrid =
    layout === "grid" &&
    statIds.length % 2 !== 0 &&
    statIds.length > 0 &&
    statIds.at(-1) === id;
  const isSecondToLastInOddGrid =
    layout === "grid" &&
    statIds.length % 2 !== 0 &&
    statIds.length >= 2 &&
    statIds.at(-2) === id;
  const separator = getSeparatorConfig(
    statIndex,
    statIds,
    id,
    layout,
    isHorizontalLayout
  );

  useEffect(() => {
    registerStat(id, children, isScrollPaneBlock);
  }, [children, id, registerStat, isScrollPaneBlock]);

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
      style={
        isLastStatInOddGrid
          ? { ...(_style as React.CSSProperties), gridColumn: "span 2" }
          : _style
      }
    >
      <Box
        display="flex"
        flexDirection="row"
        alignItems="stretch"
        flex="1"
        paddingLeft="1"
        paddingRight={separator.paddingRight}
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
          aria-label={getAriaLabel(description, value, trend, trendText)}
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
            {expandable && <ExpandableChevron isActive={isActive} />}
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

        {separator.showVerticalSeparator && !isLastStatInOddGrid && (
          <Box
            display={separator.verticalSeparatorDisplay}
            alignItems="center"
            marginLeft="1"
            data-testid="summary-stats-stat-vertical-separator"
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
        display={
          isSecondToLastInOddGrid
            ? { xs: "block" as const, md: "block" as const }
            : separator.showHorizontalSeparator || {
                xs: "none" as const,
                md: "none" as const,
              }
        }
        width="100%"
        height="1px"
        backgroundColor="neutral-surfaceDisabled"
      />
    </Box>
  );
};

SummaryStatsStat.displayName = "SummaryStatsStat";

export { SummaryStatsStat };
