import React from "react";
import { Sidebar, Box, Title, Button } from "@nimbus-ds/components";

import { SideModalProps } from "./sideModal.types";

const SideModal: React.FC<SideModalProps> = ({
  portalWithin = "viewport",
  container,
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
}) => {
  const appShellContainer = React.useMemo(() => {
    if (typeof document === "undefined") return null;
    return document.querySelector(
      "[data-app-shell-overlay-root]"
    ) as HTMLElement | null;
  }, []);
  const portalContainer = container ?? (portalWithin === "appShell" ? appShellContainer : null);

  return (
  <Sidebar {...rest} container={portalContainer as any}>
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
};

SideModal.displayName = "SideModal";

export { SideModal };
