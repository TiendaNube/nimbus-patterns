import React from "react";
import { Skeleton } from "@nimbus-ds/components";

import { InteractiveListRadioItemSkeletonProps } from "./interactiveListRadioItemSkeleton.types";
import { InteractiveListRow } from "..";
import { InteractiveList } from "../../InteractiveList";

const InteractiveListRadioItemSkeleton: React.FC<
  InteractiveListRadioItemSkeletonProps
> = ({
  className,
  style: _style,
  ...rest
}: InteractiveListRadioItemSkeletonProps) => (
  <InteractiveListRow className={className}>
    <Skeleton width="1rem" height="1rem" borderRadius="0.75rem" />
    <InteractiveList.StructureSkeleton {...rest} />
  </InteractiveListRow>
);

export { InteractiveListRadioItemSkeleton };
