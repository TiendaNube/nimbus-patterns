import React from "react";
import { Box } from "@nimbus-ds/components";

const Divider: React.FC = () => (
  <Box
    data-testid="divider-toolbar"
    backgroundColor="neutral-surfaceHighlight"
    borderRadius="1"
    height="32px"
    width="1px"
  />
);

export { Divider };
