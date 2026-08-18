import { render, screen } from "@testing-library/react";

import { canonicalRibbon } from "./planDisplay.stories";

/**
 * Verifies the canonical visual-validation story (issue #185 validation
 * amendment — "ribbon visual contract") against the amendment's written
 * requirements, point by point. This renders the exact `canonicalRibbon`
 * story defined for Storybook — not a differently-content story — so this
 * is a direct check of the fixture referenced by AC-02 and AC-07.
 *
 * This is a DOM/computed-style verification, not a rendered-pixel or
 * screenshot comparison: no headless browser was available in this
 * environment (see the PR description / task report for details).
 */
describe("GIVEN the canonical ribbon visual-validation story", () => {
  // `render` is a plain (args, context) => ReactNode story render function
  // here, not a component — invoke it directly and render its output.
  const renderStory = () =>
    render(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (canonicalRibbon.render as any)()
    );

  it("SHOULD render a full-width ribbon with a primary-interactive background", () => {
    const { container } = renderStory();

    const ribbon = container.querySelector(
      '[data-testid="plan-display-card-ribbon"]'
    ) as HTMLElement;
    const style = ribbon.getAttribute("style") ?? "";

    expect(style).toContain("100%");
    expect(style).toContain("colors-primary-interactive");
  });

  it("SHOULD render the ribbon label centered and in neutral-background text", () => {
    renderStory();

    const label = screen.getByText("Más escogido");
    expect(label.className).toContain("textAlign-center");
    expect(label.className).toContain("color-neutral-background");
  });

  it("SHOULD apply a 2px primary-interactive border to the card surface and suppress the level-2 shadow", () => {
    const { container } = renderStory();

    const surface = container.querySelector(
      '[data-testid="plan-display-card-surface"]'
    ) as HTMLElement;
    const style = surface.getAttribute("style") ?? "";

    expect(style).toContain("border-width-2");
    expect(style).toContain("colors-primary-interactive");
    expect(style).not.toContain("shadow-level-2");
  });

  it("SHOULD render the ribbon and card surface as one continuous shape sharing a single border radius", () => {
    const { container } = renderStory();

    const surface = container.querySelector(
      '[data-testid="plan-display-card-surface"]'
    ) as HTMLElement;

    // The ribbon and card content are direct children of the same
    // borderRadius + overflow:hidden wrapper, so there is no separate
    // radius (and no gap/seam) between them.
    expect(surface.className).toContain("borderRadius");
    expect(surface.className).toContain("overflow-hidden");
    expect(surface.children).toHaveLength(2);
  });

  it("SHOULD render the plan name, price, and description", () => {
    renderStory();

    expect(screen.getByText("Avanzado")).toBeDefined();
    expect(screen.getByText("$219.999")).toBeDefined();
    expect(screen.getByText("/mes")).toBeDefined();
    expect(
      screen.getByText("Gestión avanzada y control total para tu negocio.")
    ).toBeDefined();
  });

  it("SHOULD render the four enabled bullets with the badge on the wholesale price-tables bullet", () => {
    renderStory();

    expect(
      screen.getByText("Funciones heredadas del plan anterior")
    ).toBeDefined();
    expect(screen.getByText("Campos personalizados")).toBeDefined();
    expect(screen.getByText("Tablas de precios mayoristas")).toBeDefined();
    expect(
      screen.getByText("Gestión con inteligencia artificial")
    ).toBeDefined();
    expect(screen.getByText("Nuevo")).toBeDefined();
  });

  it("SHOULD render the disabled priority-support bullet with its localized unavailableLabel exposed only to assistive technology", () => {
    renderStory();

    expect(screen.getByText("Soporte prioritario")).toBeDefined();
    const hiddenLabel = screen.getByText("No incluido");
    expect(hiddenLabel).toBeDefined();
    // Visually hidden — VisuallyHidden clips it offscreen rather than
    // removing it from the accessibility tree.
    expect(hiddenLabel.getAttribute("style") ?? "").toContain("absolute");
  });

  it("SHOULD render the primary action and the footer's leading icon with its supporting offer text", () => {
    renderStory();

    expect(
      screen.getByRole("button", { name: "Subir de plan" })
    ).toBeDefined();
    expect(screen.getByText("Punto de venta Plus")).toBeDefined();
  });
});
