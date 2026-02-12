import { SummaryStatsContextValue } from "./SummaryStatsContext.types";

/**
 * Default context value when SummaryStatsContext is consumed outside a provider.
 * activeId and onToggle/registerStat are no-ops; expandable is false, layout horizontal,
 * statIds empty, isHorizontalLayout false.
 */
export const initialSummaryStatsContextValue: SummaryStatsContextValue = {
  activeId: null,
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
