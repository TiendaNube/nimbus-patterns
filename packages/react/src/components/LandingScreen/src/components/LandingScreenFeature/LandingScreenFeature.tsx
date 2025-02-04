import React from "react";
import { Box, Title, Text } from "@nimbus-ds/components";
import { Layout } from "@nimbus-ds/layout";
import {
  LandingScreenFeatureItemProps,
  LandingScreenFeatureProps,
} from "./landingScreenFeature.types";

const LandingScreenFeatureImage: React.FC<React.PropsWithChildren> = ({
  children,
}) => <Box>{children}</Box>;

const LandingScreenFeatureItem: React.FC<LandingScreenFeatureItemProps> = ({
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

const LandingScreenFeatureItemSpacing: React.FC = () => (
  <Box
    borderTopWidth="1"
    borderBottomWidth="none"
    borderColor="neutral-surfaceHighlight"
    borderStyle="solid"
  />
);

const LandingScreenFeature: React.FC<LandingScreenFeatureProps> = ({
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
    <Layout.Section justifyContent="center">{image}</Layout.Section>
  </Layout>
);

export {
  LandingScreenFeature,
  LandingScreenFeatureItem,
  LandingScreenFeatureImage,
  LandingScreenFeatureItemSpacing,
};
