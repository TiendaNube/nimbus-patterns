# Menu Component Contract

> This document defines the public and behavioral contract of the component independently of its implementation technology.

## 1. Purpose

Menu is the application's main navigation panel. It organizes Menu Buttons into sections between a header and a footer, and can switch between an expanded panel and a collapsed icon rail.

Use it for:

- the side navigation of an application, usually placed in App Shell;
- a drawer menu on small screens (inside Sidebar).

Do not use it for:

- navigation between views of the same content (use Nav Tabs);
- a list of actions (use a popover with actions).

Related components: Menu Button (each entry), App Shell (layout that hosts the Menu and shares its expanded state), Sidebar (drawer on small screens).

---

## 2. Anatomy

| Part                                            | Required | Description                                                         |
| ----------------------------------------------- | -------: | ------------------------------------------------------------------- |
| Menu container                                  |      Yes | The panel that fills the available height and holds the other parts |
| Header (`Menu.Header`)                          |       No | Top area for consumer content such as a logo or store name          |
| Body (`Menu.Body`)                              |      Yes | Scrollable area that holds the sections                             |
| Section (`Menu.Section`)                        |       No | Group of entries with an optional title                             |
| Section title / divider                         |       No | Title when expanded; a thin divider when collapsed                  |
| Entries (`Menu.Button`, `Menu.ButtonAccordion`) |       No | Menu Buttons; their contract is the Menu Button contract            |
| Footer (`Menu.Footer`)                          |       No | Bottom entry with a trailing chevron, usually for settings          |

### Rules

- Header and Footer stay visible; only the Body scrolls.
- The Menu provides its expanded state, popover settings and popover side to every part and entry inside it.

---

## 3. Public API

### Inputs — Menu

| Name                        | Type               | Required | Default   | Description                                         |
| --------------------------- | ------------------ | -------: | --------- | --------------------------------------------------- |
| `children`                  | node               |      Yes | —         | Header, Body and Footer                             |
| `expanded`                  | boolean            |       No | `true`    | Expanded panel (`true`) or collapsed rail (`false`) |
| `showPopoversWhenCollapsed` | boolean            |       No | `true`    | Whether collapsed entries show popovers             |
| `popoverPosition`           | popover placement  |       No | `"right"` | Side where collapsed popovers open                  |
| native attributes           | element attributes |       No | —         | Forwarded to the container                          |

### Inputs — parts

| Part           | Name                                 | Type   | Required | Description                |
| -------------- | ------------------------------------ | ------ | -------: | -------------------------- |
| `Menu.Header`  | `children`                           | node   |      Yes | Header content             |
| `Menu.Body`    | `children`                           | node   |      Yes | Sections and entries       |
| `Menu.Section` | `title`                              | string |       No | Section title              |
| `Menu.Section` | `children`                           | node   |      Yes | Entries                    |
| `Menu.Footer`  | Menu Button inputs except `children` | —      |        — | Inputs of the footer entry |

### Events

| Event                   | Payload | Trigger                       |
| ----------------------- | ------- | ----------------------------- |
| `Menu.Footer` `onClick` | none    | The footer entry is activated |

### API Rules

- The theme in effect is read from the enclosing theme provider; Menu exposes no theme input.
- `Menu.Button` and `Menu.ButtonAccordion` are the Menu Button components.

---

## 4. Variants

| Variant   | Purpose                                   | When to use                                          |
| --------- | ----------------------------------------- | ---------------------------------------------------- |
| Expanded  | Full panel with labels and section titles | Default desktop navigation                           |
| Collapsed | Icon rail                                 | When space is reduced or the user collapses the menu |

### Rules

- The appearance follows the theme in effect (B-007, B-008).

---

## 5. States

| State                             | Trigger            | Expected behavior                                             |
| --------------------------------- | ------------------ | ------------------------------------------------------------- |
| Expanded                          | `expanded` `true`  | Labels and section titles shown (B-002)                       |
| Collapsed                         | `expanded` `false` | Icons only, section dividers, centered content (B-002, B-008) |
| Footer rest / selected / disabled | Footer inputs      | Chevron color follows the footer state (B-005)                |

---

## 6. Behavioral Contract

### B-001 - Shared settings

The Menu MUST provide `expanded`, `showPopoversWhenCollapsed` and `popoverPosition` to its parts and entries, with defaults `true`, `true` and `"right"`.

### B-002 - Expanded and collapsed parts

When expanded, a Section MUST show its title; when collapsed, it MUST NOT show the title and MUST show a thin divider instead when a title is given. The Body MUST render its children in both modes.

### B-003 - Scrolling

The Body MUST scroll vertically when its content is taller than the available space; the Header and Footer MUST stay visible.

### B-004 - Theme gating

The Norte UI appearance (B-008) MUST apply only when the theme in effect is exactly `next-norteui` or `next-norteui-dark`. Under `base`, `dark`, `next` and `next-dark`, the Menu and its parts MUST render the same output as the release that precedes this contract revision.

### B-005 - Footer chevron color

The footer chevron MUST use `primary-interactive` when the footer is `active` and `neutral-textDisabled` when it is disabled. At rest it MUST use the rest color of the theme in effect (B-007, B-008).

### B-006 - Footer entry

The footer MUST behave as a Menu Button with a trailing chevron.

### B-007 - Appearance under base, dark, next and next-dark

Under these themes, the Menu MUST keep the appearance it had before this contract revision: background `neutral-background`; 6px (`1-5`) between entries of a section; footer chevron at rest `neutral-textHigh`; collapsed section divider `neutral-surfaceHighlight`; when collapsed, Header, Body and Footer have 4px left padding and no right padding.

### B-008 - Appearance under Norte UI

Under both `next-norteui` and `next-norteui-dark`:

- 4px (`1`) between entries of a section;
- when collapsed, Header, Body and Footer have 8px (`2`) padding on both sides, so 32px entries are centered in a 48px rail; the collapsed Body also has 16px (`4`) bottom padding;
- the expanded Footer has 8px padding on both sides.

Under `next-norteui` only:

- Menu background `neutral-surfaceDisabled`;
- footer chevron at rest `neutral-textLow`;
- collapsed section divider `neutral-interactive`.

Under `next-norteui-dark`, background, chevron and divider colors MUST be the ones of B-007.

### B-009 - Unchanged expanded Header and Body

The expanded Header (16px padding) and the expanded Body (8px horizontal, 16px bottom padding) MUST be the same in all six themes.

### B-010 - No Header shadow

The collapsed Header MUST NOT show a shadow in any theme.

---

## 7. Interaction Contract

### Pointer

- Entries follow the Menu Button contract; the Menu adds no pointer behavior.

### Keyboard

- The Menu adds no key bindings; entries are reached with Tab in document order (Header, Body, Footer).

### Touch

- Entries follow the Menu Button contract.

### Focus

- The Menu never moves focus.

---

## 8. Content Contract

### Labels

- Section titles are short captions shown only when expanded.

### Supporting Content

- Header content is provided by the consumer.

### Icons

- The footer shows a trailing chevron in addition to its Menu Button content.

### Long Content

- Many entries make the Body scroll (B-003).

### Localization

- The Menu adds no text of its own.

---

## 9. Layout and Responsive Behavior

### Sizing

- The Menu fills the height of its container. Expanded, it takes the full width; collapsed, its width comes from its content and the container.
- Under Norte UI themes, the collapsed layout needs a rail at least 48px wide (32px entries plus 8px on each side).

### Alignment

- Collapsed parts center their content.

### Overflow

- The Body hides horizontal overflow and scrolls vertically.

### Responsive Behavior

| Condition                                        | Expected behavior                      |
| ------------------------------------------------ | -------------------------------------- |
| Collapsed rail of 48px or more under Norte UI    | Entries centered with 8px on each side |
| Collapsed rail narrower than 48px under Norte UI | Not supported: entries may be clipped  |

---

## 10. Composition Contract

### Supported Composition

- Header, Body (with Sections of Menu Buttons and Accordions) and Footer as direct children.
- Inside App Shell, which can share the expanded state, or inside Sidebar as a drawer.

### Unsupported Composition

- Nesting a Menu inside another Menu.

### Nesting Rules

- Sections go inside the Body; entries go inside Sections.

### Multiple Instances

- Each Menu provides its own settings; at most one collapsed popover is open per Menu (Menu Button contract).

---

## 11. Accessibility Contract

### Semantics

- The Menu container has no landmark role of its own; consumers may add one (for example by wrapping it in a `nav` element) through native attributes or a wrapper.

### Accessible Name

- Entries take their names from the Menu Button contract.

### Keyboard Access

- See §7 Keyboard.

### Focus

- Focus order follows document order: Header content, Body entries, Footer.

### Screen Reader Behavior

- Section titles are visible text when expanded; collapsed dividers are decorative.

### Visual Accessibility

- Under `next-norteui`, entry labels and the footer chevron meet WCAG AA contrast on the `neutral-surfaceDisabled` background.
- Under `next-norteui`, the section title (`neutral-textDisabled`, caption size) reaches about 3:1 on the new background. This is a known limitation of this revision.
- Under `next-norteui`, the collapsed section divider uses `neutral-interactive` so it stays visible on the `neutral-surfaceDisabled` background.
- Under `next-norteui-dark` the colors of B-007 apply, so contrast is the same as under `dark`.

---

## 12. Edge Cases

| Case                                                | Expected behavior                                                               |
| --------------------------------------------------- | ------------------------------------------------------------------------------- |
| Section without title, collapsed                    | No divider is shown                                                             |
| Many entries                                        | Body scrolls; Header and Footer stay (B-003)                                    |
| Footer active and disabled                          | Disabled color wins for the chevron (B-005)                                     |
| Collapsed rail narrower than 48px under Norte UI    | Not supported (§9)                                                              |
| No theme provider                                   | Treated as a non-Norte theme (B-004)                                            |
| Consumer content in the Header under `next-norteui` | Sits on the `neutral-surfaceDisabled` background; its colors are the consumer's |

---

## 13. Acceptance Criteria

### AC-001 - Shared settings and defaults

**Given** a Menu with and without `showPopoversWhenCollapsed` and `popoverPosition`
**When** an entry inside reads the Menu settings
**Then** it receives the given values, or `true`, `true` and `"right"` by default (B-001).

### AC-002 - Section title and divider

**Given** a Section with a title
**When** the Menu is expanded and then collapsed
**Then** the title is shown only when expanded and a divider replaces it when collapsed; the Body renders its children in both modes (B-002).

### AC-003 - Scrolling Body

**Given** a Menu whose Body content is taller than the container
**When** it is rendered
**Then** only the Body scrolls and the Header and Footer stay visible (B-003).

### AC-004 - Invariance under existing themes

**Given** a complete Menu (Header, Body, titled and untitled Sections, Footer at rest, selected and disabled)
**When** it is rendered expanded and collapsed under `base`, `dark`, `next` and `next-dark`
**Then** the output is identical to the previous release and matches B-007 (B-004, B-007).

### AC-005 - Norte UI spacing

**Given** the same Menu
**When** it is rendered under `next-norteui` and under `next-norteui-dark`, expanded and collapsed
**Then** sections use 4px between entries, the collapsed Header, Body and Footer use 8px on both sides, the collapsed Body has 16px bottom padding, and the expanded Footer has 8px on both sides (B-008).

### AC-006 - Norte UI light colors

**Given** the same Menu under `next-norteui`
**When** it is rendered
**Then** the background is `neutral-surfaceDisabled` and the footer chevron at rest is `neutral-textLow` (B-008).

### AC-007 - Norte UI dark colors

**Given** the same Menu under `next-norteui-dark`
**When** it is rendered
**Then** the background is `neutral-background` and the footer chevron at rest is `neutral-textHigh` (B-007, B-008).

### AC-008 - Exact theme matching

**Given** the same Menu under `next` and `next-dark`
**When** it is rendered
**Then** none of the Norte UI changes apply (B-004).

### AC-009 - Footer chevron states

**Given** a Footer at rest, `active`, and disabled (also disabled and `active`)
**When** it is rendered under each of the six themes
**Then** the chevron uses the rest color of the theme, `primary-interactive`, and `neutral-textDisabled` respectively (B-005, B-006).

### AC-010 - Unchanged expanded Header and Body; no shadow

**Given** a Menu expanded and collapsed
**When** it is rendered under each of the six themes
**Then** the expanded Header and Body paddings are the same everywhere and the collapsed Header shows no shadow (B-009, B-010).

### AC-011 - Centered collapsed rail

**Given** a collapsed Menu inside a 48px rail under `next-norteui`
**When** it is rendered in a browser
**Then** 32px entries are horizontally centered and not clipped (B-008, §9).

### AC-012 - No theme provider

**Given** a Menu with no theme provider
**When** it is rendered
**Then** it shows the appearance of B-007 (B-004).

### AC-013 - Collapsed section divider color

**Given** a collapsed Menu with a titled Section
**When** it is rendered under each of the six themes
**Then** the divider uses `neutral-interactive` under `next-norteui` and `neutral-surfaceHighlight` under every other theme (B-007, B-008).

---

## 14. Origin of Guarantees

Sources (revision-pinned):

- S1: TiendaNube/nimbus-patterns@7c9d39d8e0e848973fec91372bd67b10667a6f9c, `packages/react/src/components/Menu/src/menu.spec.tsx`, `src/components/MenuSection/menuSection.spec.tsx`, `src/components/MenuBody/menuBody.spec.tsx`, `src/components/MenuHeader/menuHeader.spec.tsx`.
- S2: same revision, `src/menu.types.ts`, `src/menu.docs.json`, `src/menu.stories.tsx`, `packages/react/src/components/AppShell/src/AppShell.tsx` (default collapsed width 48px).
- S3: same revision, `packages/react/src/components/Menu/CHANGELOG.md` (#133, collapsed alignment).
- S4: Published Nimbus documentation, Menu page (modes, header and footer always visible, Body scroll) and App Shell page (48px collapsed rail by default).
- R: Request and design decisions recorded on TiendaNube/nimbus-patterns#225 (Norte UI changes, invariance of the other themes, Header shadow not implemented).

| Acceptance Criterion | Behavior or contract section           | Origin        | Contract basis | Source or proposal rationale                                                                                                                           |
| -------------------- | -------------------------------------- | ------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| AC-001               | B-001                                  | Supported     | reconstructed  | S1 menu.spec.tsx (passes settings to context; default values)                                                                                          |
| AC-002               | B-002                                  | Supported     | reconstructed  | S1 menuSection.spec.tsx (title expanded, not collapsed; collapsed divider); menuBody.spec.tsx                                                          |
| AC-003               | B-003                                  | Supported     | reconstructed  | S4 Menu page (header and footer always visible, Body scrolls); S2 stories                                                                              |
| AC-004               | B-004                                  | Supported     | established    | R: other themes stay unchanged                                                                                                                         |
| AC-004               | B-007 (collapsed paddings)             | Supported     | reconstructed  | S3 #133 collapsed alignment                                                                                                                            |
| AC-004               | B-007 (background, gap, chevron color) | Design choice | —              | Serves R invariance; records the previous-release values the invariance test compares against                                                          |
| AC-005               | B-008 (spacing)                        | Supported     | established    | R: proposed contract delta on #225; Section gap 4px confirmed                                                                                          |
| AC-005               | B-008 (spacing also under dark)        | Supported     | established    | Design decision for this revision: Norte UI dark applies the spacing changes only                                                                      |
| AC-006               | B-008 (light colors)                   | Supported     | established    | R: proposed contract delta on #225                                                                                                                     |
| AC-007               | B-008 (dark keeps B-007 colors)        | Supported     | established    | Design decision for this revision: Norte UI dark keeps the dark colors until a Norte UI dark palette exists                                            |
| AC-008               | B-004                                  | Supported     | established    | R: exact theme keys; `next` and `next-dark` unchanged                                                                                                  |
| AC-009               | B-005, B-006                           | Supported     | reconstructed  | S2 types (Footer takes Menu Button inputs); S2 stories (footer entry)                                                                                  |
| AC-009               | B-005 (disabled over active)           | Design choice | —              | Serves the Menu Button disabled rule; one precedence for chevron and label                                                                             |
| AC-010               | B-009                                  | Supported     | established    | R: only collapsed Header and Body, and the Footer, change                                                                                              |
| AC-010               | B-010                                  | Supported     | established    | R: the collapsed Header shadow is not implemented                                                                                                      |
| AC-011               | B-008, §9                              | Supported     | reconstructed  | S2 AppShell default 48px; S4 App Shell 48px rail                                                                                                       |
| AC-011               | §9 (narrower rails not supported)      | Design choice | —              | Serves R collapsed geometry; 32px entries plus 8px on each side need 48px                                                                              |
| AC-012               | B-004                                  | Design choice | —              | Serves R invariance; a missing provider is not a Norte UI theme                                                                                        |
| AC-013               | B-007, B-008                           | Supported     | established    | Design decision for this revision: under `next-norteui` the collapsed section divider uses `neutral-interactive` to stay visible on the new background |

---

## 15. Compatibility and Migration

| Area                           | Impact                                                                                                      | Affected contract reference |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------- | --------------------------- |
| Public API                     | None                                                                                                        | §3                          |
| Behavior and defaults          | None                                                                                                        | B-001 to B-003              |
| Layout and content             | Under Norte UI themes only: tighter section spacing, symmetric collapsed padding, collapsed rail needs 48px | B-008, §9                   |
| Accessibility and interactions | Under `next-norteui` only: new background; section title less visible                                       | §11                         |
| Supported composition          | Consumers using a collapsed rail narrower than 48px with a Norte UI theme must widen it                     | §9                          |

- Backward compatibility: output under `base`, `dark`, `next` and `next-dark` is unchanged (B-004).
- Migration required: No for existing themes. Consumers that opt into a Norte UI theme with a collapsed rail narrower than 48px must use a rail of at least 48px.
- Consumer migration steps, when required: set the App Shell collapsed menu width to 48px or more (48px is the App Shell default).

---

## 16. Test Traceability

| Acceptance Criterion | Behavior or contract section | Verification scenario                                                                                                                             | Storybook or preview reference                       | Automated test reference                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| -------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-001               | B-001                        | Render a Menu with and without popover settings; read the values from an entry                                                                    | —                                                    | `menu.spec.tsx`: "Menu AC-001: SHOULD pass showPopoversWhenCollapsed and popoverPosition to context", "Menu AC-001: SHOULD use default values when tooltip props are not provided"                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| AC-002               | B-002                        | Render a titled Section expanded and collapsed; check title and divider; render Body children collapsed                                           | `menu.stories.tsx` `basic`, `menuCollapsed`          | `menu.spec.tsx`: "Menu AC-002: SHOULD show section titles only when expanded and dividers only for titled sections when collapsed"; `menuSection.spec.tsx`: "Menu AC-002: SHOULD render children correctly when expanded", "Menu AC-002: SHOULD render title correctly when expanded", "Menu AC-002: SHOULD not render title when not expanded", "Menu AC-002: SHOULD not render a divider for an untitled section when collapsed"; `menuBody.spec.tsx`: "Menu AC-002: SHOULD render children correctly", "Menu AC-002: SHOULD render children when collapsed"                                                                                           |
| AC-003               | B-003                        | Render a Menu with many entries in a short container; only the Body scrolls                                                                       | `menu.stories.tsx` `menuInsideFixedBar`              | partial: `menu.spec.tsx`: "Menu AC-003 (partial, DOM only): SHOULD make only the Body scrollable" (overflow and flex settings; scrolling itself is checked in the story)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| AC-004               | B-004, B-007                 | Render the complete Menu expanded and collapsed under four existing themes with the real theme provider; compare with the previous release output | —                                                    | `__tests__/menu-previous-release.spec.tsx`: "MenuButton AC-008, Menu AC-004: SHOULD match the previous release markup under %s" (Menu fixtures); `__tests__/base-invariance.spec.tsx` Menu fixtures (base and dark); the "Menu AC-005, AC-004" part tests for the four existing themes                                                                                                                                                                                                                                                                                                                                                                   |
| AC-005               | B-008                        | Render under both Norte UI themes, expanded and collapsed; check section gap and paddings                                                         | `menu.stories.tsx` `norteUi`, `norteUiCollapsedRail` | `menu.spec.tsx`: "Menu AC-005: SHOULD use the Norte UI spacing under %s when expanded", "Menu AC-005: SHOULD use the Norte UI spacing under %s when collapsed", "Menu AC-005, AC-006, AC-007: SHOULD follow the provider when the theme changes after mount"; `menuSection.spec.tsx`: "Menu AC-005, AC-004: SHOULD set the gap between entries under %s (expanded: %s)"; `menuHeader.spec.tsx`: "Menu AC-005, AC-004: SHOULD set the collapsed horizontal padding under %s"; `menuBody.spec.tsx`: "Menu AC-005, AC-004: SHOULD set the collapsed padding under %s"; `menuFooter.spec.tsx`: "Menu AC-005, AC-004: SHOULD set the footer padding under %s" |
| AC-006               | B-008                        | Render under `next-norteui`; check background and rest chevron color                                                                              | `menu.stories.tsx` `norteUi`                         | `menu.spec.tsx`: "Menu AC-006: SHOULD use neutral-surfaceDisabled and a neutral-textLow chevron under next-norteui", "Menu AC-005, AC-006, AC-007: SHOULD follow the provider when the theme changes after mount" (token assignment)                                                                                                                                                                                                                                                                                                                                                                                                                     |
| AC-007               | B-007, B-008                 | Render under `next-norteui-dark`; check background and rest chevron color                                                                         | —                                                    | `menu.spec.tsx`: "Menu AC-007: SHOULD keep the previous background and chevron colors under next-norteui-dark", "Menu AC-005, AC-006, AC-007: SHOULD follow the provider when the theme changes after mount"                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| AC-008               | B-004                        | Render under `next` and `next-dark`; no Norte UI change                                                                                           | —                                                    | `__tests__/menu-previous-release.spec.tsx`: "MenuButton AC-011, AC-016, Menu AC-008, AC-012: SHOULD render next, next-dark and no provider exactly as base" (Menu fixtures)                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| AC-009               | B-005, B-006                 | Render the Footer at rest, active, disabled, disabled and active, under six themes                                                                | `menu.stories.tsx` `norteUi`                         | `menuFooter.spec.tsx`: "Menu AC-009: SHOULD color the chevron under %s when the footer is %s", "Menu AC-009: SHOULD behave as a Menu Button and call onClick once", "Menu AC-009: SHOULD not call onClick when the footer is disabled"                                                                                                                                                                                                                                                                                                                                                                                                                   |
| AC-010               | B-009, B-010                 | Compare expanded Header and Body paddings across six themes; check no shadow on the collapsed Header                                              | —                                                    | `menuHeader.spec.tsx`: "Menu AC-010: SHOULD keep the expanded padding in all six themes and never show a shadow"; `menuBody.spec.tsx`: "Menu AC-010: SHOULD keep the expanded padding in all six themes"                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| AC-011               | B-008, §9                    | Browser check: collapsed Menu in a 48px App Shell rail under `next-norteui`; entries centered, not clipped                                        | `menu.stories.tsx` `norteUiCollapsedRail`            | —                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| AC-012               | B-004                        | Render without a theme provider; B-007 appearance                                                                                                 | —                                                    | `menu.spec.tsx`: "Menu AC-012: SHOULD use the previous appearance without a ThemeProvider"; `__tests__/menu-previous-release.spec.tsx`: "MenuButton AC-011, AC-016, Menu AC-008, AC-012: SHOULD render next, next-dark and no provider exactly as base"                                                                                                                                                                                                                                                                                                                                                                                                  |
| AC-013               | B-007, B-008                 | Render a collapsed titled Section under six themes; check the divider color                                                                       | `menu.stories.tsx` `norteUiCollapsedRail`            | `menuSection.spec.tsx`: "Menu AC-013: SHOULD color the collapsed section divider under %s"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
