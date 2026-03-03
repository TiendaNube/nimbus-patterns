import React from "react";

import { Box, Divider } from "@nimbus-ds/components";

import { ProductUpdatesFooterProps } from "./productUpdatesFooter.types";

const ProductUpdatesFooter: React.FC<ProductUpdatesFooterProps> = ({
  leftLink,
  paginator,
  rightButton,
  renderDivider,
  ...rest
}: ProductUpdatesFooterProps) => (
  <Box {...rest}>
    {renderDivider && (
      <Box>
        <Divider
          appearance="primary"
          marginLeft="-16px"
          marginRight="-16px"
          width="auto"
        />
      </Box>
    )}
    <Box
      paddingTop="4"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
    >
      {leftLink && (
        <Box display="flex" alignItems="center" flex="1" mr="2">
          {leftLink}
        </Box>
      )}

      {paginator && (
        <Box
          display="flex"
          flex="2"
          alignItems="center"
          justifyContent="flex-start"
        >
          {paginator}
        </Box>
      )}
      {rightButton && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          flex="1"
        >
          {rightButton}
        </Box>
      )}
    </Box>
  </Box>
);

ProductUpdatesFooter.displayName = "ProductUpdatesFooter";

export { ProductUpdatesFooter };
