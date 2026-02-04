import React, { useState, useMemo, useCallback } from "react";

import { Box, ScrollPane } from "@nimbus-ds/components";

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
  mobileLayout = "carousel",
  ...rest
}: SummaryStatsProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = useCallback((index: number) => {
    // Toggle: if already active, deactivate
    setActiveIndex((current) => (current === index ? null : index));
  }, []);

  const contextValue = useMemo(
    () => ({
      activeIndex,
      onToggle: handleToggle,
      expandable,
      layout,
    }),
    [activeIndex, handleToggle, expandable, layout]
  );

  // Filter stat children for reuse
  const statChildren = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === SummaryStatsStat
  );

  // Find the active stat's children (expanded content)
  const activeStatContent = useMemo(() => {
    if (!expandable || activeIndex === null) return null;

    const activeStat = statChildren[activeIndex];

    if (
      activeStat &&
      React.isValidElement(activeStat) &&
      (activeStat.props as { children?: React.ReactNode }).children
    ) {
      return (activeStat.props as { children?: React.ReactNode }).children;
    }

    return null;
  }, [expandable, activeIndex, statChildren]);

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
              ? child.key ?? index
              : index;

            // Clone child to inject the index
            const clonedChild = React.isValidElement(child)
              ? React.cloneElement(child, { _index: index } as Record<
                  string,
                  unknown
                >)
              : child;

            return (
              <React.Fragment key={key}>
                {clonedChild}
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

        {/* Mobile carousel using ScrollPane (only visible on xs when carousel is enabled) */}
        {shouldUseCarousel && (
          <Box display={{ xs: "block", md: "none" }}>
            <ScrollPane enableGrabScroll>
              <Box display="flex" gap="none">
                {statChildren.map((child, index) => {
                  const key = React.isValidElement(child)
                    ? child.key ?? index
                    : index;

                  const itemCount = statChildren.length;
                  const visibleItems = Math.min(3, itemCount);
                  const itemWidthPercent = 100 / visibleItems;

                  // Clone child to inject the index
                  const clonedChild = React.isValidElement(child)
                    ? React.cloneElement(child, { _index: index } as Record<
                        string,
                        unknown
                      >)
                    : child;

                  return (
                    <React.Fragment key={key}>
                      <Box
                        display="flex"
                        flexShrink="0"
                        style={{
                          width: `${itemWidthPercent}%`,
                          minWidth: `${itemWidthPercent}%`,
                        }}
                      >
                        {clonedChild}
                      </Box>
                      {/* Render vertical divider between items (not after last) */}
                      {index < itemCount - 1 && (
                        <Box
                          display="flex"
                          alignItems="center"
                          paddingY="2"
                          flexShrink="0"
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
            </ScrollPane>
          </Box>
        )}

        {/* Content area from active Stat's children */}
        {activeStatContent && (
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
            {activeStatContent}
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
