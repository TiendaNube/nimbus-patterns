import { SummaryStatsContextValue } from "./SummaryStatsContext.types";

export const initialSummaryStatsContextValue: SummaryStatsContextValue = {
  selectedId: null,
  onSelect: () => {
    /* noop */
  },
  expandable: false,
  layout: "horizontal",
};
