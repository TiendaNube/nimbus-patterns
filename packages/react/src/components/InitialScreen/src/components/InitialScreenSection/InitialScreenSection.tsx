import React from "react";
import { Box, Title } from "@nimbus-ds/components";
import { InitialScreenSectionProps } from "./initialScreenSection.types";

/**
 * Section component for the InitialScreen. It is used to display a section with a title and children, generally used for separating
 * content in the initial screen, maintaining a consistent layout.
 */
const InitialScreenSection: React.FC<InitialScreenSectionProps> = ({
  title,
  children,
  ...rest
}) => (
  <Box
    display="flex"
    flexDirection="column"
    paddingTop={{ xs: "10", md: "12" }}
    paddingBottom={{ xs: "10", md: "none" }}
    gap={{ xs: "6", md: "8" }}
    px={{ xs: "8", md: "none" }}
    maxWidth="1200px"
    width="100%"
    mx="auto"
    {...rest}
  >
    <Box display="flex" flexDirection="column" gap="4">
      <Box display="flex" flexDirection="column" gap="2">
        <Title
          as="h2"
          fontSize={{ xs: "h3", md: "h2" }}
          textAlign={{ xs: "center", md: "left" }}
        >
          {title}
        </Title>
      </Box>
    </Box>
    {children}
  </Box>
);

export { InitialScreenSection };
