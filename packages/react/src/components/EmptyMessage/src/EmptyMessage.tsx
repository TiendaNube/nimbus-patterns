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
        lg: illustration ? "flex-start" : "center",
      }}
      justifyContent={illustration ? "center" : "flex-start"}
    >
      {icon && <NimbusIcon source={icon} />}
      <Title
        as="h4"
        textAlign={{
          xs: "center",
          lg: illustration ? "left" : "center"
        }}
      >
        {title}
      </Title>
      {text && (
        <Text
          textAlign={{ xs: "center", lg: illustration ? "left" : "center" }}
        >
          {text}
        </Text>
      )}
      {actions && (
        <Box
          display="flex"
          justifyContent={{
            xs: "center",
            lg: "flex-start"
          }}
          gap="2"
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
        lg: "1fr 1fr"
      }}
      gridTemplateAreas={{
        xs: "auto auto",
        lg: "auto"
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
