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
    >
      {icon && <NimbusIcon source={icon} />}
      <Title
        as={illustration ? "h1" : "h4"}
        textAlign={{
          xs: "center",
          md: "left"
        }}
      >
        {title}
      </Title>
      {text && <Text textAlign="center">{text}</Text>}
      {actions && (
        <Box
          display="flex"
          justifyContent="center"
          gap="4"
          mt={illustration ? "4" : "2"}
          flexWrap="wrap"
        >
          {actions}
        </Box>
      )}
    </Box>
  );
  return illustration ? (
    <Box
      display="flex"
      flexDirection={{
        xs: "column",
        md: "row",
      }}
      justifyContent="center"
      alignItems="center"
    >
      {illustration}
      {emptyMessageContent}
    </Box>
  ) : (
    emptyMessageContent
  );
};

EmptyMessage.displayName = "EmptyMessage";

export { EmptyMessage };
