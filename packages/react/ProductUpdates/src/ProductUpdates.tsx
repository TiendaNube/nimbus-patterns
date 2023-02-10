import React, { useState } from "react";

import { Popover } from "@nimbus-ds/popover";
import { Text } from "@nimbus-ds/text";
import { Link } from "@nimbus-ds/link";
import { Box } from "@nimbus-ds/box";
import { IconButton } from "@nimbus-ds/icon-button";
import { Icon } from "@nimbus-ds/icon";

import { CloseIcon } from "@tiendanube/icons";
import { ProductUpdatesProps } from "./productUpdates.types";

const ProductUpdates: React.FC<ProductUpdatesProps> = ({
  className: _className,
  style: _style,
  title,
  text,
  bodyContent,
  dismissLink,
  ...rest
}: ProductUpdatesProps) => {
  const [visible, setVisibility] = useState(rest.visible);

  const handleVisibility = () => setVisibility(!visible);

  const productUpdatesContent = (
    <Box display="flex" flexDirection="column" gap="2" width="100%">
      <Text color="neutral.background" fontSize="base" fontWeight="bold">
        {title}
      </Text>
      <Text color="neutral.background" fontSize="base">
        {text}
      </Text>
    </Box>
  );

  const hasDismissLink = dismissLink ? (
    <Box display="flex" flexDirection="column" gap="4" width="100%">
      {productUpdatesContent}
      {bodyContent}
      <Link.Button
        onClick={handleVisibility}
        appearance="neutral.background"
        size="base"
      >
        {dismissLink}
      </Link.Button>
    </Box>
  ) : (
    <Box display="flex" flexDirection="column" gap="4" width="100%">
      <Box pr="8" position="relative">
        {productUpdatesContent}
        <Box position="absolute" top="-16px" right="-16px">
          <IconButton
            onClick={handleVisibility}
            size="2.75rem"
            source={<Icon color="neutral.background" source={<CloseIcon />} />}
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
      appearance="primary.interactiveHover"
      content={hasDismissLink}
      visible={visible}
      onVisibility={
        rest.onVisibility ||
        ((newVisible: boolean) => setVisibility(newVisible))
      }
      enabledDismiss={false}
    />
  );
};

export { ProductUpdates };
