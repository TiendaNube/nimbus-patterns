import React, { useState, useMemo, useCallback, useRef } from "react";

import { Box, ScrollPane } from "@nimbus-ds/components";

import { useRandomId } from "@common/hooks";
import { SummaryStatsItem } from "./components";
import { SummaryStatsContext } from "./contexts";
import type { SummaryStatsRegistryEntry } from "./contexts/SummaryStatsContext/SummaryStatsContext.types";

import {
  SummaryStatsProps,
  SummaryStatsComponents
} from "./summaryStats.types";

/**
 * SummaryStats displays a set of stat blocks in a configurable layout. Use
 * {@link SummaryStatsProps} for the full props type and {@link SummaryStatsComponents}
 * for the compound component API (e.g. SummaryStats.Item).
 *
 * Layout can be horizontal (single row, optionally with scroll/expand) or grid
 * (2-column). When layout is "horizontal" and expandable is true, clicking a
 * stat toggles an expanded area below showing that stat's extra content.
 * Each SummaryStats.Item can override the container value with its own
 * `expandable` prop, so static and interactive stats can share a row. Arrow
 * keys move focus between the interactive stats of the same row.
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

  const [statsRegistry, setStatsRegistry] = useState<
    Map<string, SummaryStatsRegistryEntry>
  >(new Map());
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

  const panelId = useRandomId();
  const scrollRowRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  const registerStat = useCallback((id: string, isScrollPane?: boolean) => {
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
  }, []);

  const updateStat = useCallback(
    (id: string, entry: SummaryStatsRegistryEntry) => {
      setStatsRegistry((prev) => {
        const current = prev.get(id);
        if (
          current?.content === entry.content &&
          current?.expandable === entry.expandable
        ) {
          return prev;
        }
        return new Map(prev).set(id, entry);
      });
    },
    []
  );

  const unregisterStat = useCallback((id: string) => {
    setStatsRegistry((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
    setStatIds((prev) => prev.filter((sid) => sid !== id));
    setScrollPaneStatIds((prev) => prev.filter((sid) => sid !== id));
    setInternalActiveId((current) => (current === id ? null : current));
  }, []);

  const isHorizontalLayout = layout === "horizontal";

  const activeContent = useMemo(() => {
    if (!isHorizontalLayout || activeId === null) return null;
    const activeEntry = statsRegistry.get(activeId);
    if (!activeEntry?.expandable) return null;
    if (React.Children.toArray(activeEntry.content).length === 0) return null;
    return activeEntry.content;
  }, [isHorizontalLayout, activeId, statsRegistry]);

  const showPanel = activeContent !== null;

  const baseContextValue = useMemo(
    () => ({
      activeId,
      onToggle: handleToggle,
      expandable: isExpandable,
      layout,
      registerStat,
      updateStat,
      unregisterStat,
      statIds,
      isHorizontalLayout,
      visibleStatIds: statIds,
      panelId: showPanel ? panelId : undefined
    }),
    [
      activeId,
      handleToggle,
      isExpandable,
      layout,
      registerStat,
      updateStat,
      unregisterStat,
      statIds,
      isHorizontalLayout,
      showPanel,
      panelId
    ]
  );

  const scrollPaneContextValue = useMemo(
    () => ({
      ...baseContextValue,
      isScrollPaneBlock: true as const,
      statIds: scrollPaneStatIds,
      visibleStatIds: scrollPaneStatIds,
      rowRef: scrollRowRef
    }),
    [baseContextValue, scrollPaneStatIds]
  );

  const desktopContextValue = useMemo(
    () => ({
      ...baseContextValue,
      isScrollPaneBlock: false as const,
      rowRef
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
        {isHorizontalLayout && (
          <SummaryStatsContext.Provider value={scrollPaneContextValue}>
            <Box display={{ xs: "block", md: "none" }}>
              <ScrollPane showGradients enableGrabScroll>
                <Box
                  ref={scrollRowRef}
                  display="flex"
                  flexDirection="row"
                  alignItems="stretch"
                >
                  {children}
                </Box>
              </ScrollPane>
            </Box>
          </SummaryStatsContext.Provider>
        )}

        <SummaryStatsContext.Provider value={desktopContextValue}>
          <Box
            ref={rowRef}
            display={isHorizontalLayout ? { xs: "none", md: "flex" } : "grid"}
            flexDirection={isHorizontalLayout ? "row" : undefined}
            gridTemplateColumns={isHorizontalLayout ? undefined : "1fr 1fr"}
            alignItems="stretch"
            padding="1"
          >
            {children}
          </Box>
        </SummaryStatsContext.Provider>

        {showPanel && (
          <Box paddingLeft="1" paddingRight="1" paddingBottom="1">
            <Box
              id={panelId}
              display="flex"
              flexDirection="column"
              padding="3"
              backgroundColor="neutral-background"
            >
              {activeContent}
            </Box>
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
