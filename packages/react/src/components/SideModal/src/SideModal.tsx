import React from "react";
import { Box, Title, Button, Sidebar } from "@nimbus-ds/components";

import { SideModalProps } from "./sideModal.types";

const SideModal: React.FC<SideModalProps> = ({
  title,
  titleAction,
  headerAction,
  headerIcon,
  paddingHeader,
  paddingBody,
  paddingFooter,
  footer,
  children,
  ...rest
}) => (
  <Sidebar {...rest}>
    <Sidebar.Header padding={paddingHeader || "base"}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="4"
      >
        {headerAction}
        {headerIcon}
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Title as="h2">{title}</Title>
        {titleAction}
      </Box>
    </Sidebar.Header>
    <Sidebar.Body padding={paddingBody}>{children}</Sidebar.Body>
    {!!footer && (
      <Sidebar.Footer padding={paddingFooter || "base"}>
        <Button {...footer.primaryAction} />
        <Button {...footer.secondaryAction} />
      </Sidebar.Footer>
    )}
  </Sidebar>
);

SideModal.displayName = "SideModal";

export { SideModal };
