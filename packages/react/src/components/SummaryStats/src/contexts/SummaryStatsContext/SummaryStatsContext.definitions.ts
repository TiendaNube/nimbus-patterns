import { SummaryStatsContextValue } from "./SummaryStatsContext.types";

/**
 * Default/fallback context value when SummaryStatsContext is consumed outside a provider.
 * @type {SummaryStatsContextValue}
 * - activeId: null (no stat active)
 * - onToggle, registerStat, updateStat, unregisterStat: no-op functions
 * - expandable: false; layout: "horizontal"; statIds: []; isHorizontalLayout: false
 * - isScrollPaneBlock, panelId, rowRef: undefined; visibleStatIds: []
 */
export const initialSummaryStatsContextValue: SummaryStatsContextValue = {
  activeId: null,
  isScrollPaneBlock: undefined,
  onToggle: () => {
    /* noop */
  },
  expandable: false,
  layout: "horizontal",
  registerStat: () => {
    /* noop */
  },
  updateStat: () => {
    /* noop */
  },
  unregisterStat: () => {
    /* noop */
  },
  statIds: [],
  isHorizontalLayout: false,
  visibleStatIds: [],
  panelId: undefined,
  rowRef: undefined
};
