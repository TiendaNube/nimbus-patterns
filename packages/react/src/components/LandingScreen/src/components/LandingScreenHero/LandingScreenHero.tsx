import React, { PropsWithChildren, ReactElement } from "react";
import { Box, Text, Thumbnail, Title } from "@nimbus-ds/components";
import { Layout } from "@nimbus-ds/layout";
import LandingScreenheroBullet, {
  LandingScreenheroBulletProps,
} from "../LandingScreenHeroBullet";

type HeroImage = {
  alt: string;
  src: string;
};

type BaseHeroProps = {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  image: HeroImage;
  alt?: string;
  src?: string;
};

type HeroWithDescription = BaseHeroProps & {
  description: string;
  bullets?: never;
};

type HeroWithBullets = BaseHeroProps & {
  description?: never;
  bullets: ReactElement<
    LandingScreenheroBulletProps,
    typeof LandingScreenheroBullet
  >[];
};

/**
 * Only one of 'description' or 'bullets' can be used at the same time.
 */
const LandingScreenHero: React.FC<
  PropsWithChildren<HeroWithDescription | HeroWithBullets>
> = ({ title, subtitle, description, actions, bullets, image }) => {
  return (
    <Box
      display="flex"
      flexDirection={{
        xs: "column",
        md: "row",
      }}
      alignItems={{
        md: "center",
      }}
      justifyContent="space-between"
      py="4"
      paddingBottom="16"
      px={{ xs: "4", md: "6" }}
      mx="auto"
      maxWidth="1200px"
      height="100%"
    >
      <Layout columns="2 - symmetric" gap="12">
        <Layout.Section position="relative" pt="5">
          <Box
            borderRadius="4"
            overflow="hidden"
            position="relative"
            zIndex="200"
          >
            <Thumbnail
              width="100%"
              alt={image.alt ?? ""}
              src={image.src}
              aspectRatio="4/3"
            />
          </Box>
        </Layout.Section>
        <Layout.Section justifyContent="center" gap="9">
          <Box display="flex" flexDirection="column" gap="2">
            {subtitle && <Text color="neutral-textLow">{subtitle}</Text>}
            <Box display="flex" flexDirection="column" gap="4">
              <Box display="flex" gap="2" alignItems="center">
                <Title as="h1">{title}</Title>
              </Box>
              {description && (
                <Text color="danger-textHigh">{description}</Text>
              )}
              {bullets && (
                <Box display="flex" flexDirection="column" gap="3">
                  {bullets}
                </Box>
              )}
            </Box>
          </Box>
          {actions && (
            <Box display="flex" gap="2">
              {actions}
            </Box>
          )}
        </Layout.Section>
      </Layout>
    </Box>
  );
};

export { LandingScreenHero };
