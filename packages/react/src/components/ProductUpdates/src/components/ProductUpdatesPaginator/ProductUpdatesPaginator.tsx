import React from "react";

import { Box } from "@nimbus-ds/components";

import { ProductUpdatesPaginatorProps } from "./productUpdatesPaginator.types";

const ProductUpdatesPaginator: React.FC<ProductUpdatesPaginatorProps> = ({
  totalItems,
  activeIndex,
  ...rest
}: ProductUpdatesPaginatorProps) => (
  <Box
    display="flex"
    flexDirection="row"
    gap="1-5"
    alignItems="center"
    role="img"
    aria-label={`Step ${activeIndex + 1} of ${totalItems}`}
    {...rest}
  >
    {Array.from({ length: totalItems }, (_, index) => index).map((index) => (
      <Box
        key={`paginator-dot-${index}`}
        width={index === activeIndex ? "24px" : "6px"}
        height="6px"
        borderRadius="full"
        backgroundColor={
          index === activeIndex ? "neutral-background" : "primary-textLow"
        }
        aria-hidden="true"
      />
    ))}
  </Box>
);

export { ProductUpdatesPaginator };
