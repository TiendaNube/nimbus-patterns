import React from "react";

import { IconButton } from "@nimbus-ds/components";

import { InteractiveListButtonItemSkeletonProps } from "./interactiveListButtonItemSkeleton.types";
import { InteractiveListRow } from "..";
import { InteractiveList } from "../../InteractiveList";

const InteractiveListButtonItemSkeleton: React.FC<
  InteractiveListButtonItemSkeletonProps
> = ({
  className: _className,
  style: _style,
  ...rest
}: InteractiveListButtonItemSkeletonProps) => (
  <InteractiveListRow>
    <InteractiveList.StructureSkeleton {...rest} />
    <IconButton.Skeleton />
  </InteractiveListRow>
);

export { InteractiveListButtonItemSkeleton };
