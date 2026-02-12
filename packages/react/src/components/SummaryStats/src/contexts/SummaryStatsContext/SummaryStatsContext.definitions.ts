import { SummaryStatsContextValue } from "./SummaryStatsContext.types";

/**
 * Default/fallback context value when SummaryStatsContext is consumed outside a provider.
 * @type {SummaryStatsContextValue}
 * - activeId: null (no stat active)
 * - onToggle, registerStat: no-op functions
 * - expandable: false; layout: "horizontal"; statIds: []; isHorizontalLayout: false
 * - isScrollPaneBlock: undefined; visibleStatIds: []
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
  statIds: [],
  isHorizontalLayout: false,
  visibleStatIds: [],
};
