import React from "react";

import { Box, Title, Text, Thumbnail } from "@nimbus-ds/components";
import { Layout } from "@nimbus-ds/patterns";
import { useTheme } from "@nimbus-ds/styles";
import tokens from "@nimbus-ds/tokens/dist/js/tokens";

import { EmptyAppHeroSectionProps } from "./emptyAppHeroSection.types";

const EmptyAppHeroSection: React.FC<EmptyAppHeroSectionProps> = ({
  title,
  subtitle,
  content,
  actions,
  ...rest
}: EmptyAppHeroSectionProps) => {
  const { currentTheme } = useTheme();
  const theme =
    currentTheme === "base" || currentTheme === "next" ? "light" : "dark";
  return (
    <Box
      backgroundImage={`linear-gradient(to bottom,${tokens.color[theme].primary.interactive.value} 55%,${tokens.color[theme].neutral.background.value} 100%)`}
      minHeight="560px"
      pt={{
        xs: "12",
        md: "none"
      }}
      {...rest}
    >
      <Box
        display="flex"
        flexDirection={{
          xs: "column",
          md: "row"
        }}
        alignItems={{
          md: "center"
        }}
        justifyContent="space-between"
        gap="8"
        p="4"
        mx="auto"
        maxWidth="1200px"
        height="100%"
      >
        <Layout columns="2 - symmetric">
          <Layout.Section justifyContent="center">
            <Box display="flex" flexDirection="column" gap="2">
              {subtitle && (
                <Title as="h4" color="neutral-background">
                  {subtitle}
                </Title>
              )}
              <Title as="h1" color="neutral-background">
                {title}
              </Title>
              <Text color="neutral-background" fontSize="highlight">
                {content}
              </Text>
            </Box>
            {actions && (
              <Box display="flex" gap="2">
                {actions}
              </Box>
            )}
          </Layout.Section>
          <Layout.Section position="relative" pr="5" pt="5">
            <Box
              borderRadius="4"
              overflow="hidden"
              position="relative"
              zIndex="200"
            >
              <Thumbnail
                width="100%"
                alt={rest.alt}
                src={rest.src}
                aspectRatio="4/3"
              />
            </Box>
            <Box
              top={{ xs: "-4px", md: "-10px" }}
              left={{ xs: "4px", md: "10px" }}
              position="absolute"
              width="100%"
              height="100%"
              borderRadius="4"
              backgroundColor="primary-textLow"
              zIndex="100"
            />
          </Layout.Section>
        </Layout>
      </Box>
    </Box>
  );
};

export { EmptyAppHeroSection };
