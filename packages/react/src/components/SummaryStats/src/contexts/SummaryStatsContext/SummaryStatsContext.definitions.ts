import { SummaryStatsContextValue } from "./SummaryStatsContext.types";

export const initialSummaryStatsContextValue: SummaryStatsContextValue = {
  activeIndex: null,
  onToggle: () => {
    /* noop */
  },
  expandable: false,
  layout: "horizontal",
};
