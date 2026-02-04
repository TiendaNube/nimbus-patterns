import React from "react";

import { Box } from "@nimbus-ds/components";

import { SummaryStatsCarouselProps } from "./summaryStatsCarousel.types";

/**
 * Internal carousel component for displaying SummaryStats items
 * in a horizontally scrollable container on mobile devices.
 * Uses CSS scroll-snap for smooth carousel behavior.
 */
const SummaryStatsCarousel: React.FC<SummaryStatsCarouselProps> = ({
  className: _className,
  style: _style,
  children,
  ...rest
}: SummaryStatsCarouselProps) => {
  const childrenArray = React.Children.toArray(children);
  const itemCount = childrenArray.length;

  // Calculate the width percentage for each item
  // Show 3 items at a time, but adjust if fewer items
  const visibleItems = Math.min(3, itemCount);
  const itemWidthPercent = 100 / visibleItems;

  return (
    <Box
      {...rest}
      display={{ xs: "flex", md: "none" }}
      width="100%"
      overflow="hidden"
    >
      <Box
        display="flex"
        width="100%"
        overflow="auto"
        gap="none"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
        }}
      >
        {childrenArray.map((child, index) => {
          const key = React.isValidElement(child)
            ? (child.props as { id?: string }).id ?? child.key ?? index
            : index;

          return (
            <React.Fragment key={key}>
              <Box
                display="flex"
                flexShrink="0"
                style={{
                  scrollSnapAlign: "start",
                  width: `${itemWidthPercent}%`,
                  minWidth: `${itemWidthPercent}%`,
                }}
              >
                {child}
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
    </Box>
  );
};

SummaryStatsCarousel.displayName = "SummaryStatsCarousel";

export { SummaryStatsCarousel };
