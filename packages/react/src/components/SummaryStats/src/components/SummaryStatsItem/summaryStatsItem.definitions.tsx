import React from "react";

import { Icon } from "@nimbus-ds/components";
import { ChevronDownIcon, ChevronUpIcon } from "@nimbus-ds/icons";

import type { SummaryStatsLayout } from "../../contexts";
import type { SeparatorConfig } from "./summaryStatsItem.types";

export const ExpandableChevron: React.FC<{ isActive: boolean }> = ({
  isActive
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
      md: isGridVisible ? "block" : "none"
    } as const
  };
}

/**
 * Selector matching the interactive cells of a row. Static cells render no
 * `role` or `aria-expanded`, so they are skipped by arrow-key navigation.
 */
export const INTERACTIVE_CELL_SELECTOR = '[role="button"][aria-expanded]';

/**
 * Returns the interactive cell next to `current` inside `row`, in DOM order.
 * Returns `null` when `current` is at the edge of the row (no wrap-around) or
 * is not an interactive cell of that row.
 */
export function getAdjacentInteractiveCell(
  row: HTMLElement | null | undefined,
  current: HTMLElement,
  step: 1 | -1
): HTMLElement | null {
  if (!row) return null;
  const cells = Array.from(
    row.querySelectorAll<HTMLElement>(INTERACTIVE_CELL_SELECTOR)
  );
  const index = cells.indexOf(current);
  if (index === -1) return null;
  return cells[index + step] ?? null;
}

/**
 * Keyboard handling for an interactive cell. Enter and Space toggle the cell.
 * Unmodified Arrow Left/Right move focus to the adjacent interactive cell of
 * `row` and scroll it into view; the default action is prevented even at the
 * row edges. Other keys are left untouched and keep propagating.
 */
export function handleInteractiveCellKeyDown(
  event: React.KeyboardEvent<HTMLElement>,
  row: HTMLElement | null | undefined,
  onToggle: () => void
): void {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    onToggle();
    return;
  }
  const isArrow = event.key === "ArrowLeft" || event.key === "ArrowRight";
  const hasModifier =
    event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
  if (!isArrow || hasModifier) return;
  event.preventDefault();
  const nextCell = getAdjacentInteractiveCell(
    row,
    event.currentTarget,
    event.key === "ArrowRight" ? 1 : -1
  );
  if (!nextCell) return;
  nextCell.focus();
  if (typeof nextCell.scrollIntoView === "function") {
    nextCell.scrollIntoView({ block: "nearest", inline: "nearest" });
  }
}

/**
 * Surface and interaction attributes of a cell. Static cells only get the
 * resting surface: no hover surface, pointer, button role, focus stop,
 * `aria-expanded` or `aria-controls`. The active interactive cell references
 * the expanded area through `aria-controls` while `panelId` is defined.
 */
export function getCellInteractionProps(
  isInteractive: boolean,
  isActive: boolean,
  panelId?: string
) {
  if (!isInteractive) {
    return { backgroundColor: { xs: "neutral-background" } } as const;
  }
  return {
    backgroundColor: {
      xs: isActive ? "primary-surface" : "neutral-background",
      hover: isActive ? "primary-surface" : "neutral-surface"
    },
    cursor: "pointer",
    tabIndex: 0,
    role: "button",
    "aria-expanded": isActive,
    "aria-controls": isActive ? panelId : undefined
  } as const;
}
