import React from "react";

import { Box, Icon as NimbusIcon, Title, Text } from "@nimbus-ds/components";

import { EmptyMessageProps } from "./emptyMessage.types";

const EmptyMessage: React.FC<EmptyMessageProps> = ({
  className: _className,
  style: _style,
  illustration,
  icon,
  title,
  text,
  actions,
  ...rest
}: EmptyMessageProps) => {
  const emptyMessageContent = (
    <Box
      {...rest}
      display="flex"
      flexDirection="column"
      gap="1"
      alignItems={{
        xs: "center",
        md: illustration ? "flex-start" : "center",
      }}
      justifyContent={illustration ? "center" : "flex-start"}
    >
      {icon && <NimbusIcon source={icon} />}
      <Title
        as="h4"
        textAlign={{
          xs: "center",
          md: illustration ? "left" : "center"
        }}
      >
        {title}
      </Title>
      {text && (
        <Text
          textAlign={{ xs: "center", md: illustration ? "left" : "center" }}
        >
          {text}
        </Text>
      )}
      {actions && (
        <Box
          display="flex"
          justifyContent="center"
          gap="4"
          mt="1"
          flexWrap="wrap"
        >
          {actions}
        </Box>
      )}
    </Box>
  );
  return illustration ? (
    <Box
      display="grid"
      gridTemplateColumns={{
        xs: "1fr",
        md: "1fr 1fr"
      }}
      gridTemplateAreas={{
        xs: "auto auto",
        md: "auto"
      }}
      gap="4"
    >
      <Box display="flex" alignItems="center" justifyContent="center">
        {illustration}
      </Box>
      {emptyMessageContent}
    </Box>
  ) : (
    emptyMessageContent
  );
};

EmptyMessage.displayName = "EmptyMessage";

export { EmptyMessage };
