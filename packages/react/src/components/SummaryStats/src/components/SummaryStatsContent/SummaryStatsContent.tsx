import React from "react";

import { Box } from "@nimbus-ds/components";

import { useSummaryStatsContext } from "../../contexts";
import { SummaryStatsContentProps } from "./summaryStatsContent.types";

const SummaryStatsContent: React.FC<SummaryStatsContentProps> = ({
  className: _className,
  style: _style,
  children,
  ...rest
}: SummaryStatsContentProps) => {
  const { selectedId, expandable } = useSummaryStatsContext(false);

  // Only render if expandable mode is active and a stat is selected
  if (!expandable || !selectedId) {
    return null;
  }

  return (
    <Box
      {...rest}
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
      {children}
    </Box>
  );
};

SummaryStatsContent.displayName = "SummaryStatsContent";

export { SummaryStatsContent };
