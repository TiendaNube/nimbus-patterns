import React from "react";
import { Box, Card } from "@nimbus-ds/components";
import { PlanDisplayCardProps } from "./planDisplayCard.types";

const PlanDisplayCard: React.FC<PlanDisplayCardProps> = ({
  highlighted,
  children,
}) => (
  <Box
    width="100%"
    borderColor={highlighted ? "primary-interactive" : "transparent"}
    borderStyle="solid"
    borderWidth="2"
    borderRadius="2"
    boxShadow={highlighted ? "3" : "0"}
  >
    <Card>
      <Card.Body>{children}</Card.Body>
    </Card>
  </Box>
);

export { PlanDisplayCard };
