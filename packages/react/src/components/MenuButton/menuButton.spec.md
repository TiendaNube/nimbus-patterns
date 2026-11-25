# Menu Button Component Contract

> This document defines the public and behavioral contract of the component independently of its implementation technology.

## 1. Purpose

Menu Button is a single navigation entry inside a navigation menu. It shows an optional icon and a label, can mark the current section as selected, and, through its Accordion form, groups related entries under one expandable header.

Use it for:

- entries of an application side menu (usually inside Menu);
- a group of related entries under one header (Menu Button Accordion);
- entries that must stay reachable when the menu is collapsed to an icon rail.

Do not use it for:

- actions that are not navigation (use a button);
- switching between views of the same content (use Nav Tabs);
- a dropdown list of actions (use a popover with a menu of actions).

Related components: Menu (the container that provides the expanded/collapsed state), Popover (used for the collapsed rail), Nav Tabs.

---

## 2. Anatomy

| Part                |        Required | Description                                                                             |
| ------------------- | --------------: | --------------------------------------------------------------------------------------- |
| Entry               |             Yes | The interactive element: a native button by default, or a link                          |
| Start icon          |              No | Icon shown before the label; it is the only visible content when collapsed              |
| Label               |              No | One line of text naming the entry; shown only when expanded                             |
| Trailing content    |              No | Consumer content after the label (for example a badge or tag); shown only when expanded |
| Collapsed popover   |              No | Floating panel next to a collapsed entry that shows the expanded entry                  |
| Accordion container | Yes (Accordion) | Surface that wraps the Accordion header and its items                                   |
| Accordion header    | Yes (Accordion) | A Menu Button that opens and closes the group                                           |
| Accordion items     | Yes (Accordion) | The grouped entries shown under the header when open, or in the collapsed popover       |

### Rules

- When expanded, an entry shows its start icon, label and trailing content in one row.
- When collapsed, an entry shows only its start icon, centered.
- An Accordion shows its items under the header only while it is open and expanded; when collapsed it shows them in a popover instead.

---

## 3. Public API

### Inputs — Menu Button

| Name                        | Type                   | Required | Default                                              | Description                                                               |
| --------------------------- | ---------------------- | -------: | ---------------------------------------------------- | ------------------------------------------------------------------------- |
| `label`                     | string                 |       No | —                                                    | Text of the entry                                                         |
| `startIcon`                 | icon component         |       No | —                                                    | Icon shown before the label                                               |
| `active`                    | boolean                |       No | `false`                                              | Marks the entry as the selected one                                       |
| `onClick`                   | function               |       No | —                                                    | Called when the entry is activated                                        |
| `children`                  | node                   |       No | —                                                    | Trailing content shown after the label when expanded                      |
| `as`                        | `"button"` \| `"a"`    |       No | `"button"`                                           | Element rendered for the entry                                            |
| `expanded`                  | boolean                |       No | from the enclosing Menu; expanded when there is none | Overrides the expanded/collapsed state                                    |
| `showPopoversWhenCollapsed` | boolean                |       No | from the enclosing Menu; `true` when there is none   | Whether a collapsed entry shows its popover                               |
| native attributes           | button/link attributes |       No | —                                                    | Forwarded to the entry element (for example `disabled`, `href`, `aria-*`) |

### Inputs — Menu Button Accordion

| Name              | Type                                    | Required | Default                      | Description                                                            |
| ----------------- | --------------------------------------- | -------: | ---------------------------- | ---------------------------------------------------------------------- |
| `menuButton`      | Menu Button inputs (without `expanded`) |      Yes | —                            | Inputs of the header entry                                             |
| `children`        | node                                    |      Yes | —                            | The grouped items, usually Menu Buttons                                |
| `contentid`       | string                                  |      Yes | —                            | Identifier that links the header to its items for assistive technology |
| `open`            | boolean                                 |       No | uncontrolled (starts closed) | Controls whether the group is open                                     |
| `active`          | boolean                                 |       No | `false`                      | Marks the group as containing the selected entry                       |
| `expanded`        | boolean                                 |       No | from the enclosing Menu      | Overrides the expanded/collapsed state                                 |
| `as`              | `"button"` \| `"a"`                     |       No | —                            | Element rendered for the container                                     |
| native attributes | element attributes                      |       No | —                            | Forwarded to the container                                             |

### Events

| Event                            | Payload | Trigger                                              |
| -------------------------------- | ------- | ---------------------------------------------------- |
| `onClick`                        | none    | The entry is activated by pointer, touch or keyboard |
| `menuButton.onClick` (Accordion) | none    | The header is activated while `open` is controlled   |

### API Rules

- The theme in effect is read from the enclosing theme provider; Menu Button exposes no theme input.
- `expanded` and `showPopoversWhenCollapsed` are not forwarded to the DOM.

---

## 4. Variants

| Variant               | Purpose                           | When to use                              |
| --------------------- | --------------------------------- | ---------------------------------------- |
| Menu Button           | A single entry                    | Any navigation destination               |
| Menu Button Accordion | A group of entries under a header | Related destinations that share a parent |

### Rules

- The appearance follows the theme in effect (B-008, B-009); there is no appearance input.

---

## 5. States

| State             | Trigger                              | Expected behavior                                                     |
| ----------------- | ------------------------------------ | --------------------------------------------------------------------- |
| Rest              | Default                              | B-008 / B-009 rest appearance                                         |
| Hover             | Pointer over the entry               | B-008 / B-009 hover appearance                                        |
| Pressed           | Entry being pressed                  | B-008 / B-009 pressed appearance                                      |
| Focus             | Keyboard focus on a button entry     | Visible focus ring (§11 Focus)                                        |
| Active (selected) | `active` is `true`                   | B-008 / B-009 selected appearance                                     |
| Disabled          | `disabled` attribute                 | Disabled appearance, not-allowed cursor, `onClick` not called (B-003) |
| Accordion open    | Uncontrolled toggle or `open` `true` | Items shown under the header while expanded (B-004)                   |
| Collapsed         | Expanded state is `false`            | Icon only; popover per B-006                                          |

---

## 6. Behavioral Contract

### B-001 - Expanded content

When the entry is expanded, the component MUST show its label and trailing content; when it is collapsed, it MUST NOT show them and MUST show only the start icon.

### B-002 - Expanded state source

When `expanded` is provided, the component MUST use it; otherwise it MUST follow the enclosing Menu, and MUST treat the entry as expanded when there is no enclosing Menu.

### B-003 - Activation

When an enabled entry is activated, the component MUST call `onClick` once. A disabled button entry MUST NOT call `onClick`.

### B-004 - Accordion open state

When `open` is not provided, activating the header MUST toggle the group open and closed and MUST NOT call `menuButton.onClick`. When `open` is provided, the group MUST stay in that state and activating the header MUST call `menuButton.onClick`. The header MUST expose `aria-expanded` as `true` only while the group is open and expanded. Items MUST NOT be rendered under the header while the Accordion is collapsed, even when `open` is `true`.

### B-005 - Selected group

When an Accordion is `active`, its header MUST show the selected appearance.

### B-006 - Collapsed popover

When an entry or Accordion is collapsed and popovers are enabled, it MUST show a popover on the side given by the enclosing Menu (right by default) on pointer hover, containing the expanded entry or the Accordion items. Within one Menu, at most one of these popovers MUST be open at a time: opening one replaces the record of the previous one, and closing a popover MUST NOT close another one that is open. When popovers are disabled, no popover is shown.

### B-007 - Theme gating

The Norte UI appearance (B-009) MUST apply only when the theme in effect is exactly `next-norteui` or `next-norteui-dark`. Under `base`, `dark`, `next` and `next-dark`, the component MUST render the same output as the release that precedes this contract revision.

### B-008 - Appearance under base, dark, next and next-dark

Under these themes, the component MUST keep the appearance it had before this contract revision: rest text and icon `neutral-textHigh`; hover background `primary-surface`; pressed background `primary-surfaceHighlight`; selected background `primary-surface` with text and icon `primary-interactive`; open, non-selected Accordion container `neutral-surface`; 2px (`0-5`) between Accordion items.

### B-009 - Appearance under Norte UI

Under `next-norteui`:

- rest text and icon: `neutral-textLow` (also for Accordion items and items in the collapsed popover);
- hover background: `neutral-surfaceHighlight`;
- pressed background: `neutral-surfaceHighlight` (the same as hover);
- selected entry: background `neutral-background`, text and icon `primary-interactive`;
- Accordion container: `neutral-background` when `active`, transparent otherwise (open or closed);
- no space between Accordion items, both under the header and in the collapsed popover.

Under `next-norteui-dark`, colors MUST be the ones of B-008, and the space between Accordion items MUST be none, as in `next-norteui`.

### B-010 - Unchanged disabled appearance

In every theme, a disabled entry MUST use text and icon `neutral-textDisabled`, background `neutral-surfaceDisabled` and a not-allowed cursor.

### B-011 - Layout invariance across themes

Size, padding, radius, row height, icon size and the one-line label MUST be the same in all six themes.

---

## 7. Interaction Contract

### Pointer

- Click activates the entry (B-003); clicking an uncontrolled Accordion header toggles the group (B-004).
- Hover shows the hover background (B-008, B-009) and, when collapsed, the popover (B-006).

### Keyboard

- A button entry is a native button: it is reachable with Tab and activated with Enter and Space by the browser; the component adds no key handlers and does not stop propagation.
- A link entry (`as="a"`) follows native link behavior (Enter activates).
- The collapsed popover follows the Nimbus Popover behavior with hover opening; the component adds no keyboard binding to it.

### Touch

- Tap activates the entry, as a click.

### Focus

- Focus enters each entry in document order; the component never moves focus.
- Opening or closing an Accordion keeps focus on its header.

---

## 8. Content Contract

### Labels

- The label is a single line; longer text is truncated to one line.

### Supporting Content

- Trailing content (badges, tags, icons) is shown after the label only when expanded.

### Icons

- The start icon is shown at 16px in the text color of the current state.

### Long Content

- Labels are clamped to one line and may break at any character.

### Localization

- Text expansion is absorbed by the one-line clamp; the component adds no text of its own.

---

## 9. Layout and Responsive Behavior

### Sizing

- The entry takes the full width of its container.

### Alignment

- Expanded: icon, label and trailing content in one row, vertically centered.
- Collapsed: the icon is centered and there is no horizontal padding.

### Overflow

- Long labels are clamped (§8).

### Responsive Behavior

| Condition               | Expected behavior                               |
| ----------------------- | ----------------------------------------------- |
| Small viewports         | Row height up to 34px with 8px vertical padding |
| Medium viewports and up | Row height up to 26px with 4px vertical padding |

---

## 10. Composition Contract

### Supported Composition

- Inside Menu (usually inside Menu Section) or any container that provides the Menu expanded state.
- Accordion items are Menu Buttons.

### Unsupported Composition

- Nesting an Accordion inside another Accordion's items.

### Nesting Rules

- Items inside the collapsed popover are always rendered expanded.

### Multiple Instances

- Many entries coexist in one Menu; at most one collapsed popover is open at a time (B-006).

---

## 11. Accessibility Contract

### Semantics

- A button entry is a native `button`; a link entry is a native `a`.

### Accessible Name

- The visible label names the entry. When collapsed and no label is visible, the consumer must provide an accessible name (for example `aria-label`).

### Keyboard Access

- See §7 Keyboard.

### Focus

- A button entry shows the standard Nimbus focus ring when focused by keyboard. Focus order follows document order.

### Screen Reader Behavior

- The Accordion header exposes `aria-expanded` (B-004) and is linked to its items through the consumer-provided identifier.

### Visual Accessibility

- Under `next-norteui`, label and icon contrast meets WCAG AA for rest, hover and selected states on a white or `neutral-surfaceDisabled` menu background.
- Under `next-norteui`, the selected entry is distinguished mainly by its text and icon color; its background differs only slightly from the menu background. This is a known limitation of this revision.
- Under `next-norteui-dark` the colors of B-008 apply, so contrast is the same as under `dark`.
- Transitions are short color transitions only.

---

## 12. Edge Cases

| Case                                                        | Expected behavior                                                                        |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Long label                                                  | Clamped to one line (§8)                                                                 |
| No label, collapsed                                         | Icon only; accessible name provided by the consumer (§11)                                |
| No start icon, collapsed                                    | Empty centered entry; consumers should provide an icon in collapsed menus                |
| Disabled and active                                         | Disabled appearance wins (B-010) and `onClick` is not called                             |
| Disabled under Norte UI on a `neutral-surfaceDisabled` menu | Disabled background equals the menu background; the disabled text color still applies    |
| Controlled `open` `true` while collapsed                    | Items are not rendered under the header (B-004); the popover shows them on hover (B-006) |
| No enclosing Menu                                           | Treated as expanded, popovers enabled, popover on the right (B-002, B-006)               |
| No theme provider                                           | Treated as a non-Norte theme (B-007)                                                     |

---

## 13. Acceptance Criteria

### AC-001 - Expanded and collapsed content

**Given** a Menu Button with an icon, a label and trailing content
**When** it is rendered expanded, and then collapsed (by prop or by the enclosing Menu)
**Then** the label and trailing content are visible only when expanded, and only the icon is shown when collapsed (B-001, B-002).

### AC-002 - Activation

**Given** an enabled Menu Button with `onClick`
**When** it is clicked
**Then** `onClick` is called once (B-003).

### AC-003 - Uncontrolled Accordion

**Given** an Accordion without `open`, expanded
**When** the header is clicked twice
**Then** the items appear and disappear, `aria-expanded` goes `true` then `false`, and `menuButton.onClick` is not called (B-004).

### AC-004 - Controlled Accordion

**Given** an Accordion with `open` set to `false` or `true`, expanded
**When** the header is clicked
**Then** the open state does not change and `menuButton.onClick` is called (B-004).

### AC-005 - Collapsed Accordion hides items under the header

**Given** an Accordion with `open` `true`
**When** it is collapsed
**Then** its items are not rendered under the header (B-004).

### AC-006 - Collapsed popover

**Given** collapsed entries and Accordions inside a Menu with popovers enabled
**When** one popover becomes visible, and then another one, and then the first one reports it closed
**Then** each entry is wrapped by a popover on the configured side, the open record follows the latest visible popover, and closing a popover that is no longer recorded does not clear the current one; with popovers disabled no popover wraps the entry (B-006).

### AC-007 - Selected group header

**Given** an Accordion with `active` `true`
**When** it is rendered
**Then** its header shows the selected appearance of the theme in effect (B-005).

### AC-008 - Invariance under existing themes

**Given** a Menu Button and an Accordion in rest, selected, disabled, open and collapsed states
**When** they are rendered under `base`, `dark`, `next` and `next-dark`
**Then** the output is identical to the previous release and matches B-008 (B-007, B-008).

### AC-009 - Norte UI light appearance

**Given** the theme `next-norteui`
**When** a Menu Button is rendered at rest, hovered, pressed and selected, and an Accordion is rendered closed, open, selected and collapsed with its popover
**Then** the colors and spacing match B-009: rest `neutral-textLow` (including items in the popover), hover and pressed `neutral-surfaceHighlight`, selected `neutral-background` with `primary-interactive`, Accordion container transparent unless `active`, no space between items (B-009).

### AC-010 - Norte UI dark appearance

**Given** the theme `next-norteui-dark`
**When** the same cases as AC-009 are rendered
**Then** the colors are the ones of B-008 and there is no space between Accordion items (B-009).

### AC-011 - Exact theme matching

**Given** the themes `next` and `next-dark`
**When** a Menu Button and an Accordion are rendered
**Then** none of the Norte UI changes apply (B-007).

### AC-012 - Disabled appearance

**Given** a disabled Menu Button, also with `active` `true`
**When** it is rendered under each of the six themes and clicked
**Then** it uses `neutral-textDisabled`, `neutral-surfaceDisabled` and a not-allowed cursor, and `onClick` is not called (B-003, B-010).

### AC-013 - Layout invariance

**Given** a Menu Button expanded and collapsed
**When** it is rendered under each of the six themes
**Then** padding, radius, row height and icon size are the same (B-011).

### AC-014 - Keyboard and focus

**Given** a Menu Button rendered as a button
**When** it receives focus with Tab and Enter or Space is pressed
**Then** a visible focus ring is shown and `onClick` is called; toggling an Accordion header keeps focus on it (§7, §11).

### AC-015 - Rendering as a link

**Given** a Menu Button or Accordion with `as="a"`
**When** it is rendered
**Then** the element is a link and keeps its attributes (§3, §11 Semantics).

### AC-016 - No theme provider

**Given** a Menu Button with no theme provider
**When** it is rendered
**Then** it shows the appearance of B-008 (B-007).

---

## 14. Origin of Guarantees

Sources (revision-pinned):

- S1: TiendaNube/nimbus-patterns@7c9d39d8e0e848973fec91372bd67b10667a6f9c, `packages/react/src/components/MenuButton/src/menuButton.spec.tsx` and `src/components/MenuButtonAccordion/menuButtonAccordion.spec.tsx`.
- S2: same revision, `src/menuButton.types.ts`, `src/components/MenuButtonAccordion/menuButtonAccordion.types.ts`, `src/menuButton.docs.json`, `src/menuButton.stories.tsx`.
- S3: same revision, `packages/react/src/components/MenuButton/CHANGELOG.md` (open Accordion background change).
- S4: Published Nimbus documentation, Menu page, accessibility section (keyboard access and standard focus ring).
- R: Request and design decisions recorded on TiendaNube/nimbus-patterns#223 (Norte UI token changes, invariance of the other themes, selected Accordion header, no gap between items).

| Acceptance Criterion | Behavior or contract section                                  | Origin        | Contract basis | Source or proposal rationale                                                                                           |
| -------------------- | ------------------------------------------------------------- | ------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------- |
| AC-001               | B-001, B-002                                                  | Supported     | reconstructed  | S1 menuButton.spec.tsx (collapsed/expanded from context and prop); S2 types                                            |
| AC-002               | B-003                                                         | Supported     | reconstructed  | S1 menuButton.spec.tsx (executes onClick)                                                                              |
| AC-003               | B-004                                                         | Supported     | reconstructed  | S1 menuButtonAccordion.spec.tsx (uncontrolled toggle, ignores menuButton.onClick)                                      |
| AC-004               | B-004                                                         | Supported     | reconstructed  | S1 menuButtonAccordion.spec.tsx (controlled via open)                                                                  |
| AC-005               | B-004                                                         | Supported     | reconstructed  | S1 menuButtonAccordion.spec.tsx (expanded false hides children)                                                        |
| AC-006               | B-006                                                         | Supported     | reconstructed  | S1 popover wrapping and onVisibility set/clear/preserve tests in both spec files                                       |
| AC-007               | B-005                                                         | Supported     | reconstructed  | S1 menuButtonAccordion.spec.tsx (passes active state)                                                                  |
| AC-008               | B-007                                                         | Supported     | established    | R: other themes stay unchanged                                                                                         |
| AC-008               | B-008 (token list)                                            | Supported     | reconstructed  | S3 open Accordion background; S2 stories                                                                               |
| AC-009               | B-009 (light tokens, no gap, transparent container)           | Supported     | established    | R: proposed contract delta on #223                                                                                     |
| AC-009               | B-009 (pressed equals hover; popover items `neutral-textLow`) | Supported     | established    | Design decisions for this revision: pressed uses the hover background; items keep the uniform rest color               |
| AC-010               | B-009 (dark keeps B-008 colors, spacing applies)              | Supported     | established    | Design decision for this revision: Norte UI dark applies the spacing changes only until a Norte UI dark palette exists |
| AC-011               | B-007                                                         | Supported     | established    | R: exact theme keys; `next` and `next-dark` unchanged                                                                  |
| AC-012               | B-003, B-010                                                  | Supported     | reconstructed  | S2 types (native disabled attribute); S2 stories                                                                       |
| AC-012               | B-010 (same in all six themes)                                | Design choice | —              | Serves R (only the requested tokens change); keeps the disabled appearance identical across themes                     |
| AC-013               | B-011                                                         | Supported     | established    | R: no layout change requested; only colors and the item gap change                                                     |
| AC-014               | §7, §11 Focus                                                 | Supported     | reconstructed  | S4 keyboard access and standard focus ring                                                                             |
| AC-014               | §7 Focus (Accordion keeps focus)                              | Design choice | —              | Serves the unchanged native button behavior; the component never moves focus                                           |
| AC-015               | §3, §11 Semantics                                             | Supported     | reconstructed  | S1 menuButtonAccordion.spec.tsx (renders as anchor); S2 types                                                          |
| AC-016               | B-007                                                         | Design choice | —              | Serves R invariance; a missing provider is not a Norte UI theme                                                        |

---

## 15. Compatibility and Migration

| Area                           | Impact                                                                   | Affected contract reference |
| ------------------------------ | ------------------------------------------------------------------------ | --------------------------- |
| Public API                     | None                                                                     | §3                          |
| Behavior and defaults          | None                                                                     | B-001 to B-006              |
| Layout and content             | Under Norte UI themes only: no space between Accordion items             | B-009                       |
| Accessibility and interactions | Under `next-norteui` only: new colors; selected state mainly color-based | B-009, §11                  |
| Supported composition          | None                                                                     | §10                         |

- Backward compatibility: output under `base`, `dark`, `next` and `next-dark` is unchanged (B-007).
- Migration required: No
- Consumer migration steps, when required: Not applicable — the change applies only when the consumer opts into a Norte UI theme.

---

## 16. Test Traceability

| Acceptance Criterion | Behavior or contract section | Verification scenario                                                                                                            | Storybook or preview reference                                                                                 | Automated test reference                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| -------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| AC-001               | B-001, B-002                 | Render with icon, label and trailing content, expanded and collapsed by prop and by context; check visible content               | `menuButton.stories.tsx` `basic`, `menuButtonCollapsed`                                                        | `menuButton.spec.tsx`: "MenuButton AC-001: SHOULD render label text correctly", "MenuButton AC-001: SHOULD render children correctly", "MenuButton AC-001: SHOULD render collapsed correctly reading from the context", "MenuButton AC-001: SHOULD render expanded correctly reading from the context", "MenuButton AC-001: SHOULD render expanded correctly reading from the prop", "MenuButton AC-001: SHOULD render collapsed correctly reading from the prop", "MenuButton AC-001: SHOULD show only the icon when collapsed by an enclosing Menu"                                                                                                                                                                                                                                                                                            |
| AC-002               | B-003                        | Click an enabled entry; `onClick` called once                                                                                    | —                                                                                                              | `menuButton.spec.tsx`: "MenuButton AC-002: SHOULD execute the onClick correctly"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| AC-003               | B-004                        | Click an uncontrolled header twice; check items, `aria-expanded`, header callback not called                                     | `menuButton.stories.tsx` `accordionMenuButton`                                                                 | `menuButtonAccordion.spec.tsx`: "MenuButton AC-003: SHOULD toggle content visibility and aria-expanded on click", "MenuButton AC-003: SHOULD ignore provided menuButton.onClick and use internal toggle"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| AC-004               | B-004                        | Click a controlled header with `open` false and true; state unchanged, callback called                                           | —                                                                                                              | `menuButtonAccordion.spec.tsx`: "MenuButton AC-004: SHOULD keep closed and call provided onClick when open is false", "MenuButton AC-004: SHOULD keep open and call provided onClick when open is true"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| AC-005               | B-004                        | Collapse an Accordion with `open` true; items absent                                                                             | —                                                                                                              | `menuButtonAccordion.spec.tsx`: "MenuButton AC-005: SHOULD not render children even when open is true", "MenuButton AC-005: SHOULD override context expanded state with prop", "MenuButton AC-005: SHOULD not render accordion content when collapsed"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| AC-006               | B-006                        | Collapse entries in a Menu; drive popover visibility for two entries; check wrapping, side and open record; disable popovers     | `menuButton.stories.tsx` `menuButtonCollapsed`, `accordionMenuButtonCollapsed`, `norteUiStates` (popover side) | `menuButton.spec.tsx`: "MenuButton AC-006: SHOULD keep at most one popover open when hovering two collapsed entries of one Menu", "MenuButton AC-006: SHOULD wrap button with popover when collapsed and showPopoversWhenCollapsed is true", "MenuButton AC-006: SHOULD not wrap button with popover when showPopoversWhenCollapsed is false", "MenuButton AC-006: SHOULD not show popover when button is expanded"; `menuButtonAccordion.spec.tsx`: "MenuButton AC-006: SHOULD wrap accordion with popover when collapsed and showPopoversWhenCollapsed is true", "MenuButton AC-006: SHOULD not render popover when showPopoversWhenCollapsed is undefined"; partial: the "MenuButton AC-006" onVisibility tests in both files replicate the open-record update logic. The popover side is not asserted                                        |
| AC-007               | B-005                        | Render an active Accordion; header has the selected appearance                                                                   | `menuButton.stories.tsx` `norteUiStates`                                                                       | `menuButtonAccordion.spec.tsx`: "MenuButton AC-007: SHOULD show the selected header appearance of %s when active" (six themes)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| AC-008               | B-007, B-008                 | Render the listed states under the four existing themes with the real theme provider; compare with the previous release output   | —                                                                                                              | `__tests__/menu-previous-release.spec.tsx`: "MenuButton AC-008, Menu AC-004: SHOULD match the previous release markup under %s" (Menu Button and Accordion fixtures); `menuButton.spec.tsx`: "MenuButton AC-010, AC-008: SHOULD keep the previous rest and selected colors under %s"; `__tests__/base-invariance.spec.tsx` Menu Button fixtures (base and dark)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| AC-009               | B-009                        | Render the listed states under `next-norteui`; check text, icon, background and item spacing per state, including popover items  | `menuButton.stories.tsx` `norteUiStates`                                                                       | `menuButton.spec.tsx`: "MenuButton AC-009: SHOULD use neutral-textLow at rest and neutral-surfaceHighlight on hover and press under next-norteui", "MenuButton AC-009: SHOULD use neutral-background with primary-interactive when selected under next-norteui", "MenuButton AC-009, AC-010: SHOULD follow the provider when the theme changes after mount"; `menuButtonAccordion.spec.tsx`: "MenuButton AC-009: SHOULD keep the container transparent unless active under next-norteui", "MenuButton AC-009: SHOULD render items with neutral-textLow and no gap under next-norteui", "MenuButton AC-009, AC-010: SHOULD render popover items without gap under %s", "MenuButton AC-009, AC-010: SHOULD keep an open Accordion open and follow the provider when the theme changes" (token assignment; painted colors are checked in the story) |
| AC-010               | B-009                        | Render the same cases under `next-norteui-dark`; colors equal B-008, item spacing none                                           | `menuButton.stories.tsx` `norteUiDarkStates`                                                                   | `menuButton.spec.tsx`: "MenuButton AC-010, AC-008: SHOULD keep the previous rest and selected colors under %s", "MenuButton AC-009, AC-010: SHOULD follow the provider when the theme changes after mount"; `menuButtonAccordion.spec.tsx`: "MenuButton AC-010: SHOULD keep the previous container colors and remove the item gap under next-norteui-dark", "MenuButton AC-009, AC-010: SHOULD render popover items without gap under %s"                                                                                                                                                                                                                                                                                                                                                                                                        |
| AC-011               | B-007                        | Render under `next` and `next-dark`; no Norte UI change                                                                          | —                                                                                                              | `__tests__/menu-previous-release.spec.tsx`: "MenuButton AC-011, AC-016, Menu AC-008, AC-012: SHOULD render next, next-dark and no provider exactly as base"; `menuButton.spec.tsx`: "MenuButton AC-011: SHOULD follow the nearest provider when next is nested inside next-norteui"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| AC-012               | B-003, B-010                 | Render disabled (and disabled plus active) under six themes; click it                                                            | `menuButton.stories.tsx` `norteUiStates`, `basic` (painted precedence)                                         | `menuButton.spec.tsx`: "MenuButton AC-012: SHOULD keep the disabled appearance and ignore clicks under %s" (token assignment)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| AC-013               | B-011                        | Compare padding, radius, row height and icon size across six themes, expanded and collapsed                                      | —                                                                                                              | `menuButton.spec.tsx`: "MenuButton AC-013: SHOULD keep padding, radius, row height and icon size in all six themes (expanded: %s)"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| AC-014               | §7, §11                      | Tab to a button entry, check the focus ring, press Enter and Space; toggle an Accordion header by keyboard and check focus stays | `menuButton.stories.tsx` `basic` (focus ring)                                                                  | `menuButton.spec.tsx`: "MenuButton AC-014: SHOULD be reachable with Tab and activated with Enter and Space under %s"; `menuButtonAccordion.spec.tsx`: "MenuButton AC-014: SHOULD keep focus on the header when toggled with the keyboard"; the focus ring is not covered by automated tests                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| AC-015               | §3, §11                      | Render entry and Accordion with `as="a"`; element is a link                                                                      | —                                                                                                              | `menuButton.spec.tsx`: "MenuButton AC-015: SHOULD render as a link keeping its attributes"; `menuButtonAccordion.spec.tsx`: "MenuButton AC-015: SHOULD render as anchor when as prop is 'a'"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| AC-016               | B-007                        | Render without a theme provider; B-008 appearance                                                                                | —                                                                                                              | `__tests__/menu-previous-release.spec.tsx`: "MenuButton AC-011, AC-016, Menu AC-008, AC-012: SHOULD render next, next-dark and no provider exactly as base"; `menuButton.spec.tsx`: "MenuButton AC-016: SHOULD use the previous appearance without a ThemeProvider"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
