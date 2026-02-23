import React, { useState, useMemo, useCallback, ReactNode } from "react";

import { Box, ScrollPane } from "@nimbus-ds/components";

import { SummaryStatsItem } from "./components";
import { SummaryStatsContext } from "./contexts";

import {
  SummaryStatsProps,
  SummaryStatsComponents,
} from "./summaryStats.types";

/**
 * SummaryStats displays a set of stat blocks in a configurable layout. Use
 * {@link SummaryStatsProps} for the full props type and {@link SummaryStatsComponents}
 * for the compound component API (e.g. SummaryStats.Item).
 *
 * Layout can be horizontal (single row, optionally with scroll/expand) or grid
 * (2-column). When layout is "horizontal" and expandable is true, clicking a
 * stat toggles an expanded area below showing that stat's extra content.
 *
 * @param props - See SummaryStatsProps
 * @param props.className - Optional CSS class for the root element
 * @param props.style - Optional inline styles for the root element
 * @param props.children - Stat items, typically SummaryStats.Item components
 * @param props.layout - "horizontal" (default) or "grid"; controls row vs grid layout
 * @param props.expandable - When true and layout is horizontal, stats are expandable
 * @param props.activeStatId - Optional. Controlled active stat id. Pass `null` for none.
 * @param props.onActiveStatIdChange - Optional. Callback when active stat changes.
 * @param props.rest - Remaining HTML element attributes (spread to root Box)
 */
const SummaryStats: React.FC<SummaryStatsProps> & SummaryStatsComponents = ({
  className: _className,
  style: _style,
  children,
  layout = "horizontal",
  expandable = false,
  activeStatId,
  onActiveStatIdChange,
  ...rest
}: SummaryStatsProps) => {
  const isExpandable = layout === "horizontal" && expandable;
  const isControlled = activeStatId !== undefined;

  const [internalActiveId, setInternalActiveId] = useState<string | null>(null);
  const activeId = isControlled ? activeStatId ?? null : internalActiveId;

  const [statsRegistry, setStatsRegistry] = useState<Map<string, ReactNode>>(
    new Map()
  );
  const [statIds, setStatIds] = useState<string[]>([]);
  const [scrollPaneStatIds, setScrollPaneStatIds] = useState<string[]>([]);

  const handleToggle = useCallback(
    (id: string) => {
      const nextId = activeId === id ? null : id;
      if (!isControlled) {
        setInternalActiveId(nextId);
      }
      onActiveStatIdChange?.(nextId);
    },
    [activeId, isControlled, onActiveStatIdChange]
  );

  const registerStat = useCallback(
    (id: string, content: ReactNode, isScrollPane?: boolean) => {
      setStatsRegistry((prev) => new Map(prev).set(id, content));
      if (isScrollPane) {
        setScrollPaneStatIds((prev) => {
          if (prev.includes(id)) return prev;
          return [...prev, id];
        });
      } else {
        setStatIds((prev) => {
          if (prev.includes(id)) return prev;
          return [...prev, id];
        });
      }
    },
    []
  );

  const unregisterStat = useCallback(
    (id: string) => {
      setStatsRegistry((prev) => {
        const next = new Map(prev);
        next.delete(id);
        return next;
      });
      setStatIds((prev) => prev.filter((sid) => sid !== id));
      setScrollPaneStatIds((prev) => prev.filter((sid) => sid !== id));
      if (!isControlled) {
        setInternalActiveId((current) => (current === id ? null : current));
      }
    },
    [isControlled]
  );

  const activeContent = useMemo(() => {
    if (!isExpandable || activeId === null) return null;
    return statsRegistry.get(activeId) ?? null;
  }, [isExpandable, activeId, statsRegistry]);

  const isHorizontalLayout = layout === "horizontal";

  const baseContextValue = useMemo(
    () => ({
      activeId,
      onToggle: handleToggle,
      expandable: isExpandable,
      layout,
      registerStat,
      unregisterStat,
      statIds,
      isHorizontalLayout,
      visibleStatIds: statIds,
    }),
    [
      activeId,
      handleToggle,
      isExpandable,
      layout,
      registerStat,
      unregisterStat,
      statIds,
      isHorizontalLayout,
    ]
  );

  const scrollPaneContextValue = useMemo(
    () => ({
      ...baseContextValue,
      isScrollPaneBlock: true as const,
      statIds: scrollPaneStatIds,
      visibleStatIds: scrollPaneStatIds,
    }),
    [baseContextValue, scrollPaneStatIds]
  );

  const desktopContextValue = useMemo(
    () => ({
      ...baseContextValue,
      isScrollPaneBlock: false as const,
    }),
    [baseContextValue]
  );

  return (
    <SummaryStatsContext.Provider value={baseContextValue}>
      <Box
        {...rest}
        display="flex"
        flexDirection="column"
        width="100%"
        backgroundColor="neutral-background"
        boxShadow="2"
        borderRadius="2"
        overflow="hidden"
      >
        {layout === "grid" && (
          <Box
            display="grid"
            alignItems="stretch"
            gridTemplateColumns="1fr 1fr"
            padding="1"
          >
            {children}
          </Box>
        )}

        {layout === "horizontal" && (
          <SummaryStatsContext.Provider value={scrollPaneContextValue}>
            <Box display={{ xs: "block", md: "none" }}>
              <ScrollPane showGradients enableGrabScroll>
                <Box display="flex" flexDirection="row" alignItems="stretch">
                  {children}
                </Box>
              </ScrollPane>
            </Box>
          </SummaryStatsContext.Provider>
        )}

        {layout === "horizontal" && (
          <SummaryStatsContext.Provider value={desktopContextValue}>
            <Box
              display={{ xs: "none", md: "flex" }}
              flexDirection="row"
              alignItems="stretch"
              padding="1"
            >
              {children}
            </Box>
          </SummaryStatsContext.Provider>
        )}

        {activeContent && (
          <Box
            display="flex"
            flexDirection="column"
            padding="4"
            margin="4"
            backgroundColor="neutral-background"
          >
            {activeContent}
          </Box>
        )}
      </Box>
    </SummaryStatsContext.Provider>
  );
};

SummaryStats.Item = SummaryStatsItem;

SummaryStats.displayName = "SummaryStats";
SummaryStats.Item.displayName = "SummaryStats.Item";

export { SummaryStats };
