import React, { PropsWithChildren } from "react";
import { Box, BoxProps, Title } from "@nimbus-ds/components";

type LandingScreenSectionProps = {
  title: string;
};

const LandingScreenSection: React.FC<
  PropsWithChildren<
    LandingScreenSectionProps &
      Omit<
        BoxProps,
        | "display"
        | "flexDirection"
        | "px"
        | "py"
        | "gap"
        | "alignItems"
        | "maxWidth"
        | "mx"
      >
  >
> = ({ title, children, ...rest }) => (
  <Box
    display="flex"
    flexDirection="column"
    paddingTop="12"
    gap="10"
    maxWidth="1200px"
    width="100%"
    mx="auto"
    {...rest}
  >
    <Box display="flex" flexDirection="column" gap="4">
      <Box display="flex" flexDirection="column" gap="2">
        <Title as="h2" textAlign="left">
          {title}
        </Title>
      </Box>
    </Box>
    {children}
  </Box>
);

export { LandingScreenSection };
