import React, { useState, useMemo, useCallback } from "react";

import { Box } from "@nimbus-ds/components";

import { SummaryStatsStat, SummaryStatsContent } from "./components";
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
        {/* Stats row */}
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
          {(() => {
            const statChildren = React.Children.toArray(children).filter(
              (child) =>
                React.isValidElement(child) && child.type === SummaryStatsStat
            );

            return statChildren.map((child, index) => {
              const key = React.isValidElement(child)
                ? (child.props as { id?: string }).id ?? child.key
                : null;

              return (
                <React.Fragment key={key}>
                  {child}
                  {/* Render vertical divider between items (not after last) for horizontal layout */}
                  {layout === "horizontal" &&
                    index < statChildren.length - 1 && (
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
            });
          })()}
        </Box>

        {/* Content area (inside the card) */}
        {React.Children.map(children, (child) => {
          if (
            React.isValidElement(child) &&
            child.type === SummaryStatsContent
          ) {
            return child;
          }
          return null;
        })}
      </Box>
    </SummaryStatsContext.Provider>
  );
};

SummaryStats.Stat = SummaryStatsStat;
SummaryStats.Content = SummaryStatsContent;

SummaryStats.displayName = "SummaryStats";
SummaryStats.Stat.displayName = "SummaryStats.Stat";
SummaryStats.Content.displayName = "SummaryStats.Content";

export { SummaryStats };
