import React from "react";
import { Box, Text } from "@nimbus-ds/components";
import { LandingScreenModuleProps } from "./landingScreenModule.types";

/**
 * Module component for the LandingScreen. It is used to display a module with a title and a description, and children component,
 * generally used for application modules or callout cards.
 */
const LandingScreenModule: React.FC<LandingScreenModuleProps> = ({
  title,
  description,
  children,
  ...rest
}) => (
  <Box display="flex" flexDirection="column" gap="4" {...rest}>
    <Box display="flex" flexDirection="column" gap="2">
      <Text fontSize="highlight" fontWeight="medium" color="neutral-textHigh">
        {title}
      </Text>
      {description && <Text fontSize="caption">{description}</Text>}
    </Box>

    {children}
  </Box>
);

export { LandingScreenModule };
