# Summary Stats Component Contract

> This document defines the public and behavioral contract of the component independently of its implementation technology.

## 1. Purpose

Summary Stats presents a small set of key metrics (a value, a description and optionally a trend and an explanatory tooltip) as one compact block. Optionally, a metric can be activated to reveal supporting content (for example a chart or a breakdown) in an area below the metrics.

Use it for:

- an at-a-glance overview of two to six related metrics at the top of a page or section;
- metrics where only some of them have supporting detail to reveal, mixed with metrics that do not.

Do not use it for:

- tabular or comparative data with many rows or columns (use a table);
- a single standalone metric with no siblings;
- navigation between views (cells reveal content in place, they do not navigate).

Related components: a table for dense data, a card for free-form grouped content.

---

## 2. Anatomy

| Part | Required | Description |
|---|---:|---|
| Container | Yes | The surface that holds all cells and the expanded area; has a background, a subtle elevation and rounded corners |
| Cell (Summary Stats Item) | Yes (at least one) | One metric. A cell is either interactive or static |
| Value | Yes | The main figure of the metric |
| Description | Yes | Short label identifying the metric |
| Trend indicator | No | Direction icon (up, down, neutral) with optional trend text next to the value |
| Info tooltip trigger | No | Information icon next to the description that reveals a text tooltip |
| Chevron | No | Expand/collapse indicator, present only on interactive cells |
| Separators | No | Thin dividers between adjacent cells |
| Expanded area (panel) | No | Region below the row that shows the active cell's content |

### Rules

- The container holds cells arranged in one of two layouts: horizontal (a single row) or grid (two columns).
- A cell is **interactive** when it is effectively expandable (B-002) and **static** otherwise. Interactive and static cells share the same box and padding so a row stays aligned.
- The chevron exists only on interactive cells.
- The expanded area exists only while the panel is rendered (B-003).

---

## 3. Public API

### Inputs

Container (Summary Stats):

| Name | Type | Required | Default | Description |
|---|---|---:|---|---|
| children | Cells | Yes | — | The cells to display |
| layout | `"horizontal"` \| `"grid"` | No | `"horizontal"` | Row or two-column arrangement |
| expandable | boolean | No | `false` | Makes cells expandable by default in horizontal layout; ignored in grid layout |
| activeStatId | string \| null | No | unset | Controlled active cell identifier; `null` means no active cell. When unset the component manages the active cell itself |
| onActiveStatIdChange | function | No | — | Called when the active cell changes by user activation |
| other element attributes | standard element attributes (except color) | No | — | Forwarded to the root element |

Cell (Summary Stats Item):

| Name | Type | Required | Default | Description |
|---|---|---:|---|---|
| value | string | Yes | — | Main figure |
| description | string | Yes | — | Label of the metric |
| trend | `"up"` \| `"down"` \| `"neutral"` | No | unset | Trend direction indicator |
| trendText | string | No | unset | Text shown next to the trend indicator |
| infoTooltip | string | No | unset | When set, an info icon next to the description reveals this text |
| expandable | boolean | No | unset | Per-cell expandability. Unset inherits the container value; an explicit value overrides it in both directions |
| children | content | No | — | Content shown in the expanded area while this cell is active |
| aria-label | string | No | unset | Accessible name forwarded to the cell's interactive element |
| other element attributes | standard element attributes (except color) | No | — | Forwarded to the cell's outer element |

### Events

| Event | Payload | Trigger |
|---|---|---|
| onActiveStatIdChange | the new active cell identifier, or `null` | A user activation of an interactive cell: the identifier of the activated cell when it was not active, `null` when it was the active cell. Fired in controlled and uncontrolled modes. Not fired by any other cause (B-006) or by arrow keys (B-005) |

### API Rules

- Cell identifiers are opaque values received through `onActiveStatIdChange`; a cell has no consumer-supplied identifier input. A cell keeps the same identifier for as long as it stays mounted. Controlled consumers supply only `null` or identifiers previously received.
- Controlled mode is selected by `activeStatId` being set (including `null`); the component then renders the supplied value and does not keep its own.
- `expandable` on a cell mirrors the container prop of the same name; the two never compete: the effective rule is B-002.
- Grid layout ignores both `expandable` values (B-008). This is documented behavior, not an error.
- Cells are expected as children of the container; a cell outside a container is not a supported use.

---

## 4. Variants

| Variant | Purpose | When to use |
|---|---|---|
| Horizontal | Metrics in a single row, optionally expandable | Two to six metrics; the only layout that supports expansion |
| Grid | Metrics in a two-column grid, always static | Two or four metrics for a compact overview |

### Rules

- Horizontal is the default.
- Within horizontal layout, each cell is independently interactive or static (B-002).
- Grid layout has no expansion and no expanded area.

---

## 5. States

| State | Trigger | Expected behavior |
|---|---|---|
| Static cell | Cell is not effectively expandable | No chevron, no hover surface, no pointer cursor, not focusable, no button semantics, no expanded state (B-004) |
| Interactive, inactive | Effectively expandable and not the active cell | Pointer cursor, chevron down, hover surface, focusable, `aria-expanded` false |
| Hover (interactive) | Pointer over an interactive inactive cell | Neutral hover surface |
| Focus (interactive) | Cell receives focus | Visible focus indication (§11) |
| Interactive, active | The cell's identifier is the active one | Active surface (also under hover), chevron up, `aria-expanded` true; the panel is rendered when the cell has content (B-003, B-007) |
| Panel shown | Active cell is effectively expandable and has content | Expanded area below the row shows that content (B-003) |
| No active cell | Active identifier is `null`, unknown, or belongs to a static cell | No active surface on any cell, no panel |

---

## 6. Behavioral Contract

### B-001 - Single active cell

When the container has an effectively expandable cell and the user activates it,
the component MUST make that cell the single active cell and call `onActiveStatIdChange` with its identifier.
When the user activates the active cell, the component MUST clear the active cell and call `onActiveStatIdChange` with `null`.
When the user activates a different interactive cell while one is active, the active cell MUST switch to the activated cell and the callback MUST receive its identifier.
At most one cell is active at any time.
In controlled mode the displayed active cell MUST always equal `activeStatId`; the callback reports the intent and the consumer decides. In uncontrolled mode the component stores the new value.
The initial active cell in uncontrolled mode is none.

### B-002 - Effective expandability

A cell is effectively expandable when the layout is horizontal AND (the cell's `expandable` value when set, otherwise the container's `expandable` value).
When the cell's `expandable` is unset, the cell MUST behave exactly as the container's `expandable` dictates, including cells without children, which remain interactive when the container is expandable.
When the cell's `expandable` is `true` in a horizontal layout, the cell MUST be interactive even when the container is not expandable.
When the cell's `expandable` is `false`, the cell MUST be static even when the container is expandable.
Interactive and static cells MAY be mixed in one container. Documentation and the mixed-group example recommend `expandable={false}` for cells without content; the component raises no warning for a children-less interactive cell.

### B-003 - Expanded area

When the active identifier belongs to a mounted, effectively expandable cell that has children, the component MUST render the expanded area below the row, containing that cell's children.
Otherwise the component MUST NOT render the expanded area.
At most one expanded area is rendered per container, always below the row.
A static cell never shows the active surface or an expanded state, even when the active identifier equals its identifier. If the cell becomes effectively expandable again while it is still the active identifier, it MUST show the active state and, when it has children, the expanded area returns.

### B-004 - Static cells

A static cell, in any layout and in any group, MUST NOT have a chevron, a hover surface, a pointer cursor, a focus stop, button semantics or an expanded state.
A static cell MUST have the same box and padding as an interactive cell so the row stays aligned.
Clicking or tapping a static cell MUST do nothing to the active cell and MUST NOT call `onActiveStatIdChange`. A static cell cannot receive keyboard focus, so no key binding acts on it (B-005).
The info tooltip of a static cell keeps its own behavior.

### B-005 - Keyboard interaction for interactive cells

Scope: an interactive cell. The listener is the focused interactive cell itself; bindings are active only while that cell has focus. Static cells never receive focus.

- **Tab / Shift+Tab**: each interactive cell is its own Tab stop in document order; static cells are skipped. There is no group role and no roving tabindex.
- **Enter and Space**: toggle the cell as in B-001. The default action is prevented; propagation is not stopped.
- **ArrowRight**: moves focus to the next interactive cell in document order within the displayed row of the same container instance. **ArrowLeft**: moves focus to the previous interactive cell in that row. Static cells are skipped. At the last interactive cell ArrowRight, and at the first ArrowLeft, leaves focus where it is (no wrap). With a single interactive cell, focus stays. Arrows never toggle a cell, never change the active cell and never call `onActiveStatIdChange`.
- Arrows are handled only without Alt, Ctrl, Meta or Shift. Modified arrow combinations are ignored (browser shortcuts such as Alt+ArrowLeft keep working). For unmodified ArrowLeft and ArrowRight on a focused interactive cell the default action is prevented, including at an edge, so the row does not scroll instead; propagation is not stopped.
- The newly focused cell is brought into view within a scrolling row.
- ArrowUp, ArrowDown, Home and End are not handled; their browser default (such as page scrolling) is unchanged.
- No binding is registered on the document, and propagation is not stopped, so ancestor handlers still receive these keys.
- The arrow mapping is defined for left-to-right layout (§8).

### B-006 - Active state stability

The active identifier changes only through user activation (B-001) or, in controlled mode, through the consumer's `activeStatId`.
When any cell's children, any cell's `expandable` value, the container's `expandable` value or the `layout` change, the active identifier MUST NOT change and `onActiveStatIdChange` MUST NOT be called, in controlled and uncontrolled modes.
When the active cell loses its children or becomes static, the expanded area MUST be hidden, the active identifier left untouched, and no callback fired.
When `activeStatId` is controlled and points to a static cell, the component MUST render no expanded area and no active cell (same rule).
When the active cell unmounts: in uncontrolled mode the active cell resets to none without calling the callback; in controlled mode `activeStatId` is left untouched and the component renders no active cell and no expanded area (an identifier that matches no mounted cell is no active cell).

### B-007 - Interactive cell without children

When an interactive cell has no children and the user activates it, the cell MUST become active (`aria-expanded` true, active surface, chevron up) and the callback MUST be called, and the component MUST NOT render an expanded area.

### B-008 - Grid layout

When `layout` is `"grid"`, the component MUST ignore the container's and every cell's `expandable` value: all cells are static (B-004) and no expanded area is rendered.

### B-009 - Expanded area spacing

The expanded area MUST have a single inner padding of 12px (spacing token 3) and no margin. Between the container's edge and the expanded area there MUST be a 4px (spacing token 1) inset on the left, right and bottom.

### B-010 - Cell semantics

An interactive cell MUST expose button semantics and `aria-expanded` reflecting whether it is the active cell.
While the expanded area is rendered, the active interactive cell MUST reference it as the control it owns; no other cell carries that reference, and a cell with no rendered area (including a children-less active cell) carries none.
Static cells carry no button role and no `aria-expanded`.

### B-011 - Cell content

A cell MUST display its value and description. When `trend` is set it MUST show the trend indicator, with `trendText` beside it when provided. When `infoTooltip` is set it MUST show an info icon next to the description that reveals the text.
In horizontal layout a vertical divider follows each cell except the last; a single cell has no divider.

### B-012 - Rows and instances

In horizontal layout the container displays one row at a time: a horizontally scrollable row below the medium breakpoint, a fixed row from the medium breakpoint. Keyboard navigation (B-005) stays within the displayed row and within one container instance.
Multiple containers on a page are independent: their active cells, panels and arrow navigation do not affect each other.

### B-013 - Forwarded attributes

The container MUST forward additional element attributes to its root element. A cell MUST forward `aria-label` to its interactive element and other element attributes to its outer element.

---

## 7. Interaction Contract

### Pointer

- Clicking an interactive cell activates it (B-001, B-007).
- Hovering an interactive inactive cell shows the hover surface; the active cell keeps the active surface under hover.
- Static cells do not respond to click or hover (B-004).
- Hovering the info icon reveals its tooltip, in any cell.

### Keyboard

All key bindings are defined once in B-005. Summary: Tab stops on interactive cells only; Enter/Space toggle; ArrowLeft/ArrowRight move focus between interactive cells without wrapping; the listener is the focused interactive cell; unmodified Enter, Space, ArrowLeft and ArrowRight have their default action prevented and do not stop propagation. No document-level bindings exist, so no nested-component conflicts are contracted.

### Touch

- Tapping an interactive cell activates it as a click does (B-001, B-007); tapping a static cell does nothing (B-004).

### Focus

- Focus enters through Tab onto the first interactive cell in the displayed row; Shift+Tab enters from the end.
- Focus moves with Tab/Shift+Tab across interactive cells in document order, and with arrows within the row (B-005). After the last interactive cell, Tab continues to any focusable content inside the rendered expanded area, which follows the row, and then leaves the component.
- After activating a cell by click or key, focus stays on that cell. The expanded area is not focused automatically.
- If the focused cell becomes static, it stops being a focus stop and the component does not move focus to another cell.
- Focus is not restored by the component.

---

## 8. Content Contract

### Labels

- `description` is a short label of the metric; the visible text is the default accessible content of the cell.
- A consumer-provided `aria-label` on an interactive cell replaces its accessible name; consumers provide a localized value when they use it.

### Supporting Content

- Cell children render only in the expanded area (B-003) and may be any content.
- `trend` and `trendText` are supplementary; `trendText` is meaningful when `trend` is set.
- `infoTooltip` is plain text.

### Icons

- Chevron: down when the cell is not active, up when active; only on interactive cells.
- Trend icon: up, down or neutral.
- Info icon: only when `infoTooltip` is set.

### Long Content

- Below the medium breakpoint the horizontal row scrolls horizontally when cells do not fit (B-012).
- No truncation, wrapping or multiline rule for value, description or expanded-area content is part of this contract.

### Localization

- Values, descriptions, trend text, tooltip text and `aria-label` are consumer-provided; the component adds no visible text of its own. Text expansion follows the Long Content rule.
- Right-to-left arrangement is not part of this contract; the ArrowLeft/ArrowRight mapping is defined for left-to-right layout only.

---

## 9. Layout and Responsive Behavior

### Sizing

- The container fills the width available to it. Grid layout arranges cells in two columns.
- Interactive and static cells have identical box and padding (B-004).
- The expanded area has a 4px inset from the container's left, right and bottom edges (B-009).

### Alignment

- Cells of a row are laid out side by side in document order; dividers follow B-011.

### Overflow

- Below the medium breakpoint the horizontal row is scrollable (B-012); a cell reached by arrow keys is brought into view (B-005).

### Responsive Behavior

| Condition | Expected behavior |
|---|---|
| Horizontal layout, below the medium breakpoint | One scrollable row of cells |
| Horizontal layout, from the medium breakpoint | One fixed row of cells |
| Grid layout, any width | Two-column grid |
| Expanded area shown | Rendered below the row at any width |

---

## 10. Composition Contract

### Supported Composition

- Summary Stats containing Summary Stats Item children, with any number of cells; two to six recommended in horizontal layout, two or four in grid layout.
- Any content as a cell's children.
- A mixed group of interactive and static cells in horizontal layout.

### Unsupported Composition

- A cell used outside a Summary Stats container.
- Expansion in grid layout (ignored, B-008).

### Nesting Rules

- Interactive controls placed inside a cell's children render in the expanded area, outside the cell's button; they keep their own keyboard behavior.
- Nesting a Summary Stats inside another's expanded area is not part of this contract.

### Multiple Instances

Multiple containers are independent (B-012). Each has its own active cell and expanded area. Arrow navigation never leaves a container.

---

## 11. Accessibility Contract

### Semantics

- An interactive cell is a button that is expanded when it is the active cell (B-010).
- A static cell is plain content with no interactive role.
- The active interactive cell references the expanded area it controls while the area is rendered (B-010).

### Accessible Name

- Default: the cell's visible text (value, trend and description).
- `aria-label` on the cell replaces it on the interactive element (B-013).

### Keyboard Access

- All interactive behavior is available by keyboard as defined in B-005: Tab/Shift+Tab, Enter/Space, ArrowLeft/ArrowRight.
- Static cells are not keyboard reachable and need no keyboard access because they have no action. The info tooltip keeps its own access.

### Focus

- The focused interactive cell shows a visible focus indication.
- Focus order is document order of interactive cells (B-005); arrows move focus within the displayed row; no focus restoration (§7 Focus).

### Screen Reader Behavior

- An interactive cell announces as a button with its expanded or collapsed state.
- The active cell with a rendered area identifies that area as the content it controls.
- A children-less active cell announces expanded and has no controlled area.

### Visual Accessibility

- State is not conveyed by color alone: the chevron direction and `aria-expanded` also change.
- The focused interactive cell has a visible focus indication (§11 Focus).
- Contrast, reduced motion and zoom requirements beyond those of the design-system tokens used are not part of this contract.

---

## 12. Edge Cases

| Case | Expected behavior |
|---|---|
| Single cell | Renders without separators; keyboard behavior per B-005 (no neighbor) |
| Container expandable, every cell `expandable={false}` | All cells static; no Tab stops |
| Container not expandable, one cell `expandable={true}` | That cell is interactive; others static |
| Interactive cell without children | Activation sets it active, calls the callback, shows no area (B-007) |
| Active cell loses children / becomes static | Area hidden; active identifier and callback untouched (B-006) |
| Children change while active (uncontrolled or controlled) | Active identifier unchanged, no callback (B-006) |
| Controlled `activeStatId` is static or unknown | No active cell, no area (B-006) |
| Active cell unmounts | Uncontrolled: resets to none silently; controlled: untouched, no active cell (B-006) |
| Controlled `activeStatId` is `null` | Controlled mode with no active cell |
| Layout changed to grid while a cell is active | All cells static, no area; active identifier untouched |
| Layout back to horizontal while the identifier remains | The cell shows the active state again and the area returns when it has children (B-003) |
| Arrow key at first/last interactive cell | Focus stays; page does not scroll horizontally (B-005) |
| Alt+ArrowLeft on a focused cell | Ignored by the component (B-005) |
| Focused cell becomes static | Focus is not moved by the component (§7) |
| Multiple containers | Independent (B-012) |
| Long value or description | Wraps; row scrolls below medium breakpoint (§8, §9) |
| Invalid combination: cell `expandable` in grid layout | Ignored; cell is static (B-008) |

---

## 13. Acceptance Criteria

### AC-001 - Defaults

**Given** a Summary Stats with two cells and no `layout` or `expandable` props
**When** it renders and the user clicks a cell
**Then** the layout is horizontal, every cell is static, no cell has button semantics, and no callback is called (B-002, §3)

### AC-002 - Cell content

**Given** a cell with `value`, `description`, `trend="up"`, `trendText="15%"` and `infoTooltip`
**When** it renders and the user hovers the info icon
**Then** value, description, trend icon and text are displayed and the tooltip text is revealed; a cell without `trend` or `infoTooltip` shows neither (B-011)

### AC-003 - Forwarded attributes

**Given** a container with a test attribute and a cell with `aria-label` inside an expandable container
**When** it renders
**Then** the attribute is on the container's root element and the cell's interactive element has the given accessible name; an interactive cell without `aria-label` has an accessible name that contains its value and description (B-013, B-010, §11 Accessible Name)

### AC-004 - Uncontrolled toggle

**Given** an expandable container, uncontrolled, whose first cell has children
**When** the user clicks (or taps) the cell and clicks it again
**Then** the children appear in the expanded area after the first click and disappear after the second; the callback receives the cell's identifier, then `null` (B-001, B-003)

### AC-005 - Switching cells

**Given** an expandable container with two cells that each have children, the first being active
**When** the user clicks the second cell
**Then** only the second cell's children are shown, the first cell is inactive, and the callback receives the second cell's identifier (B-001, B-003)

### AC-006 - Controlled mode

**Given** a container with `activeStatId` set to a received cell identifier and a callback that does not update it
**When** the user clicks another interactive cell
**Then** the callback receives the clicked cell's identifier and the displayed active cell remains the one given by `activeStatId`; when the consumer then sets `activeStatId` to `null` no cell is active and no area is rendered (B-001)

### AC-007 - Controlled unknown identifier

**Given** a controlled container whose `activeStatId` matches no mounted cell
**When** it renders
**Then** no cell is active and no expanded area is rendered, and `activeStatId` is not altered (B-006)

### AC-008 - Unset cell value inherits

**Given** an expandable container whose cells do not set `expandable`, one with children and one without
**When** the user clicks each
**Then** both are interactive; the one with children shows its area; the one without becomes active and shows no area; with a non-expandable container both are static (B-002, B-007)

### AC-009 - Cell opts in under non-expandable container

**Given** a non-expandable horizontal container, one cell with `expandable={true}` and children, one cell with no value
**When** the user clicks each
**Then** the first is a button and shows its children; the second is static and does nothing (B-002, B-004)

### AC-010 - Cell opts out under expandable container

**Given** an expandable container with a cell `expandable={false}` and a cell with unset value
**When** the user clicks the first cell, tabs through the container, and clicks the second
**Then** the first does nothing, is never focused and calls no callback; the second is focused by Tab and behaves as interactive (B-002, B-004)

### AC-011 - Static cell has no affordance

**Given** a static cell in an expandable container beside an interactive cell
**When** inspected
**Then** the static cell has no chevron, no button role, no `aria-expanded`, no tab stop, no hover surface and no pointer cursor, and has the same box and padding as the interactive cell; the interactive cell has a chevron, a pointer cursor and, while inactive, the hover surface under the pointer (B-004, B-010, §5)

### AC-012 - Static cell is inert

**Given** a static cell in an expandable container, next to an interactive cell that is active
**When** the user clicks or taps the static cell
**Then** the active cell is unchanged, the static cell does not take focus, and the callback is not called (B-004)

### AC-013 - Info tooltip on static and interactive cells

**Given** a static cell and an interactive cell each with `infoTooltip`
**When** the user hovers each info icon
**Then** each tooltip is revealed and neither hover toggles a cell (B-004, B-011)

### AC-014 - Grid ignores expansion

**Given** a grid layout with `expandable` on the container and `expandable={true}` on a cell
**When** the user clicks and uses the keyboard on the cells
**Then** all cells are static, there are no tab stops, no panel is rendered and no callback is called (B-008)

### AC-015 - Children-less interactive cell

**Given** an interactive cell without children
**When** the user activates it
**Then** it has `aria-expanded` true, the active surface and chevron up, the callback is called with its identifier, and no expanded area is rendered (B-007)

### AC-016 - Active cell loses children or becomes static

**Given** an active interactive cell showing its area
**When** its children are removed, or its `expandable` becomes `false`
**Then** the area is hidden, the active identifier is unchanged (a later change back restores the active state and area) and the callback is not called (B-006, B-003)

### AC-017 - Controlled identifier of a static cell

**Given** a controlled container whose `activeStatId` is the identifier of a static cell with children
**When** it renders
**Then** no area is rendered, no cell shows an active surface, and the cell has no `aria-expanded` (B-006, B-003)

### AC-018 - Active state survives children changes

**Given** an active cell, in an uncontrolled and in a controlled container
**When** the consumer re-renders with different children for any cell
**Then** the active identifier is unchanged, the area shows the new children, and the callback is not called (B-006)

### AC-019 - Active cell unmounts

**Given** an active cell
**When** the cell is removed, in uncontrolled and in controlled mode
**Then** uncontrolled: no cell is active and the callback is not called; controlled: `activeStatId` is unaltered, no cell is active and no area is rendered (B-006)

### AC-020 - Static cell becomes expandable again

**Given** a cell whose identifier is the active identifier but which is static
**When** it becomes effectively expandable
**Then** it shows the active state and, when it has children, the area returns (B-003)

### AC-021 - Focus after actions

**Given** a focused interactive cell
**When** the user activates it, and separately when it becomes static
**Then** after activation focus stays on the cell; when it becomes static it is no longer a focus stop and focus is not moved to another cell (§7 Focus, B-005)

### AC-022 - Enter and Space toggle

**Given** a focused interactive cell with children
**When** the user presses Enter, then Enter again, then Space, then Space again
**Then** the area opens, closes, opens, closes; each press prevents the browser default, propagation continues to ancestors, and the callback receives the identifier then `null` each time (B-005, B-001)

### AC-023 - Tab order

**Given** a row of cells: interactive, static, interactive, with focusable elements before and after the container
**When** the user presses Tab repeatedly and then Shift+Tab repeatedly
**Then** focus visits the element before, the first interactive cell, the second interactive cell, the element after; and in reverse; the static cell is never focused, and each focused cell shows a visible focus indication. When the second cell is active and its expanded area contains a link, Tab from the second cell reaches the link before the element after (B-005, §7 Focus, §11 Focus)

### AC-024 - Arrow navigation in a mixed group

**Given** a row of interactive A, static S, interactive B, interactive C, with A focused
**When** the user presses ArrowRight, ArrowRight, ArrowLeft, ArrowLeft
**Then** focus moves A to B (skipping S), B to C, C to B, B to A; the unmodified keys have their default prevented; the active cell does not change and the callback is not called (B-005)

### AC-025 - Arrow edges and single cell

**Given** a row of interactive cells, the first focused, and a container with a single interactive cell
**When** the user presses ArrowLeft on the first, ArrowRight on the last, and any arrow on the single cell
**Then** focus stays in each case (no wrap), the default is prevented so the row does not scroll, no cell toggles and no callback is called (B-005)

### AC-026 - Unhandled and modified keys

**Given** a focused interactive cell with neighbours
**When** the user presses Alt+ArrowLeft, Ctrl+ArrowRight, ArrowUp, ArrowDown, Home or End
**Then** the component does not move focus and does not prevent the default action for them (B-005)

### AC-027 - Controlled area reference

**Given** an active interactive cell with children
**When** its area is rendered and later hidden (deactivated, children removed, or cell becomes static); and for an active children-less cell
**Then** while the area is rendered only the active cell references it as the content it controls; no other cell has the reference; with no rendered area, no cell has it (B-010)

### AC-028 - Button semantics and expanded state

**Given** an expandable container with interactive cells
**When** a cell is activated
**Then** every interactive cell has button semantics and is focusable via Tab, `aria-expanded` is false before activation and true on the active cell only, and the chevron points down on inactive cells and up on the active cell (B-010, B-005, §8 Icons)

### AC-029 - Expanded area spacing

**Given** an active cell with children
**When** the expanded area is rendered
**Then** its inner padding is 12px, it has no margin, and it sits 4px from the container's left, right and bottom edges (B-009)

### AC-030 - Row scope

**Given** a horizontal container rendered below and from the medium breakpoint
**When** the user navigates with arrows
**Then** only the displayed row's interactive cells receive focus, in document order, and no cell of another row or container is reached; in the narrow scrollable row, a cell outside the visible part is brought into view when it receives focus (B-012, B-005)

### AC-031 - Independent instances

**Given** two expandable containers on one page
**When** a cell is activated in one and arrows are used in it
**Then** the other container's active cell, area and focus are unaffected (B-012)

### AC-032 - Dividers

**Given** a horizontal container with one cell, and another with two cells
**When** they render
**Then** the single cell has no divider; in the two-cell container the first cell has a vertical divider and the last has none (B-011)

### Acceptance Criteria Rules

- Every normative behavior MUST be covered by at least one Acceptance Criterion.
- Each Acceptance Criterion MUST reference the behavior IDs or contract sections it verifies.
- Acceptance Criteria MUST be testable and describe consumer-observable outcomes, without implementation details.

---

## 14. Origin of Guarantees

Sources (revision-pinned):
- S1: TiendaNube/nimbus-patterns@a815f8b32e6ffae9bcbf984b1e70677577408338, `packages/react/src/components/SummaryStats/src/SummaryStats.tsx#L41-L205` and `src/components/SummaryStatsItem/SummaryStatsItem.tsx#L121-L214`.
- S2: same revision, `src/components/SummaryStatsItem/summaryStatsItem.spec.tsx#L132-L241` and `src/summaryStats.spec.tsx#L60-L100`.
- S3: same revision, `src/summaryStats.types.ts#L25-L62`, `src/components/SummaryStatsItem/summaryStatsItem.types.ts#L16-L46`, `src/summaryStats.docs.json`, `src/summaryStats.stories.tsx` (Basic, WithInfoTooltip, Expandable, SixStats, LayoutHorizontal, LayoutGridFourItems, LayoutGridTwoItems).
- S4: Figma f6Boyk8BBYXilPIxhOfZjz@2410302476500425187, node 11744:3143 (container 4px inset; expanded content 12px padding).
- S5: TiendaNube/nimbus-design-system@51c1c1fb129be990baece10f749cd3fb9c1b94d3, `packages/core/tokens/src/spacing/ref.json` (token 1 = 4px, token 3 = 12px).
- R: Requester decision recorded on TiendaNube/nimbus-patterns#204 (Store Credit, per-item expandability).

| Acceptance Criterion | Behavior or contract section | Origin | Contract basis | Source or proposal rationale |
|---|---|---|---|---|
| AC-001 | B-002, §3 | Supported | reconstructed | S3 types/docs: defaults layout horizontal, expandable false; S2 summaryStats.spec.tsx#L60-L67 static mode |
| AC-002 | B-011 | Supported | reconstructed | S3 docs.json and stories WithInfoTooltip, WithDownTrends, Basic |
| AC-003 | B-013, B-010 | Supported | reconstructed | S3 types; `SummaryStatsItem.tsx#L43-L47` documentation comment (aria-label forwarded to the interactive element, rest props to the root) |
| AC-003 | §11 Accessible Name (default name from visible text) | Design choice | — | Serves the accessibility of interactive cells; keeps the visible value and description as the name when no `aria-label` is given |
| AC-004 | B-001, B-003 | Supported | reconstructed | S2 summaryStats.spec.tsx#L68-L88 and summaryStatsItem.spec.tsx#L132-L146 (content toggles on click) |
| AC-004 | B-001 (callback also in uncontrolled mode) | Design choice | — | Serves controlled and uncontrolled consumers alike; S3 documents the callback for controlled mode only, and the contract keeps it firing in both modes so analytics consumers need not switch modes |
| AC-005 | B-001, B-003 | Supported | reconstructed | S2 summaryStats.spec.tsx#L89-L100 |
| AC-006 | B-001 | Supported | reconstructed | S3 summaryStats.types.ts#L19-L24, L44-L54 (controlled mode documentation) |
| AC-007 | B-006 | Design choice | — | R (active state rules for non-rendered cells); an identifier matching no mounted cell is no active cell; avoids undefined controlled behavior |
| AC-008 | B-002, B-007 | Supported | established | R: unset cell value inherits the container exactly; children-less cells stay interactive |
| AC-008 | §3 Public API (prop name `expandable`) | Design choice | — | Serves R per-cell control; mirrors the container prop name |
| AC-009 | B-002, B-004 | Supported | established | R: explicit `true` opts in under a non-expandable horizontal container |
| AC-010 | B-002, B-004 | Supported | established | R: explicit `false` makes the cell static under an expandable container |
| AC-011 | B-004, B-010 | Supported | established | R: static cells have no alternative affordance, same box and padding |
| AC-011 | §5 (interactive cell affordance: chevron, pointer cursor, hover surface) | Design choice | — | Serves R (static cells differ from interactive cells only by losing the affordance); keeps the affordance the published package shows on expandable cells |
| AC-012 | B-004 | Supported | established | R: click and keys do nothing and fire no callback |
| AC-013 | B-004, B-011 | Supported | established | R: info tooltip keeps its own behavior; S3 story WithInfoTooltip |
| AC-014 | B-008 | Supported | established | R: grid ignores container and cell expandable values |
| AC-015 | B-007 | Supported | established | R: children-less interactive cell activates, fires callback, renders no panel |
| AC-016 | B-006, B-003 | Supported | established | R: panel hidden, active state untouched, no callback |
| AC-017 | B-006, B-003 | Supported | established | R: controlled identifier of a static cell gives no panel |
| AC-018 | B-006 | Supported | established | R: active state survives children changes in both modes |
| AC-019 | B-006 | Design choice | — | Serves R active-state stability; unmount in uncontrolled resets silently, controlled stays untouched |
| AC-020 | B-003 | Design choice | — | Serves R (static active cell shows nothing); defines the return when the cell is expandable again |
| AC-021 | §7 Focus, B-005 | Design choice | — | Serves R keyboard decision; toggling keeps focus, the component never moves focus to another cell |
| AC-022 | B-005, B-001 | Supported | reconstructed | S2 summaryStatsItem.spec.tsx#L132-L177 (click, Enter, Space) |
| AC-022 | B-005 (default prevented, propagation continues) | Design choice | — | Serves the unchanged Enter/Space toggle; Space must not scroll the page while toggling, and ancestors keep receiving the keys |
| AC-023 | B-005 | Supported | reconstructed | S2 summaryStatsItem.spec.tsx#L210-L241 (focusable, role button, reached via Tab) |
| AC-023 | B-005 (static cells skipped) | Supported | established | R: static cells have no focus stop; each interactive cell stays a Tab stop; no roving tabindex |
| AC-023 | §7 Focus, §11 Focus (visible indication; Tab into the expanded area) | Design choice | — | Serves the keyboard decision; the expanded area follows the row, so its focusable content comes after the cells |
| AC-024 | B-005 | Supported | established | R: ArrowRight/ArrowLeft move focus between interactive cells and skip static cells, document order, same row and instance |
| AC-025 | B-005 (no wrap, single cell) | Supported | established | R: focus stays at edges, no wrap, single cell stays |
| AC-025 | B-005 (default prevented at edge) | Design choice | — | Serves R arrow navigation; prevents the row scrolling instead |
| AC-026 | B-005 (Home/End/Up/Down unhandled; arrows never toggle) | Supported | established | R: only ArrowLeft/ArrowRight handled; Home/End not handled |
| AC-026 | B-005 (modifier combinations ignored) | Design choice | — | Serves R arrow navigation; keeps browser shortcuts such as Alt+ArrowLeft working |
| AC-027 | B-010 | Design choice | — | Serves R accessibility of the cell-to-panel link; reference only while the area is rendered, only on the active cell |
| AC-028 | B-010, B-005 | Supported | reconstructed | S2 summaryStatsItem.spec.tsx#L179-L241 (aria-expanded, role button, tabindex) |
| AC-028 | §8 Icons (chevron direction) | Design choice | — | Serves §11 Visual Accessibility (state not conveyed by color alone); keeps the published down/up chevron |
| AC-029 | B-009 | Supported | established | R: single inner padding 12px (token 3), no margin, 4px (token 1) inset; S4 node 11744:3143; S5 spacing tokens |
| AC-030 | B-012, B-005 | Design choice | — | Serves R (same row of the same instance); one displayed row per viewport, and the focused cell is brought into view in the scrollable row |
| AC-031 | B-012 | Design choice | — | Serves R (same instance); instances are independent |
| AC-032 | B-011 | Supported | reconstructed | S2 summaryStatsItem.spec.tsx#L243-L275 (separator tests) |

---

## 15. Compatibility and Migration

There is no previous published contract for this component; this document is the first contract. The impact below is relative to the behavior of the currently published package.

| Area | Impact | Affected contract reference |
|---|---|---|
| Public API | Additive: optional `expandable` on the cell. Unset behaves exactly as before | §3, B-002 |
| Behavior and defaults | Unset cells and containers behave as before. The active cell no longer resets when a consumer re-render passes new children | B-006 |
| Layout and content | Visual change: the expanded area has 12px inner padding, no margin, and a 4px inset left, right and bottom | B-009 |
| Accessibility and interactions | New ArrowLeft/ArrowRight navigation among interactive cells; the active cell references its expanded area; static cells keep out of the Tab order | B-005, B-010 |
| Supported composition | Mixed interactive and static cells in one horizontal container; opt-in cells under a non-expandable container; grid still ignores expansion | B-002, B-008 |

- Backward compatibility: consumers that do not set the cell value keep current behavior, including interactive children-less cells, apart from the visual spacing, the added arrow navigation, the area reference and the active-state stability.
- Migration required: No.
- Consumer migration steps: none required. Passing `expandable={false}` on cells without content is recommended so they are static rather than interactive cells that activate without revealing content.

---

## 16. Test Traceability

| Acceptance Criterion | Behavior or contract section | Verification scenario | Storybook or preview reference | Automated test reference |
|---|---|---|---|---|
| AC-001 | B-002, §3 | Render default container with two cells, click one: no button role, no callback | `summaryStats.stories.tsx` Basic | `summaryStats.spec.tsx` L60-L67 |
| AC-002 | B-011 | Render cell with trend and tooltip; hover icon; check text; render without them | `summaryStats.stories.tsx` WithInfoTooltip, WithDownTrends | `summaryStatsItem.spec.tsx` L77-L130 (trend text, info icon) |
| AC-003 | B-013, B-010 | Pass test attribute to container and `aria-label` to expandable cell; read root attribute and button name; repeat without `aria-label` and check name contains value and description | — | — |
| AC-004 | B-001, B-003 | Click cell twice; assert content and callback arguments | `summaryStats.stories.tsx` Expandable | `summaryStats.spec.tsx` L68-L88; `summaryStatsItem.spec.tsx` L132-L146 |
| AC-005 | B-001, B-003 | Click first then second cell; assert only second content shown | `summaryStats.stories.tsx` Expandable | `summaryStats.spec.tsx` L89-L100 |
| AC-006 | B-001 | Controlled with no-op callback: click another cell, assert callback value and unchanged display; set `null` | — | — |
| AC-007 | B-006 | Controlled with identifier matching nothing: assert no active surface or area | — | — |
| AC-008 | B-002, B-007 | Expandable container, unset cells with and without children: click each; repeat non-expandable | `summaryStats.stories.tsx` Expandable | `summaryStatsItem.spec.tsx` L210-L241 (children-less interactive, partial); `summaryStats.spec.tsx` tests named "AC-008" |
| AC-009 | B-002, B-004 | Non-expandable container with one `expandable` cell: click both | `summaryStats.stories.tsx` OptInUnderStaticContainer | `summaryStats.spec.tsx` tests named "AC-009" |
| AC-010 | B-002, B-004 | Expandable container, cell `expandable={false}`: click it and Tab through; assert never focused and no callback; second cell focusable and interactive | `summaryStats.stories.tsx` MixedStaticAndInteractive | `summaryStats.spec.tsx` tests named "AC-010" |
| AC-011 | B-004, B-010 | Inspect static cell for chevron, role, `aria-expanded`, tabindex, cursor, hover surface; compare box and padding; hover the interactive cell and check chevron, cursor and hover surface | `summaryStats.stories.tsx` MixedStaticAndInteractive | `summaryStatsItem.spec.tsx` tests named "AC-011" |
| AC-012 | B-004 | With another cell active, click the static cell; assert active cell unchanged, static cell not focused, no callback | `summaryStats.stories.tsx` MixedStaticAndInteractive | `summaryStatsItem.spec.tsx` tests named "AC-012" |
| AC-013 | B-004, B-011 | Hover info icon of static and interactive cell; assert tooltip and no toggle | `summaryStats.stories.tsx` WithInfoTooltip, MixedStaticAndInteractive | `summaryStatsItem.spec.tsx` tests named "AC-013" |
| AC-014 | B-008 | Grid with expandable container and cell: click, Tab; assert inert | `summaryStats.stories.tsx` LayoutGridFourItems, LayoutGridTwoItems | `summaryStats.spec.tsx` tests named "AC-014" |
| AC-015 | B-007 | Activate children-less interactive cell; assert state, callback, no area | — | `summaryStats.spec.tsx` tests named "AC-015" |
| AC-016 | B-006, B-003 | Active cell; remove children, then set `expandable={false}`; assert area hidden, identifier and callback unchanged; restore | — | `summaryStats.spec.tsx` tests named "AC-016" |
| AC-017 | B-006, B-003 | Controlled with static cell's identifier: no area, no highlight | — | `summaryStats.spec.tsx` tests named "AC-017" |
| AC-018 | B-006 | Active cell; re-render with new children in both modes; assert identifier and callback | — | `summaryStats.spec.tsx` tests named "AC-018" |
| AC-019 | B-006 | Remove active cell in both modes; assert state and callback | — | `summaryStats.spec.tsx` tests named "AC-019" |
| AC-020 | B-003 | Static active identifier, then enable expansion; assert active state and area | — | `summaryStats.spec.tsx` tests named "AC-020" |
| AC-021 | §7 Focus, B-005 | Activate focused cell: focus stays; make it static: focus not moved | — | `summaryStatsItem.spec.tsx` tests named "AC-021" |
| AC-022 | B-005, B-001 | Enter/Space twice each on focused cell; assert area, callback, default prevented, propagation to a parent handler | — | `summaryStatsItem.spec.tsx` L132-L177 |
| AC-023 | B-005 | Tab and Shift+Tab through interactive, static, interactive with outer controls; check focus indication; open the second cell with a link in its content and Tab from it | — | `summaryStatsItem.spec.tsx` L210-L241 (single cell reached via Tab); `summaryStatsItem.spec.tsx` tests named "AC-023" |
| AC-024 | B-005 | Mixed row A,S,B,C: ArrowRight x2, ArrowLeft x2; assert focus sequence, no toggle | `summaryStats.stories.tsx` Expandable, MixedStaticAndInteractive | `summaryStatsItem.spec.tsx` tests named "AC-024" |
| AC-025 | B-005 | ArrowLeft on first, ArrowRight on last, arrow on single cell; assert focus stays, default prevented | — | `summaryStatsItem.spec.tsx` tests named "AC-025" |
| AC-026 | B-005 | Alt+ArrowLeft, Ctrl+ArrowRight, ArrowUp, ArrowDown, Home, End; assert no focus move and default not prevented | — | `summaryStatsItem.spec.tsx` tests named "AC-026" |
| AC-027 | B-010 | Activate cell with and without children; deactivate; assert references only on the active cell while area is rendered | — | `summaryStats.spec.tsx` tests named "AC-027" |
| AC-028 | B-010, B-005 | Activate a cell; assert roles, tabindex, `aria-expanded` and chevron direction per cell | `summaryStats.stories.tsx` Expandable | `summaryStatsItem.spec.tsx` L179-L241 |
| AC-029 | B-009 | Activate cell with children; check area padding, margin and inset from container edges | — | `summaryStats.spec.tsx` tests named "AC-029" |
| AC-030 | B-012, B-005 | At narrow and wide viewports use arrows; assert only displayed row's cells focus; at narrow width arrow to an off-screen cell and assert it is scrolled into view | `summaryStats.stories.tsx` LayoutHorizontal, SixStats | `summaryStatsItem.spec.tsx` tests named "AC-030" |
| AC-032 | B-011 | Render one-cell and two-cell horizontal containers; check dividers | — | `summaryStatsItem.spec.tsx` L243-L275 |
| AC-031 | B-012 | Two containers; act in one; assert other unchanged | — | `summaryStats.spec.tsx` tests named "AC-031" |

### Rules

- Every Acceptance Criterion appears in the mapping.
- A dash means no reference is supplied, not that a check passed. No verification results are recorded here.
