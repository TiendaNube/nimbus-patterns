import React from "react";

import { Icon } from "@nimbus-ds/components";
import { ChevronDownIcon, ChevronUpIcon } from "@nimbus-ds/icons";

import type { SummaryStatsLayout } from "../../contexts";
import type { SeparatorConfig } from "./summaryStatsItem.types";

export const ExpandableChevron: React.FC<{ isActive: boolean }> = ({
  isActive,
}) => {
  const IconSource = isActive ? ChevronUpIcon : ChevronDownIcon;
  return <Icon source={<IconSource size="small" />} color="neutral-textLow" />;
};

ExpandableChevron.displayName = "ExpandableChevron";

export function getSeparatorConfig(
  statIndex: number,
  statIds: string[],
  id: string,
  layout: SummaryStatsLayout,
  isHorizontalLayout: boolean
): SeparatorConfig {
  const isLastStat = statIds.length > 0 && statIds.at(-1) === id;
  const isFirstColumn = (statIndex + 1) % 2 !== 0;
  const isInLastRow = statIndex >= statIds.length - 2;
  const showVerticalSeparator = layout === "grid" ? isFirstColumn : !isLastStat;
  const shouldAlwaysBeFlex = layout === "grid" || isHorizontalLayout;
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
      md: isGridVisible ? "block" : "none",
    } as const,
  };
}
