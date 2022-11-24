import React from "react";
import { Sidebar } from "@nimbus-ds/sidebar";
import { Box } from "@nimbus-ds/box";
import { Stack } from "@nimbus-ds/stack";
import { Title } from "@nimbus-ds/title";
import { Button } from "@nimbus-ds/button";

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
      <Box mb="4">
        <Stack
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          {headerAction}
          {headerIcon}
        </Stack>
      </Box>
      <Stack display="flex" justifyContent="space-between" alignItems="center">
        <Title color="primary.textHigh" as="h1">
          {title}
        </Title>
        {titleAction}
      </Stack>
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
