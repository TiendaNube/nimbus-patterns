import React, { useEffect, useCallback } from "react";

import { Box, Text, Icon, Tooltip } from "@nimbus-ds/components";
import { InfoCircleIcon } from "@nimbus-ds/icons";

import { useRandomId } from "@common/hooks";
import { useSummaryStatsContext } from "../../contexts";
import { SummaryStatsTrendIndicator } from "../SummaryStatsTrendIndicator";
import {
  ExpandableChevron,
  getSeparatorConfig,
} from "./summaryStatsItem.definitions";
import { SummaryStatsItemProps } from "./summaryStatsItem.types";

/**
 * A single stat card for the SummaryStats component. Renders a stat display with a
 * primary value and description, an optional trend indicator (up/down/neutral with
 * text), and an optional info icon with tooltip. When used inside an expandable
 * SummaryStats, the stat is clickable and reveals additional content (children) in
 * an expandable area below the stats row.
 *
 * **Returns:** A stat display (Box-based layout) showing value and description,
 * with optional trend indicator and info tooltip. In expandable mode it behaves as
 * a button that toggles the expanded content.
 *
 * **Required props:** `value`, `description`.
 * **Optional props:** `trend`, `trendText`, `infoTooltip`, `children`,
 * and any valid HTML element attributes (rest props).
 *
 * @param props - SummaryStatsItemProps
 * @param props.value - **Required.** Main value to display (e.g. "$1,000", "156").
 *   Type: `string`.
 * @param props.description - **Required.** Short label for the metric (e.g. "Total Sales").
 *   Type: `string`.
 * @param props.trend - **Optional.** Trend direction for the indicator. Type: `"up" | "down" | "neutral"`.
 *   When set, a trend icon and optional `trendText` are shown next to the value.
 * @param props.trendText - **Optional.** Text shown next to the trend icon (e.g. "15%", "-8%").
 *   Type: `string`. Meaningful when `trend` is provided.
 * @param props.infoTooltip - **Optional.** If provided, an info icon is shown next to the
 *   description; hovering shows this string as tooltip content. Type: `string`.
 * @param props.children - **Optional.** Content rendered in the expandable area when this
 *   stat is active (only when SummaryStats has `expandable`). Type: `ReactNode`.
 * @param props.aria-label - **Optional.** Accessible label for the stat element. Forwarded
 *   to the inner interactive element (the one with `role="button"` in expandable mode).
 *   Clients should provide their own for localization. Type: `string`.
 * @param props - **Rest.** Any other HTML element attributes (e.g. `data-*`, `aria-*`)
 *   are forwarded to the root Box element.
 *
 * @example
 * // Basic stat with trend
 * <SummaryStats>
 *   <SummaryStats.Item
 *     value="$1,000"
 *     description="Total Sales"
 *     trend="up"
 *     trendText="15%"
 *   />
 * </SummaryStats>
 *
 * @example
 * // Stat with info tooltip
 * <SummaryStats>
 *   <SummaryStats.Item
 *     value="156"
 *     description="Orders"
 *     infoTooltip="Total orders in the last 30 days."
 *   />
 * </SummaryStats>
 *
 * @example
 * // Expandable stat with children
 * <SummaryStats expandable>
 *   <SummaryStats.Item value="$1,000" description="Total Sales">
 *     <Chart />
 *   </SummaryStats.Item>
 * </SummaryStats>
 */
const SummaryStatsItem: React.FC<SummaryStatsItemProps> = ({
  className: _className,
  style: _style,
  children,
  value,
  description,
  trend,
  trendText,
  infoTooltip,
  "aria-label": ariaLabel,
  ...rest
}: SummaryStatsItemProps) => {
  const id = useRandomId();
  const {
    activeId,
    onToggle,
    expandable,
    layout,
    registerStat,
    unregisterStat,
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
    return () => {
      unregisterStat(id);
    };
  }, [children, id, registerStat, unregisterStat, isScrollPaneBlock]);

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
          aria-label={ariaLabel}
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
                  data-testid="summary-stats-item-info-icon"
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
            data-testid="summary-stats-item-vertical-separator"
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

SummaryStatsItem.displayName = "SummaryStatsItem";

export { SummaryStatsItem };
