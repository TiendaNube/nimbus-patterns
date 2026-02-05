import { SummaryStatsContextValue } from "./SummaryStatsContext.types";

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
};
