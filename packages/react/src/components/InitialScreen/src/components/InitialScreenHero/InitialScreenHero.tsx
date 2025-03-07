import React from "react";
import { Box, Text, Title } from "@nimbus-ds/components";
import { InitialScreenHeroProps } from "./initialScreenHero.types";

/**
 * Hero component for the InitialScreen. It is used to display a hero with a title, a subtitle, a description, actions, bullets
 * and an image. It is generally used for the main content of the initial screen.
 */
const InitialScreenHero: React.FC<InitialScreenHeroProps> = ({
  title,
  subtitle,
  description,
  actions,
  bullets,
  image,
  children,
  ...rest
}) => (
    <Box
      alignItems={{
        md: "center",
      }}
      mx="auto"
      {...rest}
    >
      <Box
        display="flex"
        flexDirection={{ md: "row", xs: "column" }}
        gap={{ xs: "4", md: "12" }}
      >
        <Box
          display="flex"
          alignSelf="center"
          boxSizing="border-box"
          alignItems="center"
        >
          <Box
            display="flex"
            maxWidth={{ xs: "192px", md: "280px", lg: "280px", xl: "320px" }}
            maxHeight={{ xs: "192px", md: "280px", lg: "280px", xl: "320px" }}
            minWidth={{ md: "280px", xl: "320px" }}
            minHeight={{ md: "280px", xl: "320px" }}
          >
            {image}
          </Box>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          boxSizing="border-box"
          justifyContent="center"
          gap={{ xs: "4", md: "9" }}
        >
          <Box display="flex" flexDirection="column" gap="2">
            {subtitle && <Text color="neutral-textLow">{subtitle}</Text>}
            <Box display="flex" flexDirection="column" gap="4">
              <Title
                as="h1"
                fontSize={{ md: "8", xs: "6" }}
                lineHeight={{ xs: "6", md: "10" }}
              >
                {title}
              </Title>
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
            <Box
              display="flex"
              flexDirection={{ md: "row", xs: "column" }}
              gap="2"
              justifyContent={{ xs: "center", md: "flex-start" }}
              alignItems={{ xs: "center", md: "flex-start" }}
            >
              {actions}
            </Box>
          )}

          {children && <Box paddingTop="3">{children}</Box>}
        </Box>
      </Box>
    </Box>
  );

export { InitialScreenHero };
