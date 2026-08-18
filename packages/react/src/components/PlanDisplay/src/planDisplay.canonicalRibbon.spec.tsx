import { render, screen } from "@testing-library/react";

import { canonicalRibbon } from "./planDisplay.stories";

/**
 * Verifies the canonical visual-validation story (issue #185 validation
 * amendment — "ribbon visual contract" and "Canonical Plans 2.0 composition
 * recipe") against the amendment's written requirements, point by point.
 * This renders the exact `canonicalRibbon` story defined for Storybook —
 * not a differently-content story — so this is a direct check of the
 * fixture referenced by AC-02 and AC-07, and the only story labelled
 * normative in this contribution (see the "Usage-example classification"
 * validation expectation).
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

  // Canonical Plans 2.0 composition recipe: PlanDisplay.Header carries the
  // plan name/metadata and PlanDisplay.Price, which places the price before
  // PlanDisplay.Content's description in document order.
  it("SHOULD render the price before the description, consistent with Price living in Header rather than Content", () => {
    renderStory();

    const price = screen.getByText("$219.999");
    const description = screen.getByText(
      "Gestión avanzada y control total para tu negocio."
    );

    const position =
      // eslint-disable-next-line no-bitwise
      price.compareDocumentPosition(description) &
      Node.DOCUMENT_POSITION_FOLLOWING;
    expect(position).toBeTruthy();
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

  // Issue #185 validation amendment — "Bullet icon color treatment": enabled
  // bullet icons render `primary-interactive` (blue), never the legacy
  // `success-interactive` (green); the disabled bullet keeps the neutral
  // unavailable treatment.
  it("SHOULD render the four enabled bullet icons with primary-interactive color, never success-interactive", () => {
    const { container } = renderStory();

    // One primary-interactive-colored <span> wrapper per enabled bullet icon
    // (the four enabled bullets in the canonical fixture).
    const primaryIconSpans = container.querySelectorAll(
      "span[class*='color-primary-interactive']"
    );
    expect(primaryIconSpans.length).toBe(4);
    expect(
      container.querySelectorAll("span[class*='color-success-interactive']")
        .length
    ).toBe(0);
  });

  it("SHOULD render the disabled priority-support bullet icon with the neutral unavailable color", () => {
    const { container } = renderStory();

    const neutralIconSpans = container.querySelectorAll(
      "span[class*='color-neutral-interactive']"
    );
    expect(neutralIconSpans.length).toBeGreaterThanOrEqual(1);
  });

  it("SHOULD render the primary action and the footer's leading icon with its supporting offer text", () => {
    renderStory();

    expect(
      screen.getByRole("button", { name: "Subir de plan" })
    ).toBeDefined();
    expect(screen.getByText("Punto de venta Plus")).toBeDefined();
  });

  // Canonical Plans 2.0 composition recipe + validation expectations:
  // "verify the CTA is inside PlanDisplay.Content, after the description
  // and before the bullets".
  describe("Canonical composition recipe — CTA placement", () => {
    it("SHOULD render the primary CTA inside PlanDisplay.Content, after the description and before the first bullet", () => {
      renderStory();

      // Walk the DOM in document order and assert the relative ordering of
      // the description, the CTA, and the first bullet text.
      const description = screen.getByText(
        "Gestión avanzada y control total para tu negocio."
      );
      const cta = screen.getByRole("button", { name: "Subir de plan" });
      const firstBullet = screen.getByText(
        "Funciones heredadas del plan anterior"
      );

      const position = (a: Node, b: Node) =>
        // eslint-disable-next-line no-bitwise
        a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING;

      expect(position(description, cta)).toBeTruthy();
      expect(position(cta, firstBullet)).toBeTruthy();
    });

    it("SHOULD NOT render the primary CTA inside PlanDisplay.Footer", () => {
      const { container } = renderStory();

      // The footer is identified by the leading icon + supporting-offer
      // text; assert no <button> is a descendant of that subtree.
      const offerText = screen.getByText("Punto de venta Plus");
      const footer = offerText.closest("div")?.parentElement as HTMLElement;

      expect(footer).toBeDefined();
      expect(footer.querySelector("button")).toBeNull();
      // Sanity check: the CTA exists elsewhere in the document (in Content).
      expect(
        container.querySelectorAll("button").length
      ).toBeGreaterThanOrEqual(1);
    });

    it("SHOULD render PlanDisplay.Footer with only the supporting offer text and its leading icon — no other content", () => {
      renderStory();

      const offerText = screen.getByText("Punto de venta Plus");
      const footerRow = offerText.parentElement as HTMLElement;

      // The footer row is `<Box display="flex" alignItems="center" gap="2">
      // {icon}<Box>{children}</Box></Box>` — the icon plus a single wrapper
      // around the offer text, no button and no other text node.
      expect(footerRow.querySelector("button")).toBeNull();
      expect(footerRow.textContent).toBe("Punto de venta Plus");
    });
  });
});
