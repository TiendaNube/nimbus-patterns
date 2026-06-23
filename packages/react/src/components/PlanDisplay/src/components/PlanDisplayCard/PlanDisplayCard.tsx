import React from "react";
import { Box, Text } from "@nimbus-ds/components";
import { PlanDisplayCardProps } from "./planDisplayCard.types";

const GRADIENT_BACKGROUND =
  "linear-gradient(194.55deg, var(--nimbus-colors-primary-surface) 4.18%, var(--nimbus-colors-neutral-background) 45.97%)";

const PlanDisplayCard: React.FC<PlanDisplayCardProps> = ({
  ribbonLabel,
  gradient,
  children,
  style,
  ...rest
}) => {
  if (ribbonLabel) {
    return (
      <Box {...rest} style={style} display="flex" flexDirection="column">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "var(--nimbus-colors-primary-interactive)",
            paddingTop: "var(--nimbus-spacing-0-5)",
            paddingBottom: "var(--nimbus-spacing-2)",
            borderTopLeftRadius: "var(--nimbus-shape-border-radius-2)",
            borderTopRightRadius: "var(--nimbus-shape-border-radius-2)",
            marginBottom: "calc(var(--nimbus-spacing-2) * -1)",
          }}
        >
          <Text fontWeight="medium" color="neutral-background" textAlign="center">
            {ribbonLabel}
          </Text>
        </div>
        <Box
          backgroundColor="neutral-background"
          borderColor="primary-interactive"
          borderRadius="2"
          borderStyle="solid"
          borderWidth="2"
          overflow="hidden"
          padding="4"
        >
          {children}
        </Box>
      </Box>
    );
  }

  return (
    <Box {...rest} borderRadius="2" boxShadow="2" overflow="hidden">
      <div
        style={{
          padding: "var(--nimbus-spacing-4)",
          background: gradient
            ? GRADIENT_BACKGROUND
            : "var(--nimbus-colors-neutral-background)",
          ...style,
        }}
      >
        {children}
      </div>
    </Box>
  );
};

export { PlanDisplayCard };
