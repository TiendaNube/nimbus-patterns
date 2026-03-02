import React, { useState } from "react";

import {
  Text,
  Link,
  Box,
  IconButton,
  Icon,
  Popover,
} from "@nimbus-ds/components";
import { CloseIcon } from "@nimbus-ds/icons";
import {
  ProductUpdatesProps,
  ProductUpdatesComponents,
} from "./productUpdates.types";
import { ProductUpdatesPaginator, ProductUpdatesFooter } from "./components";

const ProductUpdates: React.FC<ProductUpdatesProps> &
  ProductUpdatesComponents = ({
  className: _className,
  style: _style,
  title,
  text,
  tag,
  bodyContent,
  dismissLink,
  bodyContentProps,
  ...rest
}: ProductUpdatesProps) => {
  const [visible, setVisibility] = useState(!!rest.visible);

  const handleVisibility = () => setVisibility(!visible);

  const handleDismiss = rest?.onVisibility
    ? () => rest.onVisibility?.(false)
    : handleVisibility;

  const productUpdatesContent = (
    <Box display="flex" flexDirection="column" gap="2" width="100%">
      {tag ? (
        <Box display="flex" flexDirection="row" alignItems="center" gap="2">
          {tag}
          <Text color="neutral-background" fontSize="base" fontWeight="bold">
            {title}
          </Text>
        </Box>
      ) : (
        <Text color="neutral-background" fontSize="base" fontWeight="bold">
          {title}
        </Text>
      )}
      <Text color="neutral-background" fontSize="base">
        {text}
      </Text>
    </Box>
  );

  const hasDismissLink = dismissLink ? (
    <Box
      display="flex"
      flexDirection="column"
      gap="4"
      width="100%"
      {...bodyContentProps}
    >
      {productUpdatesContent}
      {bodyContent}
      <Link as="button" onClick={handleDismiss} appearance="neutral-background">
        {dismissLink}
      </Link>
    </Box>
  ) : (
    <Box
      display="flex"
      flexDirection="column"
      gap="4"
      width="100%"
      {...bodyContentProps}
    >
      <Box pr="8" position="relative">
        {productUpdatesContent}
        <Box position="absolute" top="-16px" right="-16px">
          <IconButton
            onClick={handleDismiss}
            aria-label="Close"
            size="2.75rem"
            source={<Icon color="neutral-background" source={<CloseIcon />} />}
            borderColor="transparent"
            backgroundColor="transparent"
          />
        </Box>
      </Box>
      {bodyContent}
    </Box>
  );

  return (
    <Popover
      {...rest}
      backgroundColor="primary-interactiveHover"
      content={hasDismissLink}
      visible={rest.visible === undefined ? visible : rest.visible}
      onVisibility={
        rest.onVisibility ||
        ((newVisible: boolean) => setVisibility(newVisible))
      }
      enabledDismiss={false}
      enabledClick={false}
    />
  );
};

ProductUpdates.Paginator = ProductUpdatesPaginator;
ProductUpdates.Footer = ProductUpdatesFooter;

ProductUpdates.displayName = "ProductUpdates";
ProductUpdates.Paginator.displayName = "ProductUpdates.Paginator";
ProductUpdates.Footer.displayName = "ProductUpdates.Footer";

export { ProductUpdates };
