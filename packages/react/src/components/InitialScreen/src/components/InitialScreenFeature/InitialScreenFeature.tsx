import React from "react";
import { Box, Title, Text } from "@nimbus-ds/components";
import { Layout } from "@nimbus-ds/layout";
import {
  InitialScreenFeatureItemProps,
  InitialScreenFeatureItemSpacingProps,
  InitialScreenFeatureProps,
} from "./initialScreenFeature.types";

/**
 * Feature item component for the InitialScreenItem. It is used to display a feature with a title, a description and the children, which can be any component (though it is often used with the ItemSpacing component).
 */
const InitialScreenFeatureItem: React.FC<InitialScreenFeatureItemProps> = ({
  title,
  description,
  children,
}) => (
  <Box display="flex" flexDirection="column" p="4" gap="1">
    <Title as="h4">{title}</Title>
    {description && <Text>{description}</Text>}

    {children && <Box paddingTop="3">{children}</Box>}
  </Box>
);

/**
 * Spacing component for the InitialScreenItem. It is used to separate the items in the feature, maintaining a consistent layout.
 */
const InitialScreenFeatureItemSpacing: React.FC<
  InitialScreenFeatureItemSpacingProps
> = ({ ...rest }) => (
  <Box
    borderTopWidth="1"
    borderBottomWidth="none"
    borderColor="neutral-surfaceHighlight"
    borderStyle="solid"
    {...rest}
  />
);

/**
 * Feature component for the InitialScreen. It is used to display a feature with content and an image.
 */
const InitialScreenFeature: React.FC<InitialScreenFeatureProps> = ({
  content,
  image,
  ...rest
}) => (
  <Layout
    columns="2 - symmetric"
    width="100%"
    gap="8"
    justifyContent="center"
    {...rest}
  >
    <Layout.Section justifyContent="center">
      <Box>{content}</Box>
    </Layout.Section>
    <Layout.Section justifyContent="center">
      <Box>{image}</Box>
    </Layout.Section>
  </Layout>
);

export {
  InitialScreenFeature,
  InitialScreenFeatureItem,
  InitialScreenFeatureItemSpacing,
};
