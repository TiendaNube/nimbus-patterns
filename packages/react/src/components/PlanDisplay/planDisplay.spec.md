# PlanDisplay Component Contract

> This document defines the public and behavioral contract of the component independently of its implementation technology.

## 1. Purpose

PlanDisplay presents several subscription plans (or comparable options) as cards that a person can compare. Each plan card has a header (name, optional tag, price), a content area (description, call to action, feature bullets) and an optional footer. A card can be emphasised as the featured plan.

Use it for:

- showing pricing tiers or plan options side by side, on viewports at or above the Nimbus `md` breakpoint (672px), as a grid of cards;
- showing the same plans on viewports below `md` through the documented mobile composition (section 10): a horizontal carousel with one plan per viewport and pagination dots below it, built from a ScrollPane, the existing PlanDisplay subcomponents, ProductUpdates.Paginator for the dots (a visual indicator, not a control), and the keyboard behaviour this contract defines.

Do not use it for:

- dense comparative data (use a table);
- a single standalone card with no siblings, unless it is the card itself that is wanted.

Related components: ScrollPane (the scrolling area and its edge fades), ProductUpdates.Paginator (the dots, non-interactive, with neutral appearance), Card, Box and the Nimbus responsive display props (the layout switch).

---

## 2. Anatomy

| Part | Required | Description |
|---|---:|---|
| PlanDisplay (grid container) | Yes, for the grid layout | Lays the plan cards out in a responsive grid |
| Card | Yes (at least one) | One plan: ribbon area on top and a surface that holds the other parts |
| Ribbon area | Yes, on every card | Visible featured label when a ribbon label is given; an invisible reserved area of the same height otherwise |
| Header | Yes | Plan name (subtitle), title slot (usually Price), optional tag, optional extra content |
| Price | No | Current price, optional previous price, optional period and optional annual note |
| Content | No | Content area with a divider on top, holding description, call to action and bullets |
| Bullet | No | Feature row: icon, text, optional disabled treatment, optional inline badge |
| Spacing | No | A standalone divider line |
| Footer | No | Bottom area, pinned to the bottom of the card, optional icon (add-on row) |
| Mobile carousel (composition) | No | Below `md`: a labelled scroll area (ScrollPane) whose items each wrap one Card |
| Dots (composition) | No, only with two or more plans | Below the scroll area: a centred, non-interactive row of one dot per plan, 6px apart, rendered by ProductUpdates.Paginator with neutral appearance |

### Rules

- PlanDisplay.Card, .Header, .Price, .Content, .Spacing, .Bullet and .Footer are the supported subcomponents; there is no other.
- The grid container and the mobile carousel are two arrangements of the same cards. The carousel and its dots are a documented composition resolved inside PlanDisplay's package; they are not a part or a mode of PlanDisplay (B-005) and they change no component other than the additive ProductUpdates.Paginator `appearance` input defined in that component's own contract (B-025).

---

## 3. Public API

### Inputs

PlanDisplay (grid container)

| Name | Type | Required | Default | Description |
|---|---|---:|---|---|
| minPlanWidth | string (CSS length) | No | `"225px"` | Minimum width of one plan column |
| children | node | Yes | — | The plan cards |
| layout box props | Box props except width, display, flexDirection, backgroundColor, pb | No | — | Passed to the grid container |

PlanDisplay.Card

| Name | Type | Required | Default | Description |
|---|---|---:|---|---|
| ribbonLabel | node | No | none | Featured label shown in a ribbon on top; selects the featured surface |
| gradient | boolean | No | false | Gradient background variant |
| highlighted | boolean | No | false | Deprecated featured treatment kept for backwards compatibility |
| children | node | No | — | Card content |
| Box props except border colour, radius, style, width and shadow | Box props | No | — | Passed to the card |

PlanDisplay.Header: `subtitle` (string, required), `title` (node, required), `tag` (node, optional, shown beside the subtitle), `children` (optional extra content below the title).

PlanDisplay.Price: `price` (node, required), `previousPrice` (optional, shown with a line-through), `period` (optional, e.g. "/mes"), `annualNote` (optional note below the price).

PlanDisplay.Content: `children`.

PlanDisplay.Bullet: `icon` (node, required), `disabled` (boolean, optional, marks a feature the plan does not include), `badge` (node, optional, inline after the text), `children` (text).

PlanDisplay.Footer: `icon` (node, optional; when given the footer renders as an icon plus content row), `children`.

PlanDisplay.Spacing: Box props except children and the divider's own border props and vertical margin.

Mobile composition strings (supplied by the consumer when composing the carousel, in the user's language; not inputs of any PlanDisplay subcomponent): scroll-area label, the position label of the active plan (for example "Plan 2 de 4"), passed to the dots as `aria-label` and used for the announcement, and one name per plan item (B-006, B-021, B-022, B-023). The dots are ProductUpdates.Paginator with `appearance="neutral"`, `totalItems` the number of plans and `activeIndex` the active plan (B-006, B-011).

### Events

None. Activation events belong to the controls the consumer places in the cards.

### Actions

Not applicable — the component exposes no explicit actions.

### API Rules

- There is no prop, variant, subcomponent or export for a mobile or carousel layout (B-005).
- `highlighted` remains supported and deprecated; `ribbonLabel` and `gradient` are the supported emphasis inputs.
- The mobile composition uses only inputs ScrollPane already has (B-025); no ScrollPane input is added for it. The only capability from outside PlanDisplay that is not already published is the additive ProductUpdates.Paginator neutral appearance (B-025).

---

## 4. Variants

| Variant | Purpose | When to use |
|---|---|---|
| Default card | Neutral card with a level-2 shadow | Regular plans |
| Ribbon card (`ribbonLabel`) | Featured plan: ribbon with the label and a 2px primary border, no shadow | The plan to emphasise |
| Gradient card (`gradient`) | Featured plan with the primary-to-neutral gradient background and the default shadow | A plan emphasised without a ribbon |
| Legacy highlighted card (`highlighted`) | Deprecated: 3px primary border and level-3 shadow | Existing consumers only |

### Rules

- Precedence (B-002): `ribbonLabel` wins over `gradient` and `highlighted`; `gradient` wins over `highlighted`; `highlighted` applies alone; otherwise the default card.
- Grid and carousel are arrangements, not variants (B-005).

---

## 5. States

| State | Trigger | Expected behavior |
|---|---|---|
| Default | Card without emphasis | Level-2 shadow, neutral background |
| Featured (ribbon) | `ribbonLabel` provided | Ribbon visible with the label, 2px primary border |
| Featured (gradient) | `gradient` without `ribbonLabel` | Gradient background |
| Legacy highlighted | `highlighted` without `ribbonLabel` and without `gradient` | 3px primary border, level-3 shadow |
| Disabled bullet | Bullet `disabled` | Icon and text use the disabled colours |
| Carousel active plan | The plan whose rest position is nearest the scroll position (B-018) | Matching dot is the active dot (B-011, B-019) |
| Dot active / inactive | Two or more plans | Active dot is the 24x6px pill in `primary-interactive`; inactive dots are 6x6px in `neutral-interactiveHover`; 6px between dots (B-019) |
| Scroll area focused | Keyboard focus on the scroll area itself | Visible focus indicator; ArrowRight and ArrowLeft move between plans (B-023) |

Hover, pressed and focus states of controls inside the cards belong to those controls. The cards and the dots are not interactive and have no hover, pressed or focus state.

---

## 6. Behavioral Contract

### B-001 - Grid layout

When PlanDisplay renders its cards, it MUST lay them out in a grid of auto-fitting columns, each at least `minPlanWidth` wide (default 225px) and sharing the remaining width equally, with a 1.5rem gap, centred, and with every card in a row stretched to the row's height. With 4 plans and `minPlanWidth` 236px, 4 columns fit when the container is at least 4 x 236px + 3 x 24px (1016px) wide; below that the plans wrap, to 3+1 when at least 3 columns fit and to 2+2 or fewer per row when only 2 fit. This wrapping is the existing behaviour; no other layout rule is added and PlanDisplay never changes arrangement on its own.

### B-002 - Card surface precedence

When a card receives `ribbonLabel`, `gradient` and/or `highlighted`, it MUST apply exactly one surface treatment: ribbon (label visible, 2px primary border, no gradient, no legacy border or shadow) if `ribbonLabel` is present; otherwise gradient background with the default shadow if `gradient` is true (even when `highlighted` is also true); otherwise the legacy treatment if `highlighted` is true; otherwise the default shadow.

### B-003 - Reserved ribbon area

When a card is rendered, with or without `ribbonLabel`, it MUST reserve the same ribbon-area height on top. Without a label the area is invisible and hidden from assistive technologies. Cards with and without a ribbon in the same row or carousel therefore have their subtitle, price, bullets and footers vertically aligned. Cards fill the height their container gives them, and the Footer sits at the bottom of the card.

### B-004 - Subcomponent slots

When the subcomponents are composed in a card, each MUST render its slots: Header (subtitle, title, optional tag beside the subtitle, optional extra content); Price (price, and previous price, period and annual note only when provided); Content (a divider on top, then its children); Bullet (icon, text, disabled treatment, optional badge); Footer (optional icon row, pinned to the bottom, with a divider on top); Spacing (a divider line). A slot that is not provided renders nothing.

### B-005 - No mobile prop, no self-switching

PlanDisplay MUST NOT offer any prop, variant, subcomponent or export for a mobile layout, carousel or dots, and MUST NOT change between grid and carousel at any width. Its grid API and behaviour are those of B-001.

### B-006 - Mobile composition structure

When a consumer builds the mobile composition below `md`, it MUST consist of: one ScrollPane with arrows off, scrollbar off, edge gradients on (the default), scroll-to-item-on-click off and mouse grab-scroll not used; inside it one ScrollPane.Item per plan, each wrapping one PlanDisplay.Card; and, below the scroll area when there are two or more plans, the dots of B-011: ProductUpdates.Paginator with `appearance="neutral"`, `totalItems` the number of plans, `activeIndex` the active plan (B-018) and `aria-label` the consumer-provided localized position label of the active plan (B-021). Each item MUST be a group (not a button) with a consumer-provided localized accessible name for its plan (for example the plan's subtitle) and MUST NOT be in the tab order. The scroll area carries the label of B-023. The cards use the real PlanDisplay subcomponents exactly as in the Default story; no prop is added to them.

### B-007 - Item width and gutters

When the scroll area is S px wide (the supported domain is 320px up to 671px), the composition MUST use a 16px leading and trailing gutter, a 16px gap between items (spacing 4) and an item width W = S - 2 x (16 + 16) = S - 64. At S = 393 W is 329px; at S = 320 W is 256px. Cards are not narrower than the 236px minimum used by the grid stories at any S in the domain. Behaviour below 320px is not guaranteed.

### B-008 - One plan per viewport and positions

When the carousel is at rest, exactly one plan MUST be fully visible, and its position (its rest position) MUST be: first plan aligned to the start (16px gutter), the next plan peeking 32px; middle plans centred, each neighbour peeking exactly 16px; last plan aligned to the end (16px trailing gutter), the previous plan peeking 32px. The peek of a middle plan is 16px at every S in the domain. A one-plan carousel is aligned to the start with no neighbours.

Geometry for 4 plans (x measured from the scroll area's left edge, px):

| S | W | Plan 1 | Plan 2 | Plan 3 | Plan 4 |
|---|---|---|---|---|---|
| 393 | 329 | 16-345; plan 2 visible 361-393 (32) | 32-361; plan 1 visible 0-16, plan 3 visible 377-393 | same as plan 2 | 48-377; plan 3 visible 0-32; gutter 377-393 |
| 320 | 256 | 16-272; plan 2 visible 288-320 (32) | 32-288; plan 1 visible 0-16, plan 3 visible 304-320 | same as plan 2 | 48-304; plan 3 visible 0-32; gutter 304-320 |

### B-009 - Edge fades

When a plan peeks on a side, the carousel MUST show the ScrollPane edge fade on that side; it MUST NOT show the fade at the start while the first plan is active, nor at the end while the last plan is active. Middle plans show both. (ScrollPane shows an edge fade only on a side that has further content.)

### B-010 - Equal height in the carousel

When the carousel holds cards of different content length, all cards MUST have the height of the tallest, with the Footer (when present) at the bottom of each card, and the reserved ribbon area (B-003) on every card, with or without a ribbon.

### B-011 - Dots: presence, count and synchronisation

When the carousel has two or more plans, the dots MUST be shown below the scroll area as one dot per plan, in plan order, as a row centred horizontally below the scroll area; exactly one dot, the one for the active plan (B-018), MUST be the active dot, and it MUST update as the active plan changes by any cause (swipe, wheel or trackpad, keyboard, focus). With one plan no dots are shown. The dots are ProductUpdates.Paginator (B-006); dot visuals, semantics and the announcement are B-019, B-021 and B-022.

### B-012 - Call-to-action activation

When a control inside a card (for example the call-to-action button or a link in the footer) is activated by pointer, touch or keyboard, the control MUST fire its own action and the carousel MUST NOT scroll because of the activation.

### B-013 - Responsive switch owned by the consumer

When the consuming application composes both arrangements, it MUST render the PlanDisplay grid at widths of 672px (Nimbus `md`) and above and the carousel below 672px, for example with Nimbus responsive display props; at 671px the carousel is shown and at 672px the grid. Exactly one of the two MUST be visible, and only the visible one is exposed to assistive technologies and reachable by keyboard, at every width. Both render the same plans with the same cards and content.

### B-014 - Documented stories

The patterns Storybook MUST keep the Default story (4 plans in the grid, `minPlanWidth` 236px) and MUST add a Mobile story (the 4 plans of Default in the carousel composition at a mobile viewport) and a Responsive story (grid at and above `md`, carousel below). The package documentation describes the composition.

### B-015 - Focus order and focus into a plan

When the carousel is shown, focus order MUST be: scroll area, then each card's controls in plan order, then the content that follows (the dots are never focusable, B-021); Shift+Tab traverses the exact reverse. When focus moves into a control in a plan other than the active one, the carousel MUST bring that plan to its rest position (B-008) and it becomes the active plan.

### B-016 - Exclusions

The carousel MUST NOT depend on mouse dragging (mouse drag does not move it) and MUST NOT show arrows or a scrollbar. Touch swipe, trackpad scroll and keyboard scrolling move between plans and rest per B-017; on desktop without a touch screen, plans change by trackpad or wheel scrolling and by keyboard. The dots do not move the carousel (B-021).

### B-017 - Resting on exactly one plan

When the carousel scrolls for any reason (swipe, wheel or trackpad, keyboard, focus moving into a plan), it MUST come to rest at exactly one plan's rest position (B-008) and never between two. After the scroll area is resized (for example a rotation within the supported domain), it MUST rest at the rest position, for the new size, of the plan that was active before the resize.

### B-018 - Active plan

When the carousel is at any scroll position, the active plan MUST be the plan whose rest position is nearest to the current scroll position, changing at the midpoint between two adjacent rest positions. When the carousel first renders, plan 1 is active.

### B-019 - Dot visuals and spacing

When dots are shown (B-011), the active dot MUST be a 24x6px pill in the `primary-interactive` colour (#0059D5) and each inactive dot a 6x6px dot in the `neutral-interactiveHover` colour (#888888), so that they differ by width as well as by colour; both MUST have a non-text contrast of at least 3:1 against the neutral background (`neutral-background`, #FFFFFF) they sit on. Adjacent dots MUST be 6px apart, so the row is 24 + (N - 1) x 12 px wide for N plans (60px for 4). The dots MUST NOT have a touch target or hit area beyond their visual size.

### B-021 - Dot semantics

When dots are shown, they MUST be a visual indicator only: the row MUST be exposed as a single image named by the consumer-provided localized position label of the active plan (for example "Plan 2 de 4"), and that name MUST change when the active plan changes; individual dots MUST be hidden from assistive technologies; neither the row nor any dot MUST be focusable; and clicking or tapping the dots MUST NOT move the carousel or change the active plan. The Paginator makes no live announcement; the announcement of B-022 is part of the composition.

### B-022 - Announcement of the active plan

When the carousel has two or more plans and a scroll settles on a plan whose position label (B-021) differs from the last announced one, that label MUST be announced politely, once. There MUST be no announcement on initial render, none for plans passed during a single scroll, and none repeated while the active plan is unchanged.

### B-023 - Scroll area region and arrow keys

When the carousel is shown, the scroll area MUST be exposed as a region named by a consumer-provided localized label (for example "Planes"), be reachable with Tab and show a visible focus indicator. ArrowRight and ArrowLeft, listened on the scroll area element, MUST act only when the scroll area element itself is the focused element (not when focus is on a control inside a plan): ArrowRight moves to the next plan and ArrowLeft to the previous one, each resting at its position (B-017), and the default action is prevented when the key is handled. Each move scrolls smoothly, or instantly when the user prefers reduced motion. ArrowRight at the last plan and ArrowLeft at the first do nothing. ArrowUp and ArrowDown are not handled. Arrow keys pressed while focus is on a control inside a plan are not handled by the carousel and their default action is not prevented by it; any scroll that results still rests per B-017. Propagation is never stopped. Right-to-left layout is not part of this contract.

### B-024 - Independent carousels

When several carousels are on one page, each MUST keep its own scroll position, active plan, dots and announcements; an event in one MUST NOT change another.

### B-025 - Only existing ScrollPane inputs; changes limited to nimbus-patterns

The mobile composition MUST work with the ScrollPane inputs that exist today (arrows, scrollbar, edge gradients, scroll-to-item-on-click, mouse grab-scroll, the scroll-area reference, and item role, tab index, style and other div attributes). It MUST NOT require any change to ScrollPane, a design-system release, or a change of the `@nimbus-ds/components` version. The only change outside PlanDisplay is the additive ProductUpdates.Paginator `appearance` input defined in its own contract, with ProductUpdates' default behaviour unchanged.

---

## 7. Interaction Contract

### Pointer

- Clicking a control inside a card activates only that control (B-012).
- Clicking a dot does nothing (B-021).
- Mouse drag of the carousel is not supported (B-016); on desktop, plans change by trackpad or wheel scrolling and by keyboard.
- Mouse wheel and trackpad scrolling rest on a plan (B-017).

### Keyboard

| Key | Listener | Active when | Prevents default | Stops propagation |
|---|---|---|---|---|
| ArrowRight | The scroll area element | The scroll area element is the focused element and the active plan is not the last | Yes, when handled | No |
| ArrowLeft | The scroll area element | The scroll area element is the focused element and the active plan is not the first | Yes, when handled | No |
| ArrowRight at the last plan, ArrowLeft at the first | The scroll area element | Same, at the end | No, nothing is handled | No |
| ArrowRight, ArrowLeft with focus on a control inside a plan | — | Not handled by the carousel; any resulting scroll rests per B-017 | No, by the carousel | No |
| ArrowUp, ArrowDown | — | Not handled | — | — |
| Enter, Space | The focused control inside a card | A control is focused | Per that control | Per that control |
| Tab, Shift+Tab | Native focus navigation | Always | Not intercepted | No |

- No other Nimbus component handles ArrowRight or ArrowLeft on the scroll area. PlanDisplay subcomponents register no key bindings, and nothing listens at document level. ScrollPane.Item reacts to Enter and Space only to scroll its item on click, which is off in this composition (B-006), so the keys fire only the focused control's action (B-012).
- Scrolling caused by an arrow key is smooth, or instant when the user prefers reduced motion (B-023).

### Touch

- Swiping the carousel scrolls between plans and rests on a plan (B-008, B-017).
- Tapping a dot does nothing; the dots have no touch target (B-019, B-021). Tapping a control inside a card activates it without scrolling (B-012).

### Focus

- Order: scroll area, each card's controls in plan order, following content (B-015); the dots are not focusable (B-021). Reverse is the exact reverse.
- Focus moving into a control of a non-active plan brings that plan to its rest position and makes it active (B-015).
- Activating a card control does not move focus away from it and does not scroll the carousel (B-012). Handling an arrow key keeps focus on the scroll area (B-023).
- The grid has no focus behaviour of its own; focus order is DOM order.

---

## 8. Content Contract

### Labels

- Plan name is the Header subtitle (string); it is also the recommended accessible name of the plan's carousel item.
- Scroll-area label, the position label of the active plan and plan item names are provided by the consumer in the user's language (for example "Planes", "Plan 2 de 4"). The dots' name (B-021) and the announcement (B-022) use the position label.

### Supporting Content

- Price, annual note, description, bullets and footer are optional slots (B-004).
- The ribbon label is optional; its absence reserves the area (B-003).

### Icons

- Bullet icons and the Footer icon are consumer-provided and inherit the primary colour (disabled bullets the disabled colour).

### Long Content

- Text wraps inside the card; cards never truncate bullets.
- In the grid, a card with more content makes its row taller and all cards in the row stretch. In the carousel, the tallest plan sets the height of every card (B-010).

### Localization

- All text is consumer-provided and may expand; the card width is fixed by B-007 in the carousel and by columns in the grid, so expansion grows height.
- Right-to-left layout is not part of this contract.

---

## 9. Layout and Responsive Behavior

### Sizing

- Grid: columns at least `minPlanWidth` (default 225px), 1.5rem gap, cards fill column and row height (B-001).
- Carousel: item width S - 64, 16px gutters and gap (B-007). Dots: 24x6px active, 6x6px inactive, 6px apart, no touch target (B-019).

### Alignment

- Grid: columns centred. Carousel: positions per B-008. Footers at the bottom of cards (B-003, B-010). Dots: one centred row below the scroll area (B-011).

### Overflow

- Grid: wraps onto new rows. Carousel: scrolls horizontally inside the scroll area; the page does not scroll horizontally because of it.

### Responsive Behavior

| Condition | Expected behavior |
|---|---|
| Width at or above 672px (`md`) | Consumer renders the grid (B-013) |
| Width 671px or below | Consumer renders the carousel (B-013); supported down to a 320px scroll area (B-007) |
| Scroll area resized | Rests on the plan active before (B-017) |
| 4 plans, container below 1016px and at least 756px wide with `minPlanWidth` 236px | 3 columns, wrapping 3+1 (B-001) |
| 4 plans, container below 756px and at least 496px wide with `minPlanWidth` 236px | 2 columns, wrapping 2+2 (B-001) |
| 4 plans, container at least 1016px wide | 4 columns (B-001) |

The column thresholds and the dot-row width are arithmetic from `minPlanWidth`, the gaps and the dot sizes; they are not measured values.

---

## 10. Composition Contract

### Supported Composition

- Grid: PlanDisplay with PlanDisplay.Card children, each holding Header, Content, optional Footer.
- Header title slot holds PlanDisplay.Price or any node.
- Mobile carousel (B-006): a labelled ScrollPane > ScrollPane.Item (group, named, not in the tab order) > PlanDisplay.Card, followed below the scroll area by the dots: ProductUpdates.Paginator with `appearance="neutral"` and the localized position label (B-006, B-021).
- Responsive: Nimbus responsive display props show the grid at and above `md` and the carousel below (B-013).
- The consumer supplies the localized strings listed in section 3 when composing and adds ProductUpdates.Paginator for the dots.

### Unsupported Composition

- A PlanDisplay.Card is not wrapped in an item that acts as a button around the card's own controls.
- The ProductUpdates.Paginator with its default appearance is not used for the dots, and the dots are not wrapped in or turned into controls (B-006, B-021).
- Scroll-to-item-on-click, arrows, scrollbar and mouse grab-scroll are not used in the carousel (B-006, B-016).

### Nesting Rules

- Subcomponents are used inside PlanDisplay.Card; Price is used in Header's title; Bullet in Content.
- Interactive controls inside a card follow their own components' contracts.

### Multiple Instances

- Several grids or carousels on a page are independent; each carousel's position, active plan, dots and announcements follow only its own plans (B-024).

---

## 11. Accessibility Contract

### Semantics

- The cards are static content; the call to action is a real control from the consumer. In the carousel each plan is a group (B-006) inside a region (B-023); the dots are a single non-interactive image delivered by the Paginator (B-021).

### Accessible Name

- Scroll area: localized label. Plan group: the plan's name. Dots: the localized position label of the active plan (for example "Plan 2 de 4"); individual dots are hidden. The invisible ribbon placeholder is hidden from assistive technologies.

### Keyboard Access

- As in section 7 Keyboard; the carousel is fully operable without a pointer: arrow keys on the scroll area (B-023) and Tab to the controls in each plan, which brings their plan into view (B-015).

### Focus

- Visible focus indicator on the scroll area in the Nimbus focus style (B-023); controls in cards keep their own; the dots are not focusable (B-021). Order per B-015. No focus restoration is defined.

### Screen Reader Behavior

- Each plan is announced as a named group; controls announce their own names. The dots image is named by the active plan's position label (B-021). That label is announced politely once when a scroll settles on a different plan (B-022). Only the visible arrangement is exposed (B-013).

### Visual Accessibility

- Dots differ by width and colour, not colour alone, and both states have at least 3:1 non-text contrast (B-019). Arrow-key moves scroll instantly when the user prefers reduced motion (B-023). The dots are a visual indicator with no touch target; every plan is reachable by swipe, scrolling or keyboard (B-016, B-019, B-021).

---

## 12. Edge Cases

| Case | Expected behavior |
|---|---|
| Plan with ribbon vs without in the carousel | Same card height, aligned rows (B-003, B-010) |
| One plan in the carousel | Aligned to the start, no neighbours, no peek fade, no dots (B-008, B-011) |
| Two plans | Plan 1 is first, plan 2 is last; no middle plan; two dots |
| Three plans | Plan 1 first, plan 2 centred with 16px peeks, plan 3 last |
| Scroll area 320px | W = 256px; peeks as in B-008 |
| Scroll area resized | Rests on the plan active before (B-017) |
| Width exactly 671px / 672px | Carousel / grid (B-013) |
| Longest plan content | Sets the height of all carousel cards |
| Card without footer, without tag, without ribbon | Slots omitted (B-004); ribbon area still reserved (B-003) |
| Activation of a control in a peeking card | Fires its action; carousel does not scroll (B-012) |
| Tab moves focus to a control in a plan that is not active | That plan comes to its rest position and becomes active (B-015) |
| Scroll position exactly midway between two plans | The earlier plan stays active until the position passes the midpoint (B-018) |
| A dot is clicked or tapped | Nothing happens; the carousel does not move and no focus moves to the dots (B-021) |
| ArrowRight on the last plan, ArrowLeft on the first | Nothing happens; default not prevented (B-023) |
| Arrow key with focus on a button inside a plan | Not handled by the carousel; default not prevented by it; any resulting scroll rests on one plan (B-017, B-023) |
| Many plans | The dot row is 24 + (N - 1) x 12 px wide; it fits a 320px scroll area up to 25 plans (B-019) |
| Fast swipe across several plans | Rests on one plan; only that plan's label is announced, if it differs from the last announced (B-017, B-022) |
| Two carousels on one page | Independent (B-024) |
| `highlighted` with `gradient` | Gradient treatment (B-002) |

---

## 13. Acceptance Criteria

### AC-001 - Four-plan grid

**Given** a PlanDisplay with `minPlanWidth` 236px and four cards (Default story) in a container of at least 1016px
**When** it renders
**Then** the four cards are in one row with a 1.5rem gap, all with the height of the tallest (B-001).

### AC-002 - Custom minimum plan width

**Given** a PlanDisplay with `minPlanWidth` set
**When** the container narrows
**Then** columns are never narrower than that value and plans wrap (B-001).

### AC-003 - Default minimum plan width

**Given** a PlanDisplay without `minPlanWidth`
**When** it renders
**Then** the columns' minimum width is 225px (B-001, §3).

### AC-004 - Four-plan wrapping

**Given** four plans with `minPlanWidth` 236px
**When** the container is 1016px, 900px, 700px
**Then** the plans are laid out 4, 3+1 and 2+2 respectively (B-001, §9).

### AC-005 - Equal-height rows in the grid

**Given** cards of different content length, one with a ribbon, in the grid
**When** it renders
**Then** all cards in a row have the same height and their footers sit at the card bottoms (B-001, B-003).

### AC-006 - Surface precedence

**Given** cards with each combination of `ribbonLabel`, `gradient` and `highlighted`
**When** they render
**Then** each has exactly the one treatment of B-002.

### AC-007 - Ribbon area reserved

**Given** a card with a ribbon label and a card without
**When** both render
**Then** the ribbon areas have the same height, the label is visible only on the first, and the placeholder is hidden from assistive technologies (B-003).

### AC-008 - Header and Price slots

**Given** Header with and without `tag` and Price with and without `previousPrice`, `period`, `annualNote`
**When** they render
**Then** the tag appears beside the subtitle, and omitted slots render nothing (B-004).

### AC-009 - Content, Bullet, Footer, Spacing slots

**Given** Content with Bullets (one disabled, one with a badge), a Footer with and without icon, and a Spacing
**When** they render
**Then** Content shows a divider on top, disabled bullets use disabled colours, badge is inline after the text, the Footer icon row appears only with `icon`, and Spacing renders a divider (B-004).

### AC-010 - No self-switching and no mobile API

**Given** PlanDisplay at widths 320px, 671px, 672px and 1200px
**When** it renders
**Then** it keeps the grid arrangement and exposes no mobile, carousel or dots prop, variant, subcomponent or export (B-005).

### AC-011 - Composition structure

**Given** the mobile composition for four plans
**When** it renders
**Then** each Card is inside its own ScrollPane.Item of one ScrollPane with arrows off, scrollbar off, edge gradients on, scroll-to-item-on-click off and grab-scroll unused, the items are groups that are not in the tab order, the dots follow below the scroll area, and no prop is added to PlanDisplay subcomponents (B-006).

### AC-012 - Item width at 393px and 320px

**Given** a scroll area of 393px, then 320px
**When** the carousel renders
**Then** the item width is 329px, then 256px, with 16px gutters and 16px gap (B-007).

### AC-013 - Plan 1 position

**Given** four plans, first active, at 393px and at 320px
**When** the carousel rests
**Then** plan 1 spans 16-345 (393px) and 16-272 (320px), and plan 2 shows 32px at the right (B-008).

### AC-014 - Plans 2 and 3 positions

**Given** four plans, plan 2 then plan 3 active, at 393px and at 320px
**When** the carousel rests
**Then** the active plan spans 32-361 (393px) and 32-288 (320px), and both neighbours show exactly 16px (B-008).

### AC-015 - Plan 4 position

**Given** four plans, plan 4 active, at 393px and at 320px
**When** the carousel rests
**Then** plan 4 spans 48-377 (393px) and 48-304 (320px), plan 3 shows 32px at the left and a 16px trailing gutter remains (B-008).

### AC-016 - One plan fully visible

**Given** the carousel at any position, 320px to 671px
**When** it rests
**Then** exactly one plan is fully visible (B-008).

### AC-017 - Two and three plans

**Given** a carousel with two plans, then three plans
**When** each position is reached
**Then** first/middle/last rules of B-008 apply, with no middle plan for two (B-008).

### AC-018 - Edge fades

**Given** four plans
**When** plan 1, plan 2, plan 4 are active
**Then** fades appear: end only; both; start only (B-009).

### AC-019 - Equal carousel height

**Given** four plans of different content length in the carousel
**When** it renders
**Then** all cards have the height of the tallest (B-010).

### AC-020 - Ribbon and footer alignment in the carousel

**Given** a carousel with one ribbon plan, one gradient plan, plans without ribbon, and one footer
**When** it renders
**Then** the ribbon area is reserved on every card, rows align across cards, and the footer is at the bottom of its card (B-010, B-003).

### AC-021 - Dots synchronised

**Given** a carousel with four plans
**When** the active plan changes by swipe, wheel or trackpad, keyboard or focus
**Then** there are four dots in plan order, in one row centred below the scroll area, and exactly the dot of the active plan is the active dot (B-011, B-018).

### AC-023 - Call-to-action activation

**Given** the carousel with plan 2 active and a button in plan 2 and a button in peeking plan 3
**When** each is activated by pointer and by Enter or Space
**Then** its own action fires once and the carousel does not scroll (B-012).

### AC-024 - Switch at 671px and 672px

**Given** a page with both arrangements
**When** the width is 671px, then 672px
**Then** the carousel is shown, then the grid (B-013).

### AC-025 - One arrangement exposed

**Given** a page with both arrangements
**When** at any width
**Then** only the visible one is exposed to assistive technologies and keyboard focus (B-013).

### AC-026 - Same plans in both

**Given** both arrangements
**When** compared at 671px and 672px
**Then** the plans, order, text and controls are the same (B-013).

### AC-027 - Stories

**Given** the PlanDisplay stories
**When** opened
**Then** Default (grid), Mobile (four-plan carousel) and Responsive (grid and carousel by width) exist (B-014).

### AC-028 - Naming of plans

**Given** the carousel
**When** inspected by assistive technology
**Then** each plan item is a group named for its plan and none is a button (B-006).

### AC-029 - Focus order

**Given** a carousel with two or more plans followed by other content
**When** Tab, then Shift+Tab, traverse
**Then** order is scroll area, plan controls in order, following content, never a dot, and the exact reverse (B-015, B-021).

### AC-030 - Exclusions

**Given** the carousel
**When** inspected and dragged with a mouse, then scrolled with a trackpad or wheel
**Then** no arrows or scrollbar are present, mouse drag does not move it, and trackpad or wheel scrolling moves it to a plan (B-016, B-017).

### AC-031 - Touch and keyboard land on a plan

**Given** the carousel on a touch device and with a keyboard
**When** the user swipes or scrolls by keyboard
**Then** the carousel stops on a plan per B-008 (B-016, B-017).

### AC-032 - Focus brings a plan into view

**Given** four plans with plan 1 active and focus on the last control of plan 1
**When** Tab moves focus to the first control of plan 2, then Shift+Tab returns it to plan 1
**Then** plan 2 rests centred per B-008 and its dot is active, then plan 1 rests aligned to the start and its dot is active (B-015, B-008, B-011).

### AC-033 - Every scroll rests on one plan

**Given** a carousel with four plans
**When** it is scrolled by swipe, by wheel or trackpad, by keyboard and by focus moving into a plan
**Then** each time it comes to rest at exactly one plan's rest position and never between two (B-017).

### AC-034 - Resize keeps the plan

**Given** a carousel with four plans, plan 3 active, at 393px
**When** the scroll area is resized to 320px
**Then** it rests at plan 3's rest position for 320px, and plan 3 is still active (B-017, B-018).

### AC-035 - Active plan rule

**Given** a carousel with four plans just rendered, then scrolled slowly from plan 1 towards plan 2
**When** the position is before, then past, the midpoint between their rest positions
**Then** plan 1 is active initially and until the midpoint, then plan 2 is active, with the active dot following (B-018, B-011).

### AC-036 - Dot visuals

**Given** a carousel with four plans, plan 2 active
**When** the dots render
**Then** the active dot is a 24x6px pill in `primary-interactive` (#0059D5), the other three are 6x6px in `neutral-interactiveHover` (#888888), adjacent dots are 6px apart (row 60px wide), and each has at least 3:1 non-text contrast against `neutral-background` (#FFFFFF) (B-019).

### AC-040 - Dot semantics

**Given** a carousel with four plans, plan 2 active, and the position label "Plan 2 de 4"
**When** inspected by assistive technology and with Tab, then plan 3 becomes active
**Then** the dots are one image named "Plan 2 de 4", then "Plan 3 de 4", with no individual dot exposed, and Tab never focuses the dots (B-021).

### AC-041 - Announcement

**Given** a carousel with four plans and a screen reader running
**When** the page renders, then a swipe passes plans 2 and 3 and settles on plan 4, then the carousel stays still, then the user scrolls back and settles on plan 3
**Then** nothing is announced at render; "Plan 4 de 4" is announced politely once and no label for plans 2 or 3 while passing; nothing is repeated while still; "Plan 3 de 4" is announced once on settling (B-022).

### AC-042 - Scroll area region

**Given** a carousel with four plans, then a carousel with one plan
**When** each is inspected by assistive technology and with Tab
**Then** in both the scroll area is a region with its localized label, Tab reaches it first within the carousel, and it shows a visible focus indicator when focused (B-023).

### AC-043 - Arrow keys on the scroll area

**Given** a carousel with four plans, plan 2 active, and the scroll area focused
**When** ArrowRight is pressed, then ArrowLeft twice, with and without the reduced-motion preference
**Then** plan 3 rests at its position, then plan 2, then plan 1, scrolling smoothly without the preference and instantly with it; the default action is prevented each time, propagation is not stopped and focus stays on the scroll area (B-023, B-017).

### AC-044 - Arrow key limits and exclusions

**Given** a carousel with four plans
**When** with the scroll area focused, ArrowLeft is pressed on plan 1, ArrowRight on plan 4, and ArrowUp or ArrowDown on plan 2; then, with focus on a button inside plan 2, ArrowRight is pressed
**Then** in the first three cases the carousel does not move horizontally and does not prevent the default action; in the last case the carousel does not prevent the default action, focus stays on the button, and if the browser scrolls the carousel it comes to rest on one plan (B-023, B-017).

### AC-045 - Independent carousels

**Given** a page with two carousels of four plans each
**When** one is scrolled and its arrow keys used
**Then** the other keeps its position, active plan, active dot and announces nothing (B-024).

### AC-046 - Only existing ScrollPane inputs

**Given** the mobile composition and its stories
**When** inspected
**Then** it works using only ScrollPane's existing inputs, requires no change to ScrollPane, no design-system release and no `@nimbus-ds/components` version change, and the only change outside PlanDisplay is the additive ProductUpdates.Paginator `appearance` input, with ProductUpdates' default behaviour unchanged (B-025).

### AC-047 - No dots with one plan

**Given** a carousel with one plan
**When** it renders
**Then** the plan is aligned to the start and no dots are shown (B-011, B-008).

### AC-048 - Dots are not interactive

**Given** a carousel with four plans, plan 1 active, on a touch device and with a mouse
**When** the dot for plan 3 is tapped, then clicked
**Then** the carousel does not move, plan 1 stays active, no dot receives focus, and no dot has a touch target larger than its visual size (B-019, B-021).

---

## 14. Origin of Guarantees

Pinned evidence: nimbus-patterns@49e42056f4a37640a26c3b8df739073684567e02 (paths below are under `packages/react/src/components/PlanDisplay/`) and nimbus-design-system@51c1c1fb129be990baece10f749cd3fb9c1b94d3. Plans 2.0 requirement: one plan per viewport with dots synced to scroll, a keyboard-operable scroll area and a localizable announced position, as requested on TiendaNube/nimbus-patterns#202.

| Acceptance Criterion | Behavior or contract section | Origin | Contract basis | Source or proposal rationale |
|---|---|---|---|---|
| AC-001 | B-001 | Supported | reconstructed | nimbus-patterns@49e42056f4a37640a26c3b8df739073684567e02:packages/react/src/components/PlanDisplay/src/planDisplay.stories.tsx#L25-L173 (Default story, four plans, 236px) |
| AC-002 | B-001 | Supported | reconstructed | Same story (`minPlanWidth="236px"`); README.md#L41 |
| AC-003 | B-001, §3 | Design choice | — | Requirement that the PlanDisplay grid API and behaviour stay unchanged; the existing default is retained |
| AC-004 | B-001, §9 | Supported | reconstructed | Default story (four plans, 236px); thresholds are arithmetic from that value and a 1.5rem gap, not measured |
| AC-005 | B-001, B-003 | Supported | reconstructed | planDisplayCard.spec.tsx#L80-L99 and the Default story mixing ribbon and plain cards (same revision, `src/components/PlanDisplayCard/`) |
| AC-006 | B-002 | Supported | reconstructed | planDisplayCard.spec.tsx#L45-L135; planDisplayCard.types.ts#L4-L24 |
| AC-007 | B-003 | Supported | reconstructed | planDisplayCard.spec.tsx#L80-L99 |
| AC-008 | B-004 | Supported | reconstructed | README.md#L22-L25; planDisplayCardHeader.spec.tsx; planDisplayCardPrice.spec.tsx; Default story |
| AC-009 | B-004 | Supported | reconstructed | README.md#L26-L32; planDisplayBullet and planDisplayCardFooter specs; Default story |
| AC-010 | B-005 | Design choice | — | Request boundary: no new PlanDisplay prop, variant, subcomponent or export; PlanDisplay never switches layout; carousel and dots resolved within PlanDisplay's package |
| AC-011 | B-006 | Design choice | — | Plans 2.0 requirement for a mobile carousel composed from ScrollPane and the existing subcomponents; uses only existing ScrollPane inputs: nimbus-design-system@51c1c1fb129be990baece10f749cd3fb9c1b94d3:packages/react/src/composite/ScrollPane/src/ScrollPane.tsx#L35-L49,L184-L265 and components/ScrollPaneItem/ScrollPaneItem.tsx#L12-L58 (item role and tab index overridable) |
| AC-012 | B-007 | Design choice | — | Resolves the Figma conflict (a 345px card cannot be centred with a 16px peek at 393px): keeps the 16px gutter, gap and peek of Figma f6Boyk8BBYXilPIxhOfZjz node 14193:12877 |
| AC-013 | B-008 | Supported | established | Design review of the specification candidate on TiendaNube/nimbus-patterns#202: the first and last plans show a 32px peek of their neighbour |
| AC-013 | B-008 | Design choice | — | Requirement: one plan per viewport, first plan aligned to start; exact positions follow the geometry of B-007 |
| AC-014 | B-008 | Supported | established | Explicit product decision on TiendaNube/nimbus-patterns#202: middle cards are centred with a peek on both sides |
| AC-014 | B-007, B-008 | Supported | established | Design review of the specification candidate on TiendaNube/nimbus-patterns#202: middle plans show a 16px peek of each neighbour |
| AC-015 | B-008 | Supported | established | Design review of the specification candidate on TiendaNube/nimbus-patterns#202: the last plan shows a 32px peek of the previous plan |
| AC-015 | B-008 | Design choice | — | Requirement: last plan aligned to the end; exact positions follow the geometry of B-007 |
| AC-016 | B-008 | Design choice | — | Requirement: one plan per viewport |
| AC-017 | B-008 | Design choice | — | Extends the position rules to carousels of two and three plans (existing TwoPlans and ThreePlans stories) |
| AC-018 | B-009 | Supported | established | Design review of the specification candidate on TiendaNube/nimbus-patterns#202: the carousel keeps ScrollPane's edge fade |
| AC-018 | B-009 | Design choice | — | Figma 14193:12873 and 14193:12874 draw 32px gradients on both edges; fade shown only where a plan peeks, which matches ScrollPane showing an edge gradient only at an edge with further content (nimbus-design-system@51c1c1fb129be990baece10f749cd3fb9c1b94d3:packages/react/src/composite/ScrollPane/src/ScrollPane.tsx#L208-L231) |
| AC-019 | B-010 | Supported | established | Figma f6Boyk8BBYXilPIxhOfZjz node 14193:12358: four cards stretched to the row height |
| AC-020 | B-010, B-003 | Supported | reconstructed | planDisplayCard.spec.tsx#L80-L99 and PlanDisplayCard.tsx#L52-L114 (full height, reserved ribbon area) |
| AC-021 | B-011, B-018 | Design choice | — | Plans 2.0 requirement: dots synced to scroll; Figma f6Boyk8BBYXilPIxhOfZjz node 14192:11569 (dot row below the cards) |
| AC-023 | B-012 | Design choice | — | Plan item must not behave as a button wrapping the card's own call to action |
| AC-024 | B-013 | Supported | established | Explicit product decision on TiendaNube/nimbus-patterns#202: the switch follows Nimbus breakpoint `md` and is owned by the consuming application; md = 672px at nimbus-design-system@51c1c1fb129be990baece10f749cd3fb9c1b94d3:packages/core/tokens/src/breakpoint/sys.json#L6-L9 |
| AC-025 | B-013 | Design choice | — | Prevents duplicated content for assistive technologies; serves the same decision |
| AC-026 | B-013 | Supported | established | Explicit product decision on TiendaNube/nimbus-patterns#202: the mobile composition uses the real PlanDisplay subcomponents as in Default |
| AC-027 | B-014 | Supported | established | Explicit product decision on TiendaNube/nimbus-patterns#202: Storybook gets a mobile four-plan view next to the Default |
| AC-027 | B-014 | Design choice | — | The Responsive story documents the consumer-owned switch at `md` (B-013) |
| AC-028 | B-006 | Design choice | — | Accessible naming of plan items; requirement: documented composition with localizable names |
| AC-029 | B-015 | Design choice | — | Focus order of the composition; requirement: keyboard-operable scroll area; Design review on the same issue: dots are a visual indicator, so not in the focus order |
| AC-030 | B-016 | Supported | established | Design review of the specification candidate on TiendaNube/nimbus-patterns#202: mouse drag is excluded; on desktop plans change by trackpad or keyboard |
| AC-030 | B-016 | Design choice | — | Request exclusions: no arrows or scrollbar |
| AC-031 | B-016, B-017 | Design choice | — | Requirement: one plan per viewport |
| AC-032 | B-015, B-008, B-011 | Design choice | — | Keyboard users reach every plan's controls and the visible plan and dots follow focus; Plans 2.0 keyboard-operable requirement |
| AC-033 | B-017 | Design choice | — | Requirement: one plan per viewport, resting on a plan after any scroll cause |
| AC-034 | B-017, B-018 | Design choice | — | Requirement: one plan per viewport stays the visible plan across rotation or resize |
| AC-035 | B-018, B-011 | Design choice | — | Requirement: dots synced to scroll; nearest-rest-position rule is the chosen definition of the active plan |
| AC-036 | B-019, §3 | Supported | established | Explicit decision on TiendaNube/nimbus-patterns#202: the dots reuse ProductUpdates.Paginator with token colours and localizable labels |
| AC-036 | B-019 | Supported | established | Figma f6Boyk8BBYXilPIxhOfZjz node 14192:11569 (24x6px and 6x6px dots, 6px gap); Design review of the specification candidate on TiendaNube/nimbus-patterns#202: dots 6px apart and inactive dots in `neutral-interactiveHover` |
| AC-036 | B-019 | Design choice | — | Active `primary-interactive` serves the token-colour decision; `neutral-interactiveHover` is the first neutral token meeting 3:1 on white (nimbus-design-system@51c1c1fb129be990baece10f749cd3fb9c1b94d3:packages/core/tokens/src/color/sys.json and ref.json) |
| AC-040 | B-021, §3 | Supported | established | Explicit decision on TiendaNube/nimbus-patterns#202: the dots reuse ProductUpdates.Paginator with token colours and a localizable label; Design review of the specification candidate on TiendaNube/nimbus-patterns#202: the dots are a visual indicator, not tappable |
| AC-040 | B-021 | Design choice | — | Plans 2.0 requirement: localizable position; the Paginator's existing image semantics named by the active plan's position label are the chosen exposure |
| AC-041 | B-022 | Design choice | — | Plans 2.0 requirement: localizable announced position; polite once-per-settle rule is the chosen detail |
| AC-042 | B-023 | Design choice | — | Plans 2.0 requirement: keyboard-operable, labelled scroll area |
| AC-043 | B-023, B-017 | Design choice | — | Same requirement; key set, listener, prevent-default rule, smooth motion and its reduced-motion alternative are the chosen detail |
| AC-044 | B-023, B-017 | Design choice | — | Same requirement; boundaries and exclusion of controls inside plans avoid clashing with their own keys |
| AC-045 | B-024 | Design choice | — | Several plan sets can share a page; independence is the chosen guarantee |
| AC-046 | B-025 | Supported | established | Explicit decision on TiendaNube/nimbus-patterns#202: the carousel is resolved in nimbus-patterns without changing ScrollPane |
| AC-046 | B-025 | Supported | established | Explicit decision on TiendaNube/nimbus-patterns#202: the dots reuse ProductUpdates.Paginator, extended additively under its own contract |
| AC-047 | B-011, B-008 | Design choice | — | Requirement: dots paginate several plans; a single plan needs no pagination |
| AC-048 | B-019, B-021 | Supported | established | Design review of the specification candidate on TiendaNube/nimbus-patterns#202: the dots are not tappable and have no touch area |

---

## 15. Compatibility and Migration

| Area | Impact | Affected contract reference |
|---|---|---|
| Public API | None in PlanDisplay: no prop, variant, subcomponent or export added, changed or removed. ProductUpdates.Paginator gains the additive `appearance` input under its own contract; its defaults are unchanged | §3, B-005, B-025 |
| Behavior and defaults | None; grid defaults and card behaviour unchanged | B-001 to B-004 |
| Layout and content | Unchanged for the grid; the carousel is a new documented composition | B-007 to B-010 |
| Accessibility and interactions | New guarantees apply only to the documented carousel composition | B-011 to B-024 |
| Supported composition | Adds the mobile carousel, composed with the ScrollPane already in use, and its dots, which use ProductUpdates.Paginator with neutral appearance as a non-interactive indicator; no change to ScrollPane, no design-system release and no `@nimbus-ds/components` version change | B-006, B-025 |

- Backward compatibility: existing consumers are unaffected.
- Migration required: No.
- Consumer migration steps: Not applicable. Consumers wanting the mobile view adopt the documented composition, add ProductUpdates.Paginator for the dots, supply the localized strings, and render the grid at and above `md`.

---

## 16. Test Traceability

Stories existing at the evidence revision are in `src/planDisplay.stories.tsx`; unit tests are the `*.spec.tsx` files in `src/` and `src/components/*/`. The composition's semantic and keyboard checks (roles, names, tab order, arrow-key handling, non-interactive dots, ScrollPane inputs used) are automated jsdom tests in the PlanDisplay package that render the composition against the pinned ScrollPane and Paginator, so a change in either breaks a test; layout, snap and announcement checks need a real browser or the preview, because jsdom does no layout.

| Acceptance Criterion | Behavior or contract section | Verification scenario | Storybook or preview reference | Automated test reference |
|---|---|---|---|---|
| AC-001 | B-001 | Render Default in a 1100px container; four cards in a row, equal height | PlanDisplay/Default | planDisplay.spec.tsx (children only) |
| AC-002 | B-001 | Render with 300px then 236px minimum; no column narrower | PlanDisplay/Default | — |
| AC-003 | B-001 | Render without `minPlanWidth`; minimum is 225px | — | — |
| AC-004 | B-001 | Render four plans in 1016, 900, 700px containers; 4, 3+1, 2+2 | PlanDisplay/Default | — |
| AC-005 | B-001, B-003 | Mixed ribbon and plain cards; equal height, footers at bottom | PlanDisplay/Default | — |
| AC-006 | B-002 | Render the eight prop combinations; one treatment each | PlanDisplay.Card/base, legacyHighlighted | planDisplayCard.spec.tsx |
| AC-007 | B-003 | Compare ribbon and plain cards; same area height, placeholder hidden | PlanDisplay.Card/base | planDisplayCard.spec.tsx |
| AC-008 | B-004 | Render Header and Price with and without optional slots | PlanDisplay.Header/base, PlanDisplay.Price stories | planDisplayCardHeader.spec.tsx, planDisplayCardPrice.spec.tsx |
| AC-009 | B-004 | Render Content, Bullet, Footer, Spacing variations | PlanDisplay.Bullet/base, PlanDisplay.Content/base, PlanDisplay.Footer/base, PlanDisplay.Spacing/base | planDisplayBullet and planDisplayCardFooter specs |
| AC-010 | B-005 | Resize 320 to 1200px; PlanDisplay stays a grid; inspect API and exports | PlanDisplay/Default | planDisplay.spec.tsx ("AC-010: SHOULD keep the grid and expose no mobile, carousel or dots API"); resize to 320-1200px — preview |
| AC-011 | B-006 | Automated jsdom test in the PlanDisplay package rendering the composition against the pinned ScrollPane and Paginator: assert the ScrollPane inputs (arrows, scrollbar, gradients, scroll-to-item-on-click, grab-scroll), one group item per Card outside the tab order, and the Paginator with neutral appearance and the supplied `totalItems`, `activeIndex` and `aria-label`; inspect the Mobile story for layout | PlanDisplay/Mobile | src/compositions/MobilePlanCarousel/mobilePlanCarousel.spec.tsx ("AC-011"); layout in the Mobile story |
| AC-012 | B-007 | Measure item width at 393 and 320px | PlanDisplay/Mobile (393px frame) | src/compositions/MobilePlanCarousel/mobilePlanCarousel.spec.tsx ("AC-012": item width and spacing vars; measured width in preview) |
| AC-013 | B-008 | At each width, plan 1 active; check positions | PlanDisplay/Mobile (393px frame) | src/compositions/MobilePlanCarousel/mobilePlanCarousel.spec.tsx ("AC-013 AC-014 AC-015": geometry tables; painted positions — preview) |
| AC-014 | B-008 | Plans 2, 3 active at each width; check positions and 16px peeks | PlanDisplay/Mobile (393px frame) | src/compositions/MobilePlanCarousel/mobilePlanCarousel.spec.tsx ("AC-013 AC-014 AC-015": geometry tables; painted positions — preview) |
| AC-015 | B-008 | Plan 4 active at each width; check positions | PlanDisplay/Mobile (393px frame) | src/compositions/MobilePlanCarousel/mobilePlanCarousel.spec.tsx ("AC-013 AC-014 AC-015": geometry tables; painted positions — preview) |
| AC-016 | B-008 | Rest at each plan; count fully visible plans | PlanDisplay/Mobile | src/compositions/MobilePlanCarousel/mobilePlanCarousel.spec.tsx ("AC-016 AC-017": geometry for 320-671px; painted positions — preview) |
| AC-017 | B-008 | Two- and three-plan carousels; check each position | PlanDisplay/Mobile | src/compositions/MobilePlanCarousel/mobilePlanCarousel.spec.tsx ("AC-016 AC-017": two- and three-plan geometry; painted positions — preview) |
| AC-018 | B-009 | Plans 1, 2, 4 active; check fades | PlanDisplay/Mobile | src/compositions/MobilePlanCarousel/mobilePlanCarousel.spec.tsx ("AC-018") |
| AC-019 | B-010 | Different-length plans; compare heights | PlanDisplay/Mobile | — |
| AC-020 | B-010, B-003 | Ribbon and plain plans; compare row alignment and footer | PlanDisplay/Mobile | — |
| AC-021 | B-011, B-018 | Change plan by swipe, wheel, keyboard, focus; check dot count, row position and active dot | PlanDisplay/Mobile | src/compositions/MobilePlanCarousel/mobilePlanCarousel.spec.tsx ("AC-021": scroll, keyboard and focus; swipe and wheel — preview) |
| AC-023 | B-012 | Activate button in active and peeking plan; check action and no scroll | PlanDisplay/Mobile | src/compositions/MobilePlanCarousel/mobilePlanCarousel.spec.tsx ("AC-023") |
| AC-024 | B-013 | Resize to 671 and 672px | PlanDisplay/Responsive | — |
| AC-025 | B-013 | Inspect accessibility tree and Tab order at both widths | PlanDisplay/Responsive | — |
| AC-026 | B-013 | Compare plans at 671 and 672px | PlanDisplay/Responsive | — |
| AC-027 | B-014 | Open the stories list; Mobile and Responsive exist | PlanDisplay/Default, Mobile, Responsive | src/compositions/MobilePlanCarousel/mobilePlanCarousel.spec.tsx ("AC-027") |
| AC-028 | B-006 | Automated jsdom test in the PlanDisplay package rendering the composition against the pinned ScrollPane and Paginator: query the plan items by role; each is a group named for its plan and none is a button | — | src/compositions/MobilePlanCarousel/mobilePlanCarousel.spec.tsx ("AC-028") |
| AC-029 | B-015 | Tab and Shift+Tab through the carousel and dots | PlanDisplay/Mobile | src/compositions/MobilePlanCarousel/mobilePlanCarousel.spec.tsx ("AC-029") |
| AC-030 | B-016 | Inspect for arrows and scrollbar; try mouse drag; scroll with trackpad and wheel | PlanDisplay/Mobile | src/compositions/MobilePlanCarousel/mobilePlanCarousel.spec.tsx ("AC-030": no arrows or scrollbar, mouse drag ignored; wheel and trackpad — preview) |
| AC-031 | B-016, B-017 | Swipe and keyboard scroll; check resting position | PlanDisplay/Mobile | src/compositions/MobilePlanCarousel/mobilePlanCarousel.spec.tsx ("AC-043": keyboard targets only; swipe — preview) |
| AC-032 | B-015, B-008, B-011 | Tab from plan 1 into plan 2 and back; check resting position and active dot | PlanDisplay/Mobile | src/compositions/MobilePlanCarousel/mobilePlanCarousel.spec.tsx ("AC-032") |
| AC-033 | B-017 | Scroll by each cause; check the rest position every time | PlanDisplay/Mobile | src/compositions/MobilePlanCarousel/mobilePlanCarousel.spec.tsx ("AC-032 AC-043": keyboard and focus targets only; swipe, wheel and trackpad — preview) |
| AC-034 | B-017, B-018 | Resize 393 to 320px with plan 3 active; check rest position and active plan | PlanDisplay/Mobile | src/compositions/MobilePlanCarousel/mobilePlanCarousel.spec.tsx ("AC-034") |
| AC-035 | B-018, B-011 | Scroll slowly from plan 1 to plan 2; check active plan and dot around the midpoint and at render | PlanDisplay/Mobile | src/compositions/MobilePlanCarousel/mobilePlanCarousel.spec.tsx ("AC-035") |
| AC-036 | B-019 | Measure dot sizes and 6px gaps; check the `primary-interactive` and `neutral-interactiveHover` colours and compute contrast against `neutral-background` | PlanDisplay/Mobile | — |
| AC-040 | B-021 | Automated jsdom test in the PlanDisplay package rendering the composition against the pinned ScrollPane and Paginator: assert one image named by the position label, renamed when the active plan changes, dots hidden, no focusable dot | — | src/compositions/MobilePlanCarousel/mobilePlanCarousel.spec.tsx ("AC-040") |
| AC-041 | B-022 | Run with a screen reader or live-region log through render, fast swipe, idle and a short scroll | PlanDisplay/Mobile | src/compositions/MobilePlanCarousel/mobilePlanCarousel.spec.tsx ("AC-041": live-region text with fake timers; screen reader log — preview) |
| AC-042 | B-023 | Automated jsdom test in the PlanDisplay package rendering the composition against the pinned ScrollPane and Paginator: with four plans and with one plan assert the scroll area is a region with its label and is first in tab order; check the focus indicator in the preview | PlanDisplay/Mobile (focus indicator) | src/compositions/MobilePlanCarousel/mobilePlanCarousel.spec.tsx ("AC-042") |
| AC-043 | B-023, B-017 | Automated jsdom test in the PlanDisplay package rendering the composition against the pinned ScrollPane and Paginator: press ArrowRight then ArrowLeft twice on the focused scroll area, with and without a mocked reduced-motion preference; assert the scroll target and behaviour (smooth or instant) each time, default prevented, propagation not stopped and focus unchanged; check the resting position in a browser | PlanDisplay/Mobile | src/compositions/MobilePlanCarousel/mobilePlanCarousel.spec.tsx ("AC-043") |
| AC-044 | B-023, B-017 | Automated jsdom test in the PlanDisplay package rendering the composition against the pinned ScrollPane and Paginator: press arrows at the ends and ArrowUp or ArrowDown on the focused scroll area, then ArrowRight on a button in plan 2; assert no scroll request, default not prevented and focus unchanged; check the rest position in a browser | — | src/compositions/MobilePlanCarousel/mobilePlanCarousel.spec.tsx ("AC-044") |
| AC-045 | B-024 | Two carousels; operate one, check the other | — | src/compositions/MobilePlanCarousel/mobilePlanCarousel.spec.tsx ("AC-045") |
| AC-046 | B-025 | Automated jsdom test in the PlanDisplay package rendering the composition against the pinned ScrollPane and Paginator: assert the composition passes only existing ScrollPane inputs; review that ScrollPane, the design-system packages and the `@nimbus-ds/components` version are unchanged and that ProductUpdates defaults are unchanged | — | src/compositions/MobilePlanCarousel/mobilePlanCarousel.spec.tsx ("AC-046": DOM assertions; unchanged ScrollPane and component versions by review) |
| AC-047 | B-011, B-008 | Render one plan; check position and absence of dots | PlanDisplay/Mobile | src/compositions/MobilePlanCarousel/mobilePlanCarousel.spec.tsx ("AC-047") |
| AC-048 | B-019, B-021 | Automated jsdom test in the PlanDisplay package: click each dot; assert no scroll request, active plan unchanged, no focusable dot; tap dots in a touch preview and measure that no target exceeds the dot size | PlanDisplay/Mobile | src/compositions/MobilePlanCarousel/mobilePlanCarousel.spec.tsx ("AC-048": click and touch events; touch target size — preview) |
