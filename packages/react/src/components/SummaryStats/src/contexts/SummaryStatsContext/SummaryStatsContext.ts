import { createContext, useContext } from "react";
import { SummaryStatsContextValue } from "./SummaryStatsContext.types";
import { initialSummaryStatsContextValue } from "./SummaryStatsContext.definitions";

/**
 * React context that powers the SummaryStats compound component pattern.
 * It holds shared state and callbacks (activeId, onToggle, registerStat, expandable,
 * layout, statIds, isHorizontalLayout) so child components (e.g. SummaryStatsStat,
 * SummaryStatsTrendIndicator) can coordinate without prop drilling.
 *
 * **Type:** `SummaryStatsContextValue | undefined` — undefined when consumed
 * outside a provider.
 *
 * **Usage:** Consumers should not read this context directly. Use the
 * {@link useSummaryStatsContext} hook instead to get typed access and proper
 * handling when used outside a SummaryStats provider.
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
