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
  const [activeId, setActiveId] = useState<string | null>(null);
  const [statsRegistry, setStatsRegistry] = useState<Map<string, ReactNode>>(
    new Map()
  );

  const handleToggle = useCallback((id: string) => {
    setActiveId((current) => (current === id ? null : id));
  }, []);

  const registerStat = useCallback((id: string, content: ReactNode) => {
    setStatsRegistry((prev) => new Map(prev).set(id, content));
  }, []);

  const activeContent = useMemo(() => {
    if (!expandable || activeId === null) return null;
    return statsRegistry.get(activeId) ?? null;
  }, [expandable, activeId, statsRegistry]);

  const contextValue = useMemo(
    () => ({
      activeId,
      onToggle: handleToggle,
      expandable,
      layout,
      registerStat,
    }),
    [activeId, handleToggle, expandable, layout, registerStat]
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
