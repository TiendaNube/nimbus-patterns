import React from "react";
import { Box, Text } from "@nimbus-ds/components";
import { LandingScreenModuleProps } from "./landingScreenModule.types";

const LandingScreenModule: React.FC<LandingScreenModuleProps> = ({
  title,
  description,
  children,
}) => (
  <Box display="flex" flexDirection="column" gap="4">
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
