import React from "react";
import { Card } from "@nimbus-ds/components";
import { PlanDisplayCardProps } from "./planDisplayCard.types";

const PlanDisplayCard: React.FC<PlanDisplayCardProps> = ({ children }) => (
  <Card>{children}</Card>
);

export { PlanDisplayCard };
