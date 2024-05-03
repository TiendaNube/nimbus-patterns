import React from "react";

import { Box, Title, Text } from "@nimbus-ds/components";

import { EmptyAppContentTextElementProps } from "./emptyAppContentTextElement.types";

const EmptyAppContentTextElement: React.FC<EmptyAppContentTextElementProps> = ({
  title,
  content,
  bottomDivider = false,
  ...rest
}: EmptyAppContentTextElementProps) => (
  <>
    <Box {...rest} display="flex" flexDirection="column" gap="2">
      <Title as="h4">{title}</Title>
      <Text>{content}</Text>
    </Box>
    {bottomDivider && (
      <Box
        width="100%"
        borderTopWidth="1"
        borderColor="neutral-surfaceHighlight"
        borderStyle="solid"
      />
    )}
  </>
);

export { EmptyAppContentTextElement };
