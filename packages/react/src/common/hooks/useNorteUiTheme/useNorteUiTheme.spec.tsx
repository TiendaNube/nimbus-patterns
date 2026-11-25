import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider, Theme } from "@nimbus-ds/styles";

import { useNorteUiTheme } from "./useNorteUiTheme";

const Consumer: React.FC = () => (
  <div data-testid="flags">{JSON.stringify(useNorteUiTheme())}</div>
);

const readFlags = () =>
  JSON.parse(screen.getByTestId("flags").textContent ?? "{}");

describe("GIVEN useNorteUiTheme", () => {
  it.each<[Theme, boolean, boolean]>([
    ["base", false, false],
    ["dark", false, false],
    ["next", false, false],
    ["next-dark", false, false],
    ["next-norteui", true, true],
    ["next-norteui-dark", true, false],
  ])(
    "SHOULD report the flags for the %s theme",
    (theme, isNorteUi, isNorteUiLight) => {
      render(
        <ThemeProvider theme={theme}>
          <Consumer />
        </ThemeProvider>
      );
      expect(readFlags()).toEqual({ isNorteUi, isNorteUiLight });
    }
  );

  it("SHOULD report no Norte UI theme without a ThemeProvider", () => {
    render(<Consumer />);
    expect(readFlags()).toEqual({ isNorteUi: false, isNorteUiLight: false });
  });

  it("SHOULD follow the nearest ThemeProvider", () => {
    render(
      <ThemeProvider theme="next-norteui">
        <ThemeProvider theme="next">
          <Consumer />
        </ThemeProvider>
      </ThemeProvider>
    );
    expect(readFlags()).toEqual({ isNorteUi: false, isNorteUiLight: false });
  });

  it("SHOULD update when the provider theme changes", () => {
    const { rerender } = render(
      <ThemeProvider theme="base">
        <Consumer />
      </ThemeProvider>
    );
    rerender(
      <ThemeProvider theme="next-norteui">
        <Consumer />
      </ThemeProvider>
    );
    expect(readFlags()).toEqual({ isNorteUi: true, isNorteUiLight: true });
    rerender(
      <ThemeProvider theme="next-norteui-dark">
        <Consumer />
      </ThemeProvider>
    );
    expect(readFlags()).toEqual({ isNorteUi: true, isNorteUiLight: false });
  });
});
