import React, { useState, useMemo, useCallback, ReactNode } from "react";

import { Box } from "@nimbus-ds/components";

import { SummaryStatsStat } from "./components";
import { SummaryStatsContext } from "./contexts";

import {
  SummaryStatsProps,
  SummaryStatsComponents,
} from "./summaryStats.types";

const SummaryStats: React.FC<SummaryStatsProps> & SummaryStatsComponents = ({
  className: _className,
  style: _style,
  children,
  layout = "horizontal",
  expandable = false,
  ...rest
}: SummaryStatsProps) => {
  const isExpandable = layout === "horizontal" && expandable;

  const [activeId, setActiveId] = useState<string | null>(null);
  const [statsRegistry, setStatsRegistry] = useState<Map<string, ReactNode>>(
    new Map()
  );
  const [statIds, setStatIds] = useState<string[]>([]);

  const handleToggle = useCallback((id: string) => {
    setActiveId((current) => (current === id ? null : id));
  }, []);

  const registerStat = useCallback((id: string, content: ReactNode) => {
    setStatsRegistry((prev) => new Map(prev).set(id, content));
    setStatIds((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
  }, []);

  const activeContent = useMemo(() => {
    if (!isExpandable || activeId === null) return null;
    return statsRegistry.get(activeId) ?? null;
  }, [isExpandable, activeId, statsRegistry]);

  const contextValue = useMemo(
    () => ({
      activeId,
      onToggle: handleToggle,
      expandable: isExpandable,
      layout,
      registerStat,
      statIds,
    }),
    [activeId, handleToggle, isExpandable, layout, registerStat, statIds]
  );

  return (
    <SummaryStatsContext.Provider value={contextValue}>
      <Box
        {...rest}
        display="flex"
        flexDirection="column"
        width="100%"
        backgroundColor="neutral-background"
        borderStyle="solid"
        borderWidth="1"
        borderColor="neutral-surfaceHighlight"
        borderRadius="2"
        overflow="hidden"
      >
        <Box
          display={layout === "grid" ? "grid" : "flex"}
          flexDirection={
            layout === "horizontal" ? { xs: "column", md: "row" } : undefined
          }
          alignItems="stretch"
          gridTemplateColumns={
            layout === "grid" ? { xs: "1fr", md: "1fr 1fr" } : undefined
          }
        >
          {children}
        </Box>

        {activeContent && (
          <Box
            display="flex"
            flexDirection="column"
            padding="4"
            margin="4"
            borderStyle="dashed"
            borderWidth="1"
            borderColor="neutral-surfaceHighlight"
            borderRadius="2"
            backgroundColor="neutral-background"
          >
            {activeContent}
          </Box>
        )}
      </Box>
    </SummaryStatsContext.Provider>
  );
};

SummaryStats.Stat = SummaryStatsStat;

SummaryStats.displayName = "SummaryStats";
SummaryStats.Stat.displayName = "SummaryStats.Stat";

export { SummaryStats };
