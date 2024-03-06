import React from "react";

import { Card, Box, Title } from "@nimbus-ds/components";

import { EmptyAppPlanCardProps } from "./emptyAppPlanCard.types";

const EmptyAppPlanCard: React.FC<EmptyAppPlanCardProps> = ({
  planContext,
  planName,
  children,
  ...rest
}: EmptyAppPlanCardProps) => (
  <Card {...rest}>
    <Card.Header title={planContext} />
    <Card.Body>
      <Box display="flex" flexDirection="column" gap="4">
        <Title as="h2" color="neutral-textLow">
          {planName}
        </Title>
        <Box
          width="100%"
          borderTopWidth="1"
          borderColor="neutral-surfaceHighlight"
          borderStyle="solid"
        />
        <Box display="flex" flexDirection="column" gap="1">
          {children}
        </Box>
      </Box>
    </Card.Body>
  </Card>
);

export { EmptyAppPlanCard };
