import React from "react";
import { Box, BoxProps, Card } from "@nimbus-ds/components";
import { PlanDisplayCardProps } from "./planDisplayCard.types";

const PlanDisplayCard: React.FC<PlanDisplayCardProps> = ({
  highlighted,
  children,
}) => {
  const highlightedProps: BoxProps = {
    borderColor: "primary-interactive",
    borderRadius: "2",
    borderStyle: "solid",
    borderWidth: "3",
    boxShadow: "3",
  };

  return (
    <Box width="100%" {...(highlighted ? highlightedProps : {})}>
      <Card>{children}</Card>
    </Box>
  );
};

export { PlanDisplayCard };
