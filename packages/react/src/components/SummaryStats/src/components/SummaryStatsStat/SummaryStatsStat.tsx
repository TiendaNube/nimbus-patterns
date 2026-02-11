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
  const {
    activeId,
    onToggle,
    expandable,
    layout,
    registerStat,
    statIds,
    isMobileCarousel,
  } = useSummaryStatsContext(false);
  const isActive = activeId === id;
  const isLastStat = statIds.length > 0 && statIds[statIds.length - 1] === id;

  const statIndex = statIds.indexOf(id);
  const isLastInRow = layout === "grid" && (statIndex + 1) % 2 === 0; // positions 2, 4, 6...
  const isInLastRow = layout === "grid" && statIndex >= statIds.length - 2; // last 2 positions

  const showVerticalSeparator =
    !isLastStat && !(layout === "grid" && isLastInRow);

  const showHorizontalSeparatorLine =
    !isLastStat && !(layout === "grid" && isInLastRow);

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

  const showHorizontalSeparator = {
    xs: isMobileCarousel ? "none" : "block",
    md: layout === "grid" ? "block" : "none",
  } as const;

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
        paddingLeft="2"
        paddingRight={isLastStat ? "2" : undefined}
      >
        <Box
          display="flex"
          flexDirection="column"
          gap="1"
          paddingY="2"
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
              : undefined
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
                />
              </Tooltip>
            )}
          </Box>
        </Box>

        {showVerticalSeparator && (
          <Box
            display={isMobileCarousel ? "flex" : { xs: "none", md: "flex" }}
            alignItems="center"
            marginLeft="2"
          >
            <Box
              width="1px"
              height="100%"
              backgroundColor="neutral-surfaceHighlight"
            />
          </Box>
        )}
      </Box>

      {showHorizontalSeparatorLine && (
        <Box
          display={showHorizontalSeparator}
          width="100%"
          height="1px"
          backgroundColor="neutral-surfaceHighlight"
        />
      )}
    </Box>
  );
};

SummaryStatsStat.displayName = "SummaryStatsStat";

export { SummaryStatsStat };
