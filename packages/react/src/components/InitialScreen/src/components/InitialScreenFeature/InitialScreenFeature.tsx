import React from "react";
import { Box, Title, Text } from "@nimbus-ds/components";
import { Layout } from "@nimbus-ds/layout";
import {
  InitialScreenFeatureItemProperties,
  InitialScreenFeatureItemSpacingProps,
  InitialScreenFeatureProperties,
} from "./initialScreenFeature.types";

/**
 * Feature item component for the InitialScreenItem. It is used to display a feature with a title, a description and the children, which can be any component (though it is often used with the ItemSpacing component).
 */
const InitialScreenFeatureItem: React.FC<
  InitialScreenFeatureItemProperties
> = ({ title, description, children }) => (
  <Box py="4">
    <Box px="4" display="flex" flexDirection="column" gap="1">
      <Box paddingLeft={{ xs: "none", md: "1" }}>
        <Title as="h4">{title}</Title>
      </Box>
      {description && <Text>{description}</Text>}
    </Box>

    {children && <Box paddingTop="4">{children}</Box>}
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
const InitialScreenFeature: React.FC<InitialScreenFeatureProperties> = ({
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
    <Layout.Section justifyContent="center" order={{ xs: "-1", md: "initial" }}>
      <Box justifyContent="center" display="flex">
        {image}
      </Box>
    </Layout.Section>
  </Layout>
);

export {
  InitialScreenFeature,
  InitialScreenFeatureItem,
  InitialScreenFeatureItemSpacing,
};
