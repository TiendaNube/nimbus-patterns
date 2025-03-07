import React from "react";

import { Box, Thumbnail } from "@nimbus-ds/components";

import { EmptyAppContentImageElementProperties } from "./emptyAppContentImageElement.types";

const EmptyAppContentImageElement: React.FC<
  EmptyAppContentImageElementProperties
> = ({ ...rest }: EmptyAppContentImageElementProperties) => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    borderRadius="6"
    borderWidth="5"
    borderStyle="solid"
    borderColor="neutral-interactive"
    maxWidth="480px"
    width="100%"
  >
    <Thumbnail aspectRatio="4/3" width="100%" {...rest} />
  </Box>
);

export { EmptyAppContentImageElement };
