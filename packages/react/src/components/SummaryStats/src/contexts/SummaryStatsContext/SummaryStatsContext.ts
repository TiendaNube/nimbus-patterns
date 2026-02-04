import { createContext, useContext } from "react";
import { SummaryStatsContextValue } from "./SummaryStatsContext.types";
import { initialSummaryStatsContextValue } from "./SummaryStatsContext.definitions";

export const SummaryStatsContext = createContext<
  SummaryStatsContextValue | undefined
>(undefined);

/**
 * Hook to access the SummaryStats context.
 * @param enforce When false, returns a default value if no provider is present.
 * @throws If `enforce=true` and used without a provider.
 */
export const useSummaryStatsContext = (enforce = true) => {
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
