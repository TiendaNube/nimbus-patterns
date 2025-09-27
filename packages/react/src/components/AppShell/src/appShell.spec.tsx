import React from "react";
import { render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Box } from "@nimbus-ds/components";
import { AppShell } from "./AppShell";
import { AppShellProps } from "./appShell.types";
import { useAppShellMenuContext } from "./contexts";

const bodyChildren = "Body content";

const Menu: React.FC = () => {
  const { isMenuPopover } = useAppShellMenuContext();
  return (
    <Box data-testid={isMenuPopover ? "menu-popover" : "menu-inline"}>
      {isMenuPopover ? "popover" : "inline"}
    </Box>
  );
};

const makeSut = (rest: Omit<AppShellProps, "children">) => {
  render(
    <AppShell {...rest} data-testid="app-shell-element">
      {bodyChildren}
    </AppShell>
  );
};

describe("GIVEN <AppShell />", () => {
  it("renders children", () => {
    makeSut({});
    expect(screen.getByText(bodyChildren)).toBeInTheDocument();
  });

  it("renders the inline menu when provided", () => {
    makeSut({ menu: <Menu /> });
    expect(screen.getByTestId("menu-inline")).toBeInTheDocument();
    expect(screen.queryByTestId("menu-popover")).not.toBeInTheDocument();
  });

  it("does not render popover by default in popover behavior when closed", () => {
    makeSut({ menu: <Menu />, menuBehavior: "popover" });
    expect(screen.getByTestId("menu-inline")).toBeInTheDocument();
    expect(screen.queryByTestId("menu-popover")).not.toBeInTheDocument();
  });

  it("renders popover when behavior is popover, collapsed, and open is true", () => {
    makeSut({
      menu: <Menu />,
      menuBehavior: "popover",
      menuExpanded: false,
      menuFlyout: { open: true },
    });
    expect(screen.getByTestId("menu-inline")).toBeInTheDocument();
    expect(screen.getByTestId("menu-popover")).toBeInTheDocument();
  });

  it("renders popover even when menu is expanded and open is true", () => {
    makeSut({
      menu: <Menu />,
      menuBehavior: "popover",
      menuExpanded: true,
      menuFlyout: { open: true },
    });
    expect(screen.getByTestId("menu-inline")).toBeInTheDocument();
    expect(screen.getByTestId("menu-popover")).toBeInTheDocument();
  });

  it("closes popover with Escape and calls onOpenChange", async () => {
    const onOpenChange = jest.fn();
    makeSut({
      menu: <Menu />,
      menuBehavior: "popover",
      menuExpanded: false,
      menuFlyout: { defaultOpen: true, onOpenChange },
    });

    expect(screen.getByTestId("menu-popover")).toBeInTheDocument();

    await userEvent.keyboard("{Escape}");

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("does not throw error when useAppShellMenuContext is used without a provider", () => {
    expect(() => renderHook(() => useAppShellMenuContext(false))).not.toThrow();
  });
});
