import React from "react";
import { Box, Title, Text } from "@nimbus-ds/components";
import { Layout } from "@nimbus-ds/layout";

const LandingScreenFeatureImage: React.FC<React.PropsWithChildren> = ({
  children,
}) => <Box>{children}</Box>;

type LandingScreenFeatureItemProps = {
  title: string;
  description: string;
};
const LandingScreenFeatureItem: React.FC<
  React.PropsWithChildren<LandingScreenFeatureItemProps>
> = ({ title, description, children }) => (
  <Box display="flex" flexDirection="column" p="4" gap="1">
    <Title as="h4">{title}</Title>
    {description && <Text>{description}</Text>}

    {children && <Box paddingTop="3">{children}</Box>}
  </Box>
);

type LandingScreenFeatureProps = {
  content: React.ReactNode;
  image: React.ReactNode;
};
const LandingScreenFeature: React.FC<LandingScreenFeatureProps> = ({
  content,
  image,
}) => (
  <Layout columns="2 - symmetric" width="100%" gap="8" justifyContent="center">
    <Layout.Section justifyContent="center">
      <Box>{content}</Box>
    </Layout.Section>
    <Layout.Section justifyContent="center">{image}</Layout.Section>
  </Layout>
);

const LandingScreenFeatureItemSpacing: React.FC = () => (
    <Box
      borderTopWidth="1"
      borderBottomWidth="none"
      borderColor="neutral-surfaceHighlight"
      borderStyle="solid"
     />
  );

export {
  LandingScreenFeature,
  LandingScreenFeatureItem,
  LandingScreenFeatureImage,
  LandingScreenFeatureItemSpacing,
};
