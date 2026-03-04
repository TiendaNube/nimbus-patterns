import React from "react";
import { Skeleton } from "@nimbus-ds/components";

import { InteractiveListToggleItemSkeletonProps } from "./interactiveListToggleItemSkeleton.types";
import { InteractiveListRow } from "..";
import { InteractiveList } from "../../InteractiveList";

const InteractiveListToggleItemSkeleton: React.FC<
  InteractiveListToggleItemSkeletonProps
> = ({
  className,
  style: _style,
  toggle,
  ...rest
}: InteractiveListToggleItemSkeletonProps) => (
  <InteractiveListRow className={className}>
    <InteractiveList.StructureSkeleton {...rest} />
    <Skeleton
      width="2rem"
      height="1rem"
      borderRadius="0.5rem"
      data-testid="toggle-skeleton"
    />
  </InteractiveListRow>
);

export { InteractiveListToggleItemSkeleton };
