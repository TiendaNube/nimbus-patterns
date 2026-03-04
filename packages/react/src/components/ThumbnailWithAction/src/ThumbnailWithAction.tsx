import React from "react";

import { Thumbnail, Box } from "@nimbus-ds/components";

import { ThumbnailWithActionProps } from "./thumbnailWithAction.types";

import { contentPositions } from "./thumbnailWithAction.definitions";

const ThumbnailWithAction: React.FC<ThumbnailWithActionProps> = ({
  style,
  thumbnail,
  children,
  contentPosition = "top-right",
  ...rest
}: ThumbnailWithActionProps) => {
  const { top, left, right, bottom } = contentPositions[contentPosition];

  return (
    <Box
      position="relative"
      width="fit-content"
      borderRadius="2"
      overflow="hidden"
    >
      <Box
        {...rest}
        style={style}
        position="absolute"
        zIndex="100"
        top={top}
        left={left}
        right={right}
        bottom={bottom}
        p="2"
      >
        {children}
      </Box>
      <Thumbnail {...thumbnail} />
    </Box>
  );
};

ThumbnailWithAction.displayName = "ThumbnailWithAction";

export { ThumbnailWithAction };
