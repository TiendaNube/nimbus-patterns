import { createContext, useContext } from "react";
import { SummaryStatsContextValue } from "./SummaryStatsContext.types";
import { initialSummaryStatsContextValue } from "./SummaryStatsContext.definitions";

/**
 * React context for the SummaryStats compound component. Holds SummaryStatsContextValue
 * (activeId, onToggle, registerStat, expandable, layout, statIds, isMobileCarousel).
 * Consume via useSummaryStatsContext() inside SummaryStats children.
 */
export const SummaryStatsContext = createContext<
  SummaryStatsContextValue | undefined
>(undefined);

/**
 * Hook to access the SummaryStats context.
 * @param enforce When false, returns a default value if no provider is present.
 * @returns SummaryStatsContextValue from the nearest provider, or initial value when enforce is false.
 * @throws If `enforce=true` and used without a provider.
 */
export const useSummaryStatsContext = (
  enforce = true
): SummaryStatsContextValue => {
  const context = useContext(SummaryStatsContext);

  if (context === undefined) {
    if (!enforce) {
      return initialSummaryStatsContextValue;
    }

    throw new Error(
      "useSummaryStatsContext must be used within a SummaryStats component"
    );
  }

  return context;
};
