import React, { useState, useMemo, useCallback } from "react";

import { Box } from "@nimbus-ds/components";

import { SummaryStatsStat, SummaryStatsCarousel } from "./components";
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
  defaultSelectedId,
  selectedId: controlledSelectedId,
  onSelect,
  mobileLayout = "carousel",
  ...rest
}: SummaryStatsProps) => {
  const [internalSelectedId, setInternalSelectedId] = useState<string | null>(
    defaultSelectedId ?? null
  );

  // Use controlled value if provided, otherwise use internal state
  const selectedId = controlledSelectedId ?? internalSelectedId;

  const handleSelect = useCallback(
    (id: string) => {
      // Toggle selection: if already selected, deselect
      const newSelectedId = selectedId === id ? null : id;

      if (controlledSelectedId === undefined) {
        setInternalSelectedId(newSelectedId);
      }

      if (onSelect && newSelectedId) {
        onSelect(newSelectedId);
      }
    },
    [selectedId, controlledSelectedId, onSelect]
  );

  const contextValue = useMemo(
    () => ({
      selectedId,
      onSelect: handleSelect,
      expandable,
      layout,
    }),
    [selectedId, handleSelect, expandable, layout]
  );

  // Filter stat children for reuse
  const statChildren = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === SummaryStatsStat
  );

  // Find the selected stat's children (expanded content)
  const selectedStatContent = useMemo(() => {
    if (!expandable || !selectedId) return null;

    const selectedStat = statChildren.find(
      (child) =>
        React.isValidElement(child) &&
        (child.props as { id?: string }).id === selectedId
    );

    if (
      selectedStat &&
      React.isValidElement(selectedStat) &&
      (selectedStat.props as { children?: React.ReactNode }).children
    ) {
      return (selectedStat.props as { children?: React.ReactNode }).children;
    }

    return null;
  }, [expandable, selectedId, statChildren]);

  // Determine if carousel should be used on mobile
  // Only for horizontal layout with more than 3 items
  const shouldUseCarousel =
    layout === "horizontal" &&
    mobileLayout === "carousel" &&
    statChildren.length > 3;

  return (
    <SummaryStatsContext.Provider value={contextValue}>
      {/* Card container with border and rounded corners */}
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
        {/* Desktop stats row (always visible on md+, hidden on xs if carousel is used) */}
        <Box
          display={
            layout === "grid"
              ? "grid"
              : { xs: shouldUseCarousel ? "none" : "flex", md: "flex" }
          }
          flexDirection={
            layout === "horizontal" ? { xs: "column", md: "row" } : undefined
          }
          alignItems="stretch"
          gridTemplateColumns={
            layout === "grid" ? { xs: "1fr", md: "1fr 1fr" } : undefined
          }
        >
          {statChildren.map((child, index) => {
            const key = React.isValidElement(child)
              ? (child.props as { id?: string }).id ?? child.key
              : null;

            return (
              <React.Fragment key={key}>
                {child}
                {/* Render vertical divider between items (not after last) for horizontal layout */}
                {layout === "horizontal" && index < statChildren.length - 1 && (
                  <Box
                    display={{ xs: "none", md: "flex" }}
                    alignItems="center"
                    paddingY="2"
                  >
                    <Box
                      backgroundColor="neutral-surfaceHighlight"
                      width="1px"
                      height="100%"
                    />
                  </Box>
                )}
              </React.Fragment>
            );
          })}
        </Box>

        {/* Mobile carousel (only visible on xs when carousel is enabled) */}
        {shouldUseCarousel && (
          <SummaryStatsCarousel>{statChildren}</SummaryStatsCarousel>
        )}

        {/* Content area from selected Stat's children */}
        {selectedStatContent && (
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
            {selectedStatContent}
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
