import React from "react";
import { Skeleton } from "@nimbus-ds/components";

import { InteractiveListCheckboxItemSkeletonProps } from "./interactiveListCheckboxItemSkeleton.types";
import { InteractiveListRow } from "..";
import { InteractiveList } from "../../InteractiveList";

const InteractiveListCheckboxItemSkeleton: React.FC<
  InteractiveListCheckboxItemSkeletonProps
> = ({
  className,
  style: _style,
  ...rest
}: InteractiveListCheckboxItemSkeletonProps) => (
  <InteractiveListRow className={className} role="menuitemcheckbox">
    <Skeleton width="1rem" height="1rem" borderRadius="0.25rem" />
    <InteractiveList.StructureSkeleton {...rest} />
  </InteractiveListRow>
);

export { InteractiveListCheckboxItemSkeleton };
