import React from "react";

import { Box, Icon } from "@nimbus-ds/components";
import { QuestionCircleIcon } from "@nimbus-ds/icons";

import { HelpLinkProps } from "./helpLink.types";

const HelpLink: React.FC<HelpLinkProps> = ({
  className: _className,
  style: _style,
  children,
  ...rest
}: HelpLinkProps) => (
  <Box
    {...rest}
    display="flex"
    alignItems="center"
    justifyContent="center"
    gap="2"
  >
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius=".5rem"
      width="2rem"
      height="2rem"
      minWidth="2rem"
      minHeight="2rem"
      backgroundColor="primary-surface"
    >
      <Icon source={<QuestionCircleIcon />} color="primary-textLow" />
    </Box>
    {children}
  </Box>
);

HelpLink.displayName = "HelpLink";

export { HelpLink };
