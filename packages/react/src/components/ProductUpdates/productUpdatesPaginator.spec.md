# ProductUpdates.Paginator Component Contract

> This document defines the public and behavioral contract of the component independently of its implementation technology.

## 1. Purpose

ProductUpdates.Paginator is a purely informative indicator of which step of a sequence of `totalItems` steps is active, shown as a row of dots in which the active dot is a wider pill.

- It is used in the `paginator` slot of ProductUpdates.Footer on the primary-coloured ProductUpdates popover (default appearance).
- With `appearance="neutral"` it is used on light/neutral-background surfaces; the PlanDisplay mobile composition is a supported consumer of this appearance.
- Do not use it as a control: it is not focusable and does not respond to pointer, touch or keyboard. Do not use it for page-number navigation with labels, for progress that is not a discrete sequence, or as a tab list.
- It does not own the active index and does not move content; the consumer does.

## 2. Anatomy

| Part | Required | Description |
|---|---:|---|
| Row | Yes | Horizontal container of dots, vertically centred, with a 6px gap between dots. Receives the remaining HTML attributes. |
| Dot | No (one per item; none when `totalItems` is 0) | A fully rounded 6px-high indicator: 24px wide when active, 6px wide otherwise. |

### Rules

- The row contains exactly `totalItems` dots, in index order, and nothing else.
- Dot size, shape and spacing are the same in both appearances.

## 3. Public API

### Inputs

| Name | Type | Required | Default | Description |
|---|---|---:|---|---|
| `totalItems` | number | Yes | — | Number of dots. |
| `activeIndex` | number (zero-based) | Yes | — | Index of the active dot. |
| `appearance` | `"primary"` \| `"neutral"` | No | `"primary"` | Colour set. `"primary"` is for primary-coloured backgrounds; `"neutral"` is for neutral-background (light) surfaces. |
| other HTML attributes | standard element attributes except `color`, `className`, `style` | No | — | Passed to the row (including `aria-label`). |

### Events

None. The component emits no events.

### API Rules

- The exported props type `ProductUpdatesPaginatorProps` includes all inputs above.
- The component is controlled: there is no uncontrolled active index.

## 4. Variants

| Variant | Purpose | When to use |
|---|---|---|
| `appearance="primary"` (default) | Existing colours: active `neutral-background`, inactive `primary-textLow`. | Primary-coloured backgrounds such as the ProductUpdates popover. |
| `appearance="neutral"` | Active `primary-interactive`, inactive `neutral-interactiveHover`. | Light/neutral-background surfaces. |

### Rules

- In both appearances, the active dot differs from the others by width as well as colour.
- With `appearance="neutral"`, the active and inactive dot colours each have a non-text contrast of at least 3:1 against `neutral-background`.
- Appearance changes only colours; semantics, size and spacing are identical in both.

## 5. States

| State | Trigger | Expected behavior |
|---|---|---|
| Active dot | Dot index equals `activeIndex` | 24x6px pill in the active colour (B-002, B-003). |
| Inactive dot | Any other dot | 6x6px dot in the inactive colour. |
| Empty | `totalItems` is 0 | No dots (B-009). |
| No active dot | `activeIndex` outside 0..`totalItems`-1 | Every dot is inactive (B-009). |

No hover, pressed, focus or disabled state is defined; the component is not interactive and the Design reference for the dots has none.

## 6. Behavioral Contract

### B-001 - Dot count and order
When rendered with `totalItems` N ≥ 0, the component MUST render exactly N dots in index order, in a horizontal row.

### B-002 - Dot appearance and spacing
When rendered, in either appearance, the component MUST render the active dot as a 24x6px fully rounded pill and every other dot as a 6x6px fully rounded dot, with a 6px gap between adjacent dots and no other space between them.

### B-003 - Colours by appearance
When `appearance` is `"primary"` or omitted, the active dot MUST use `neutral-background` and inactive dots `primary-textLow`. When `appearance` is `"neutral"`, the active dot MUST use `primary-interactive` and inactive dots `neutral-interactiveHover`.

### B-004 - Semantics and non-interactivity
When rendered, in either appearance, the row MUST be exposed as an image whose accessible name is `Step {activeIndex+1} of {totalItems}` unless the consumer supplies `aria-label`, in which case that value is the name. Individual dots MUST be hidden from assistive technologies. Neither the row nor any dot MUST be focusable, and the component MUST NOT respond to click, tap or key presses.

### B-009 - Boundaries
`totalItems` 0 MUST render no dots. `totalItems` 1 MUST render one dot, active when `activeIndex` is 0. When `activeIndex` is outside 0..`totalItems`-1, no dot MUST be active.

### B-010 - No live announcement
The component MUST NOT produce a live-region announcement of changes to `activeIndex`.

### B-011 - Attribute passthrough
Remaining HTML attributes except `color`, `className` and `style` MUST be applied to the row.

## 7. Interaction Contract

### Pointer
No response to pointer; clicking a dot or the row does nothing (B-004).

### Keyboard
No focusable elements and no key handling (B-004).

### Touch
No response to touch; tapping a dot does nothing and the component defines no touch target (B-004).

### Focus
The component never receives focus and does not manage focus.

## 8. Content Contract

### Labels
- Default row name in English `Step {n} of {N}`, replaceable via `aria-label`.

### Supporting Content
Not applicable — the component renders no text or supporting content.

### Icons
Not applicable — dots are plain shapes.

### Long Content
Not applicable for text. A long `aria-label` is exposed only to assistive technologies and does not affect layout.

### Localization
- Consumers localize the row name through `aria-label`. The default English text is not localized.
- Dot order follows the inline direction of the surrounding layout; no mirrored visuals are otherwise defined.

## 9. Layout and Responsive Behavior

### Sizing
Row height 6px; for N ≥ 1 dots with one active, width 24px + (N-1) x 12px (one 24px pill, N-1 dots of 6px and N-1 gaps of 6px): 60px for 4 dots. With no active dot, width N x 6px + (N-1) x 6px.

### Alignment
Dots are vertically centred in the row.

### Overflow
The component does not wrap or scroll; a consumer whose container is narrower than the row width must choose a different layout.

### Responsive Behavior

| Condition | Expected behavior |
|---|---|
| Any viewport | Size and spacing do not change with viewport or appearance (B-002). |

## 10. Composition Contract

### Supported Composition
- Exposed as `ProductUpdates.Paginator`, placed in the `paginator` slot of `ProductUpdates.Footer` on the ProductUpdates popover (primary background), with the default appearance.
- The PlanDisplay mobile composition uses it with `appearance="neutral"` and a localized `aria-label`.
- Placement anywhere else on a surface whose background suits the chosen appearance.

### Unsupported Composition
- `appearance="primary"` on a light/neutral background, and `appearance="neutral"` on a primary-coloured background, are not guaranteed to meet contrast.
- Using it, or wrapping it, as a control that selects a step is not supported; it is an indicator only.

### Nesting Rules
No restriction beyond the surface background of §4.

### Multiple Instances
Instances are independent; each reflects only its own `totalItems`, `activeIndex`, `appearance` and `aria-label`.

## 11. Accessibility Contract

### Semantics
A single image whose dots are hidden from assistive technologies (B-004).

### Accessible Name
`Step {activeIndex+1} of {totalItems}` by default, or the consumer's `aria-label`.

### Keyboard Access
Not applicable — the component is not operable; consumers provide any navigation through their own controls.

### Focus
Not focusable (B-004).

### Screen Reader Behavior
The current step and total are conveyed by the row name. No live announcements (B-010); consumers announce content changes themselves.

### Visual Accessibility
- `appearance="neutral"` colours meet 3:1 non-text contrast against `neutral-background`; the first neutral token that does so is `neutral-interactiveHover` (B-003).
- The active dot is distinguished by width as well as colour in both appearances (§4).
- No motion is defined, so reduced-motion needs no special behaviour.

## 12. Edge Cases

| Case | Expected behavior |
|---|---|
| `totalItems` 0 | No dots (B-009). |
| `totalItems` 1 | One dot, active when `activeIndex` is 0 (B-009). |
| `activeIndex` negative or ≥ `totalItems` | No active dot (B-009). |
| Click, tap or key press on a dot | Nothing happens; no focus (B-004). |
| `appearance="neutral"` with `aria-label` | Neutral colours, 6px gap, image named by the `aria-label` (B-002, B-003, B-004). |
| Dynamic update of `activeIndex` or `totalItems` | The dots, active styling and default name reflect the new values; nothing is announced (B-010). |
| Multiple instances | Independent (§10). |

## 13. Acceptance Criteria

### AC-001 - Dot count
**Given** a Paginator with `totalItems` 3, then 5
**When** rendered
**Then** it has 3, then 5 dots. (B-001)

### AC-002 - Default name
**Given** `totalItems` 5, `activeIndex` 1, no `aria-label`
**When** rendered
**Then** an image named "Step 2 of 5" exists. (B-004)

### AC-003 - Dots hidden and not focusable
**Given** `totalItems` 3
**When** rendered and the user tabs through the page
**Then** every dot is hidden from assistive technologies and neither the row nor any dot receives focus. (B-004)

### AC-004 - Label override
**Given** `aria-label="Paso 2 de 5"`
**When** rendered
**Then** the image is named "Paso 2 de 5". (B-004)

### AC-005 - Visuals and spacing
**Given** `totalItems` 3, `activeIndex` 0, in each appearance
**When** rendered
**Then** the active dot is 24x6px, the others 6x6px, all fully rounded, with a 6px gap between adjacent dots. (B-002)

### AC-006 - Primary colours
**Given** `appearance` omitted or `"primary"`
**When** rendered
**Then** the active dot is `neutral-background` and inactive dots `primary-textLow`. (B-003)

### AC-007 - Neutral colours and contrast
**Given** `appearance="neutral"` on a `neutral-background` surface
**When** rendered
**Then** the active dot is `primary-interactive`, inactive dots `neutral-interactiveHover`, each with at least 3:1 contrast against the surface, and the active dot is wider than the others. (B-003, §4)

### AC-016 - Boundaries
**Given** `totalItems` 0, `totalItems` 1 with `activeIndex` 0, and `activeIndex` -1 or equal to `totalItems`, each in both appearances
**When** rendered
**Then** 0 gives no dots; 1 gives one active dot; out-of-range gives no active dot. (B-009)

### AC-017 - No live announcement
**Given** either appearance
**When** `activeIndex` changes
**Then** no live region is created or updated by the component. (B-010)

### AC-018 - Attribute passthrough
**Given** `data-testid` and `id` attributes
**When** rendered
**Then** they appear on the row; `className`, `style` and `color` are not accepted. (B-011)

### AC-019 - Neutral appearance keeps semantics
**Given** `appearance="neutral"`, `totalItems` 4, `activeIndex` 1 and `aria-label="Plan 2 de 4"`
**When** rendered
**Then** the row is an image named "Plan 2 de 4" with its dots hidden from assistive technologies, a 6px gap and neutral colours. (B-002, B-003, B-004)

### AC-020 - Multiple instances
**Given** two Paginators with different `activeIndex` and `appearance`
**When** one is rerendered with a new `activeIndex`
**Then** only that one changes; the other keeps its active dot, colours and name. (§10)

### AC-021 - No response to activation
**Given** `totalItems` 4, `activeIndex` 0, in each appearance, with a click listener on the surrounding container
**When** a dot is clicked, then tapped
**Then** the active dot does not change, no element of the component receives focus, and the container's listener still receives each event with its default action not prevented. (B-004)

### Acceptance Criteria Rules

- Every behavior is covered by at least one criterion above; criteria are testable and observable.

## 14. Origin of Guarantees

| Acceptance Criterion | Behavior or contract section | Origin | Contract basis | Source or proposal rationale |
|---|---|---|---|---|
| AC-001 | B-001 | Supported | reconstructed | nimbus-patterns@49e42056f4a37640a26c3b8df739073684567e02:packages/react/src/components/ProductUpdates/src/components/ProductUpdatesPaginator/productUpdatesPaginator.spec.tsx (dot count tests) |
| AC-002 | B-004 | Supported | reconstructed | Same spec file ("SHOULD announce the current step via aria-label"; role img named "Step 2 of 5") |
| AC-003 | B-004 | Supported | reconstructed | Same spec file ("SHOULD hide individual dots from assistive technology") |
| AC-004 | B-004 | Supported | reconstructed | Same spec file and types: remaining attributes passed to the row, so `aria-label` overrides the default |
| AC-005 | B-002 | Supported | reconstructed | Same revision, src/productUpdates.stories.tsx (footer `paginator` slot stories, multiStepWizard); Figma f6Boyk8BBYXilPIxhOfZjz node 14192:11569 (.Dots-paginator: 24x6 active, 6x6 inactive, 6px gap, no hover/focus/pressed variants) |
| AC-005 | B-002 | Supported | established | Design review of the specification candidate on TiendaNube/nimbus-patterns#202: the dots stay a visual indicator with 6px between them |
| AC-006 | B-003 (primary) | Supported | reconstructed | src/productUpdates.stories.tsx at the same revision (used on the primary-interactiveHover popover) and src/ProductUpdates.tsx (exposed as ProductUpdates.Paginator) |
| AC-007 | B-003 (neutral), §4 | Supported | established | Decision on TiendaNube/nimbus-patterns#202: the carousel dots reuse ProductUpdates.Paginator with token colours suitable for a light background; Design review of the specification candidate on the same issue: inactive dots use `neutral-interactiveHover` |
| AC-007 | B-003 (neutral), §4 | Design choice | — | Active colour `primary-interactive` (#0059D5) serves the same decision; the 3:1 check: against #FFFFFF, neutral-surfaceHighlight (#D1D1D1, about 1.5:1) and neutral-interactive (#B0B0B0, about 2.2:1) fail, neutral-interactiveHover (#888888, about 3.5:1) passes. Tokens at nimbus-design-system@51c1c1fb129be990baece10f749cd3fb9c1b94d3:packages/core/tokens/src/color/sys.json and ref.json |
| AC-016 | B-009 | Design choice | — | Defines edge cases without restricting input, in both appearances; serves the reuse decision on TiendaNube/nimbus-patterns#202 |
| AC-017 | B-010 | Design choice | — | Consumer owns announcements; keeps the existing output unchanged |
| AC-018 | B-011 | Supported | reconstructed | productUpdatesPaginator.types.ts (`Omit<HTMLAttributes<HTMLElement>, "color" \| "className" \| "style">`) at the same revision, with spec file `data-testid` use |
| AC-019 | B-002, B-003, B-004 | Supported | established | Design review of the specification candidate on TiendaNube/nimbus-patterns#202: dots are not tappable and have no touch area, a visual indicator only; decision on the same issue to reuse the Paginator with a localizable label |
| AC-020 | §10 | Design choice | — | Independence of instances; serves the carousel use on TiendaNube/nimbus-patterns#202 |
| AC-021 | B-004 | Supported | established | Design review of the specification candidate on TiendaNube/nimbus-patterns#202: dots are not tappable; existing component renders no interactive element (productUpdatesPaginator.spec.tsx at the same revision) |

## 15. Compatibility and Migration

| Area | Impact | Affected contract reference |
|---|---|---|
| Public API | Adds the optional `appearance` input; no input removed or changed. | §3 |
| Behavior and defaults | With the default `appearance`, output and semantics are exactly as before. | B-002, B-003, B-004 |
| Layout and content | Unchanged in both appearances. | B-002 |
| Accessibility and interactions | Unchanged: still a non-interactive image. | B-004 |
| Supported composition | ProductUpdates usage unchanged; neutral appearance added for light surfaces. | §10 |

- Backward compatibility: additive; existing ProductUpdates usage is unaffected.
- Migration required: No
- Consumer migration steps: Not applicable.

## 16. Test Traceability

| Acceptance Criterion | Behavior or contract section | Verification scenario | Storybook or preview reference | Automated test reference |
|---|---|---|---|---|
| AC-001 | B-001 | Render 3 and 5 dots; count children | — | src/components/ProductUpdatesPaginator/productUpdatesPaginator.spec.tsx ("AC-001") |
| AC-002 | B-004 | Query role img named "Step 2 of 5" | — | src/components/ProductUpdatesPaginator/productUpdatesPaginator.spec.tsx ("AC-002") |
| AC-003 | B-004 | Dots have aria-hidden true; tab through; nothing in the component is focused | — | src/components/ProductUpdatesPaginator/productUpdatesPaginator.spec.tsx ("AC-003") |
| AC-004 | B-004 | Pass `aria-label`, query image by new name | — | src/components/ProductUpdatesPaginator/productUpdatesPaginator.spec.tsx ("AC-004") |
| AC-005 | B-002 | Inspect dot sizes, radius and gap in a preview of each appearance | productUpdates.stories.tsx (multiStepWizard, neutralAppearance) | src/components/ProductUpdatesPaginator/productUpdatesPaginator.spec.tsx ("AC-005": style tokens in each appearance; painted sizes — preview) |
| AC-006 | B-003 | Inspect colours on the primary popover | productUpdates.stories.tsx (multiStepWizard) | src/components/ProductUpdatesPaginator/productUpdatesPaginator.spec.tsx ("AC-006") |
| AC-007 | B-003, §4 | Measure contrast of both colours on white in a neutral preview; check widths differ | productUpdates.stories.tsx (neutralAppearance) | src/components/ProductUpdatesPaginator/productUpdatesPaginator.spec.tsx ("AC-007": colour variables and widths; contrast measured in preview) |
| AC-016 | B-009 | jsdom: render each boundary case in both appearances; count dots and active dot | — | src/components/ProductUpdatesPaginator/productUpdatesPaginator.spec.tsx ("AC-016") |
| AC-017 | B-010 | jsdom: update `activeIndex`; assert no live-region element or `aria-live` | — | src/components/ProductUpdatesPaginator/productUpdatesPaginator.spec.tsx ("AC-017") |
| AC-018 | B-011 | jsdom: pass `data-testid` and `id`; locate on row | — | src/components/ProductUpdatesPaginator/productUpdatesPaginator.spec.tsx ("AC-018") |
| AC-019 | B-002, B-003, B-004 | jsdom: neutral with `aria-label`; image row by name, dots aria-hidden; preview for colours and gap | productUpdates.stories.tsx (neutralAppearance) | src/components/ProductUpdatesPaginator/productUpdatesPaginator.spec.tsx ("AC-019": semantics, gap and colour variables; painted colours — preview) |
| AC-020 | §10 | jsdom: two instances; rerender one; check the other | — | src/components/ProductUpdatesPaginator/productUpdatesPaginator.spec.tsx ("AC-020") |
| AC-021 | B-004 | jsdom: click events on dots; tap in a touch preview; assert no focus, no prevented default, container listener still receives the event | — | src/components/ProductUpdatesPaginator/productUpdatesPaginator.spec.tsx ("AC-021": click events; touch tap — preview) |
