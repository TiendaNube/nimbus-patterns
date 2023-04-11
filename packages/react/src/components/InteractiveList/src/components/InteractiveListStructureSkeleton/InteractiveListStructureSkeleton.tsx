import React from "react";
import { Box, Skeleton } from "@nimbus-ds/components";

import { InteractiveListStructureSkeletonProps } from "./interactiveListStructureSkeleton.types";

const InteractiveListStructureSkeleton: React.FC<
  InteractiveListStructureSkeletonProps
> = ({
  className: _className,
  style: _style,
  title,
  showTitle = true,
  description,
  children,
  ...rest
}: InteractiveListStructureSkeletonProps) => (
  <Box
    className={_className}
    style={_style}
    display="flex"
    flexDirection="column"
    gap="1"
    width="100%"
    flex="1 1 auto"
    {...rest}
  >
    {showTitle && (
      <Skeleton width="3rem" height="1.25rem" borderRadius="0.25rem" />
    )}
    {description && (
      <Skeleton width="15rem" height="1.25rem" borderRadius="0.25rem" />
    )}
    {children}
  </Box>
);

export { InteractiveListStructureSkeleton };
