import React from "react";
import { Box, Card } from "@nimbus-ds/components";
import { PlanDisplayCardContentProperties } from "./planDisplayCardContent.types";
import PlanDisplayCardSpacing from "../PlanDisplayCardSpacing";

const PlanDisplayCardContent: React.FC<PlanDisplayCardContentProperties> = ({
  children,
}) => (
  <Card.Body>
    <PlanDisplayCardSpacing />

    <Box display="flex" flexDirection="column" gap="1" py="4">
      {children}
    </Box>
  </Card.Body>
);

export { PlanDisplayCardContent };
