import React from "react";
import { Box, BoxProps, Card } from "@nimbus-ds/components";
import { PlanDisplayCardProps } from "./planDisplayCard.types";

const PlanDisplayCard: React.FC<PlanDisplayCardProps> = ({
  highlighted,
  children,
  ...rest
}) => {
  const highlightedProps: BoxProps = {
    borderColor: "primary-interactive",
    borderRadius: "2",
    borderStyle: "solid",
    borderWidth: "3",
    boxShadow: "3",
  };

  return (
    <Box {...(highlighted ? highlightedProps : {})} {...rest}>
      <Card>{children}</Card>
    </Box>
  );
};

export { PlanDisplayCard };
