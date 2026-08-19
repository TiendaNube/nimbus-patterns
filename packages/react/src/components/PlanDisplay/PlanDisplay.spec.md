# PlanDisplay — Specification

> Derived from the "Generated specification" section of [GitHub issue #185](https://github.com/TiendaNube/nimbus-patterns/issues/185), "PlanDisplay: align the pattern with Plans 2.0" — the approved Design and Engineering contract for this contribution.

## 1. Problem and user outcome

The current `PlanDisplay` pattern does not represent the Plans 2.0 composition used by Billing and reflected in the design master. Product teams currently depend on a custom, product-local implementation instead of a supported Nimbus pattern.

The intended user outcome is a canonical `PlanDisplay` composition that supports the Plans 2.0 hierarchy, pricing information, plan differentiation, feature availability, and responsive layouts, so that consuming teams no longer need to build or maintain product-local structure to represent plans.

A `PlanDisplay` pattern already exists on the default branch (package `@nimbus-ds/plan-display`), at `packages/react/src/components/PlanDisplay/`. This is the pre-Plans-2.0 implementation being extended — `PlanDisplay`, `.Card` (previously with `highlighted?: boolean`), `.Header` (`subtitle`, `title`), `.Content`, `.Spacing`, `.Bullet` (`icon`, `disabled?: boolean`), and `.Footer` (children only) — rather than a new pattern built from nothing.

## 2. Scope

- Card-level visual hierarchy with a default level-2 shadow (AC-01).
- Optional plan emphasis on `PlanDisplay.Card` via `ribbonLabel` or `gradient`, with defined precedence when both are supplied (AC-02).
- A new `PlanDisplay.Price` subcomponent for current price, with optional previous price, period, and annual note (AC-03).
- An optional `tag` on `PlanDisplay.Header`, shown next to its supporting text (AC-04).
- An optional `badge` and a disabled-feature treatment on `PlanDisplay.Bullet`, extended with a required, localized `unavailableLabel` accessibility label whenever `disabled` is `true` (AC-05, AC-09).
- An optional `icon` on `PlanDisplay.Footer` (AC-06).
- Consistent alignment across cards in a comparison, including reserved ribbon space (AC-07).
- The responsive compositions named in AC-08 — two-plan, three-plan, horizontal, and horizontal-mobile — as the required usage examples for this contribution: two-plan and three-plan are built with the existing `PlanDisplay` auto-fit grid, and horizontal and horizontal-mobile are consumer compositions assembled from existing subcomponents. None of the four is a new `PlanDisplay` prop or a new named runtime layout variant, and the four are not necessarily an exhaustive set of every composition a consumer could build.
- Preservation of accessible semantics and keyboard/screen-reader behavior for price, previous price, feature availability, headings, and interactive content (AC-09).
- Removal of the legacy `highlighted` prop as a breaking, major-version change, with consumer migration to `ribbonLabel` or `gradient`.
- **The canonical Plans 2.0 composition recipe (validation amendment — "Canonical Plans 2.0 composition recipe"):** a normative Header/Content/Footer content order and placement — Header carries plan name/metadata, `PlanDisplay.Price`, and the optional current-plan `tag`; Content carries the description, then the primary plan action immediately after the description, then the feature bullets; Footer carries only an optional supporting offer and its optional leading icon, with no primary plan-selection action — scoped specifically to the canonical Plans 2.0 comparison story and its visual validation (AC-02, AC-07). This recipe is in scope as a documentation and validation-story requirement; it is not a new prop, slot, runtime variant, or a restriction on what consumers may build with the existing public subcomponents in their own compositions.

## 3. Non-goals

- Retaining or re-adding the legacy `highlighted` prop is out of scope: it is removed, and consumers migrate to `ribbonLabel` or `gradient`.
- No public contract changes beyond the seven additions and one removal listed under "Public API" below are in scope for this contribution — this is a hard boundary, including the `PlanDisplay.Bullet.unavailableLabel` accessibility contract. Any additional public contract requires a new explicit issue decision.
- The two-plan, three-plan, horizontal, and horizontal-mobile compositions named in AC-08 are the required usage examples for this contribution, built entirely from the resolved public contract rather than introducing new named layout props or runtime variants. A composition that would require a new public contract or a new layout API is out of scope here.
- **The canonical Header/Content/Footer content order is normative only for the canonical Plans 2.0 comparison story** used for visual validation of AC-02 and AC-07. It is not a restriction on how consumers may compose `PlanDisplay` in their own product: `PlanDisplay` remains compositionally flexible, and consumers may place `PlanDisplay.Price`, a primary action, or `PlanDisplay.Footer` content in a different arrangement using the existing public subcomponents. Enforcing this order at the component API level is out of scope; it is a documentation and validation-story concern, not a component-level restriction.

## 4. Acceptance criteria

| ID | Name | Criterion |
| --- | --- | --- |
| AC-01 | Card hierarchy | Each plan is presented as a card with the Plans 2.0 visual hierarchy and a level-2 shadow by default. |
| AC-02 | Plan emphasis | A card can display an optional `ribbonLabel` or optional `gradient` treatment. When both are supplied, `ribbonLabel` takes precedence. |
| AC-03 | Pricing | `PlanDisplay.Price` displays the current price. `previousPrice`, `period`, and `annualNote` are optional. |
| AC-04 | Header metadata | `PlanDisplay.Header` can display an optional `tag` next to its supporting text. |
| AC-05 | Feature metadata | `PlanDisplay.Bullet` can display an optional `badge` and a disabled feature treatment with a close icon. |
| AC-06 | Footer affordance | `PlanDisplay.Footer` can display an optional `icon` alongside its content. |
| AC-07 | Comparison alignment | Cards in the same comparison reserve ribbon space and align comparable content and footers consistently. |
| AC-08 | Responsive composition | The supported compositions are two-plan, three-plan, horizontal, and horizontal-mobile layouts. They preserve the content meaning and order across viewport sizes. |
| AC-09 | Accessible behavior | Price, previous price, feature availability, headings, and interactive content preserve meaningful semantics and keyboard/screen-reader behavior. Engineering verifies this during implementation review. |

**Verification note:** each AC is testable against the resolved contract in sections 5–9, as sharpened by the validation amendment's ribbon visual contract and bullet icon color treatment. AC-02's precedence rule is testable via the co-occurrence rule (when `ribbonLabel` is present, `gradient` is fully suppressed) and, concretely, via the ribbon visual contract in section 9 — a full-width ribbon with a `primary-interactive` background and centered `neutral-background` text, sharing the card's top border radius with the card surface so the two read as one continuous shape with no visible seam, a `2px` `primary-interactive` border on the card surface, and suppression of the default level-2 shadow whenever `ribbonLabel` is present, with the gradient fully suppressed (not layered underneath) whenever both are supplied. AC-07 is testable via the reserved ribbon-space requirement: cards without `ribbonLabel` reserve an equivalent, invisible ribbon area — no border, no background, the same height a rendered ribbon would occupy — so comparison alignment holds whether or not a given card carries a ribbon. AC-05's disabled-feature treatment is now also concretely testable via the bullet icon color treatment in section 9: enabled bullet icons (`disabled` false or omitted) render `primary-interactive`, never the legacy `success-interactive`, while disabled icons and text keep the approved neutral unavailable treatment and enabled bullet text stays `neutral-textLow`. AC-02 and AC-07 are further testable via the two-block structural model resolved in section 9 under "Card structural block model, Divider primitive, and bullet typography": the ribbon-reservation region and the card-body surface are two structurally distinct elements, connected only by a shared top border-radius token and a negative spacing overlap rather than by one shared clipped wrapper, so the reservation region is testable as existing outside the card-body surface (never as empty padding inside it) in both the ribbon-present and ribbon-absent states; and every gray content/footer separator is testable as a rendered Nimbus `Divider` element rather than a `Box` border.

## 5. Public API, types, defaults, and precedence rules

- **`PlanDisplay.Price`** (new subcomponent): `price: ReactNode` (required); `previousPrice?: ReactNode`; `period?: ReactNode`; `annualNote?: ReactNode`. All four are typed `ReactNode`. The component defines no defaults; formatting, currency, localization, and the final textual value are consumer-owned.
- **`PlanDisplay.Card.ribbonLabel`**: `ribbonLabel?: ReactNode`. Renders in the card's top ribbon.
- **`PlanDisplay.Card.gradient`**: `gradient?: boolean`. `true` selects one single, fixed Plans 2.0 gradient (see section 9); it is not a token or color the consumer can choose.
- **Co-occurrence rule:** when `ribbonLabel` is present, `gradient` is fully suppressed. This is a valid, defined combination — not an error. The concrete, observable rendering this implies (ribbon geometry, background/text color, shared border radius with the card surface, the card-surface border, and shadow suppression) is specified once, in section 9's "Ribbon visual contract," rather than duplicated here — `ribbonLabel` and `gradient` remain the only two props in this contract.
- **`PlanDisplay.Header.tag`**: `tag?: ReactNode`. Renders to the right of the header's supporting text. The pattern does not constrain its appearance or define a structured tag value.
- **`PlanDisplay.Bullet.badge`**: `badge?: ReactNode`. Renders inline after the bullet content. The pattern does not constrain its appearance or define a structured badge value.
- **`PlanDisplay.Bullet` disabled treatment and `unavailableLabel`:** the consumer continues to supply the visual icon manually through the existing required `icon: ReactNode` prop — the component does not automatically select or render a close icon. The contract is extended with a localized accessibility label, typed as a discriminated union:

  `{ disabled: true; unavailableLabel: string } | { disabled?: false; unavailableLabel?: never }`

  `disabled` controls the visual unavailable treatment; `unavailableLabel` is required whenever `disabled` is `true`, is consumer-provided localized text, defines no default, and is exposed only to assistive technology — it is never visibly rendered.
- **`PlanDisplay.Footer.icon`**: `icon?: ReactNode`. Renders before the footer's content.
- **Remove `highlighted`** from `PlanDisplay.Card`. This is a breaking change shipped in a major release. Previously, `highlighted` rendered a bordered/shadow treatment (`borderColor: "primary-interactive"`, `borderRadius: "2"`, `borderStyle: "solid"`, `borderWidth: "3"`, `boxShadow: "3"`) — this is the exact treatment replaced by `ribbonLabel`/`gradient`.

No further public contract changes are in scope: the seven items above (together with the removal of `highlighted`) are a hard boundary for this contribution, including the approved `PlanDisplay.Bullet.unavailableLabel` accessibility contract. Any additional public contract requires a new explicit issue decision.

## 6. Observable states and variants

- `PlanDisplay.Card`: default state (level-2 shadow, no emphasis, no border); emphasized with `ribbonLabel` only — the full ribbon visual contract (section 9) applies: the ribbon spans the full width of the card surface with a `primary-interactive` background and centered `neutral-background` text, shares the card's top border radius so the ribbon and card surface read as one continuous shape with no visible seam, the card surface carries a `2px` `primary-interactive` border, and the default level-2 shadow is not rendered; emphasized with `gradient` only (the fixed gradient background applies, level-2 shadow still renders, no border and no ribbon); both `ribbonLabel` and `gradient` supplied together — the full ribbon visual contract renders and `gradient` is fully suppressed, not layered underneath. A card without `ribbonLabel`, when participating in the same comparison as a card that has one, reserves an equivalent, invisible ribbon area — no border, no background — occupying the same height a rendered ribbon would, so comparable content and footers stay aligned regardless of which cards carry a ribbon (AC-07).
- **`PlanDisplay.Card` structural model (validation amendment — "Card structure, divider, and bullet typography refinements"):** the ribbon-reservation region and the card-body surface are two structurally distinct blocks, not one shared clipped wrapper. The reservation region always renders first, outside the card-body surface, so it never appears as empty padding inside the default (non-ribbon) card body: without `ribbonLabel` it is transparent, hidden from assistive technology, and occupies the same height as a rendered ribbon; with `ribbonLabel` it becomes the full-width ribbon described above, using the top-corner radius token `--nimbus-shape-border-radius-2` and spacing tokens `0-5` above its content and `2` below it. The card-body surface is the second, separate block, with its own default radius token `2`, pulled up under the reservation region by a negative spacing-`2` margin so the two read as one continuous shape while remaining structurally distinct; it carries the `2px` `primary-interactive` border and no shadow when a ribbon is present, and the default level-2 shadow with no border when it is absent. Every gray separator between `PlanDisplay` content blocks — including the content and footer separators — renders via the Nimbus `Divider` component, composed internally by `PlanDisplay.Spacing` rather than reproduced with a `Box` border.
- `PlanDisplay.Price`: renders the required current `price`; `previousPrice`, `period`, and `annualNote` may each independently be present or absent. Each being independently optional means each may or may not be supplied; no further combination-level validation is stated or implied.
- `PlanDisplay.Header`: with `tag`; without `tag`.
- `PlanDisplay.Bullet`: enabled feature without `badge` (no `unavailableLabel` needed, since `disabled` is `false` or absent) — the icon renders in `primary-interactive` (blue), not the legacy `success-interactive` (green), while the bullet text stays `neutral-textLow`; enabled feature with `badge`, with the same `primary-interactive` icon treatment; disabled feature — `disabled: true`, where the consumer supplies the close icon through the existing `icon` prop and the required `unavailableLabel: string` per the discriminated union — the component itself never auto-renders a close icon, `unavailableLabel` is not optional once `disabled` is `true`, and the icon and text continue to use the approved neutral unavailable treatment. A custom consumer-supplied icon inherits the same enabled/disabled color treatment through the existing `icon: ReactNode` slot.
- `PlanDisplay.Footer`: with `icon`; without `icon`.
- Comparison sets of cards: ribbon space is reserved consistently across all cards in the set, including cards that do not themselves carry a `ribbonLabel`, so that comparable content and footers remain aligned (AC-07).
- **Canonical Plans 2.0 composition recipe, normative for the canonical comparison story only:** within each canonical `PlanDisplay.Card`, content follows this order:
  1. `PlanDisplay.Header` — plan name or metadata; `PlanDisplay.Price`; optional current-plan `tag`.
  2. `PlanDisplay.Content` — plan description; the primary plan action ("Comenzar gratis" or "Subir de plan", per plan state) immediately after the description; feature bullets after the primary action. The primary action uses the appearance appropriate to each plan's state, and the featured plan's primary action uses the primary appearance.
  3. `PlanDisplay.Footer` — optional secondary or supporting offer (e.g. "Punto de venta Plus") and its optional leading icon; no primary plan-selection action.

  The footer is omitted entirely when a card has no supporting offer — cards without footer content preserve comparison alignment through the card's own equal-height/bottom-anchored-footer layout mechanism (AC-07), so consumers must not render an empty footer solely to force alignment. This is a normative composition recipe for the canonical validation story and does not add a new prop, slot, or runtime variant, and does not restrict other consumer compositions built from the same public subcomponents (see sections 2 and 3).

## 7. Responsive behavior

- Two-plan and three-plan compositions use the existing `PlanDisplay` auto-fit grid (`gridTemplateColumns: repeat(auto-fit, minmax(${minPlanWidth}, 1fr))`), demonstrated with `minPlanWidth="236px"`.
- Horizontal and horizontal-mobile are consumer compositions built from existing subcomponents. Neither is a new `PlanDisplay` prop, and neither is a new named runtime layout variant of the component itself.
- Desktop is demonstrated at a `740px` maximum container width and mobile at `361px`, with no automatic breakpoint transition between them. `PlanDisplay` therefore does not implement or promise an automatic breakpoint switch between these two examples — each is a distinct, explicit usage example (see "Usage examples" below).
- These four compositions are the required usage examples for this contribution; they are not stated as an exhaustive set of every composition a consumer could build, and any composition requiring a new public contract is out of scope.

## 8. Accessibility requirements

This is the concrete AC-09 contract:

- `PlanDisplay.Bullet` must expose unavailable features programmatically when `disabled` is true, not only through color or the close icon.
- The unavailable state must include localized accessible text through the required `unavailableLabel: string` prop whenever `disabled` is `true` (per the discriminated union in section 5): the component exposes it only to assistive technology, never visibly renders it, and defines no default.
- Decorative icons — icons that only reinforce visible text or content and add no independent meaning — must be hidden from assistive technology. The icon component itself has no documented accessibility prop, so this is achieved by the consumer wrapping the icon in consumer-supplied content that carries `aria-hidden="true"` (for example, `<span aria-hidden="true">{icon}</span>`), passed through the existing `icon: ReactNode` prop.
- Meaningful icons — icons that convey information not otherwise present as text — must receive an accessible name through a semantic, consumer-supplied `ReactNode` wrapper (for example, visually-hidden text or an `aria-label` on the wrapper element), again supplied by the consumer through the existing `icon: ReactNode` prop rather than through any icon-component prop.
- This accessibility contract uses only the existing `icon: ReactNode` prop already present on `PlanDisplay.Bullet`, and applies the same pattern to `PlanDisplay.Footer.icon`; it introduces no new `PlanDisplay` public API. The decorative/meaningful behavior is achieved entirely through what `ReactNode` the consumer passes in, not through any new prop.
- `tag` and `badge` content retains the semantics of the supplied `ReactNode`; consumers must supply accessible text when visual content alone is insufficient.
- `PlanDisplay.Price` preserves a meaningful reading order: current price, previous price, period, then annual note.
- `PlanDisplay` introduces no new keyboard interaction. Interactive content supplied to headers, cards, or footers retains its native keyboard behavior and must not be replaced with non-semantic clickable elements.

## 9. Contractual tokens and design constraints

- **A "level-2 shadow" is the default card treatment (AC-01):** the token literal `boxShadow="2"` is the established convention this repository already uses for base/default card-level elevation on comparable surfaces (e.g. `AppShell.tsx`, `InitialScreenCard.tsx`, `SummaryStats.tsx`). By contrast, `PlanDisplay.Card`'s previous `highlighted` (emphasized) treatment used `boxShadow="3"` — a different, higher-emphasis token. AC-01's "level-2 shadow" refers to the `boxShadow="2"` token as the new default (non-emphasized) card treatment, distinct from the emphasis-level shadow.
- **Ribbon visual contract (AC-02, AC-07), resolved by the issue's validation amendment ("Validation amendment — ribbon visual contract"):** when `ribbonLabel` is present:
  - the ribbon spans the full width of the card surface;
  - the ribbon uses `primary-interactive` as its background;
  - its content is horizontally centered and uses `neutral-background` text;
  - it shares the card's top border radius so the ribbon and card surface appear as one continuous component, with no visible seam or gap between them;
  - the card surface uses a `2px` `primary-interactive` border;
  - the emphasized card does not render the default level-2 shadow — the border, not the shadow, is the emphasis cue;
  - cards without `ribbonLabel` reserve an equivalent, invisible ribbon area — no border, no background — occupying the same height a rendered ribbon would, when participating in the same comparison (AC-07); and
  - when `ribbonLabel` and `gradient` are both supplied, this complete ribbon treatment renders and the gradient is fully suppressed — not layered underneath.

  The implementation may vary internally, but the observable geometry, color treatment, border, shadow suppression, continuity, and comparison alignment above are contractual. This supersedes the earlier prototype-derived spacing-token description of ribbon-space alignment (spacing tokens `0-5` above the label, `2` below it, with a negative spacing-`2` overlap before the card surface): that spacing was evidence recovered from the prototype before visual validation. Equal-height flex cards with bottom-anchored footers continue to keep comparable content and footers aligned across the set (AC-07).
- **Gradient design (AC-02):** the `gradient` emphasis treatment resolves to the fixed value `linear-gradient(194.55deg, var(--nimbus-colors-primary-surface) 4.18%, var(--nimbus-colors-neutral-background) 45.97%)`, applied only when `gradient` is `true` and no ribbon (`ribbonLabel`) is present. Per the ribbon visual contract above, if a ribbon is present the gradient does not apply at all — it is not layered underneath the ribbon.
- **Bullet icon color treatment (AC-05), resolved by the issue's validation amendment ("Bullet icon color treatment"):**
  - when `disabled` is `false` or omitted, the bullet icon uses `primary-interactive` (blue), not `success-interactive` (green);
  - when `disabled` is `true`, the bullet icon and text continue to use the approved neutral unavailable treatment (`neutral-interactive`);
  - this change applies to the icon treatment only — enabled bullet text remains `neutral-textLow`; and
  - custom consumer-supplied icons inherit the same enabled/disabled color treatment through the existing `icon: ReactNode` slot.

  This clarification adds no new prop or public API.

- **Card structural block model, Divider primitive, and bullet typography (AC-02, AC-07, AC-05), resolved by the validation amendment's "Card structure, divider, and bullet typography refinements":**
  - `PlanDisplay.Card` always reserves the ribbon region before the card-body surface, even when `ribbonLabel` is absent, and that region is outside the card-body surface — it must never render as empty padding inside the default card surface.
  - Without `ribbonLabel`, the reserved region is transparent, hidden from assistive technology, and occupies the same height as the rendered ribbon; with `ribbonLabel`, the same region becomes the full-width ribbon.
  - The ribbon uses the top-corner radius token `--nimbus-shape-border-radius-2`, spacing token `0-5` above its content, and spacing token `2` below it, followed by a negative spacing-`2` overlap with the card-body surface.
  - The card-body surface remains a distinct lower block with its own default radius token `2`; it is `2px` `primary-interactive`-bordered with no level-2 shadow when a ribbon is present, and level-2-shadowed with no border when it is absent.
  - The ribbon and the bordered lower surface must appear visually continuous while remaining structurally distinct blocks — never a single shared, clipped wrapper.
  - Every gray separator between `PlanDisplay` content blocks, including the content and footer separators, renders through the Nimbus `Divider` component; `PlanDisplay.Spacing` composes `Divider` internally rather than reproducing the line with a `Box` border, and this does not change `PlanDisplay.Spacing`'s existing public API.
  - `PlanDisplay.Bullet` text uses `fontWeight="regular"` in both the enabled and disabled states; enabled bullet icons continue to use `primary-interactive`, disabled icon and text colors continue to use the approved neutral unavailable treatment, and badge rendering and `unavailableLabel` behavior are unchanged.

No other design tokens, spacing scales, or typography constraints are stated in the approved specification beyond those above.

## 10. Migration and versioning impact

- `highlighted` is removed without a deprecation window or codemod.
- A changelog/migration example is provided (see "Usage examples" below for the `highlighted` → `ribbonLabel`/`gradient` migration example).
- `@nimbus-ds/plan-display` is released as a **major** version.
- A `minor` release would be inconsistent with this breaking removal.

## 11. Stories and tests mapped to acceptance criteria

The existing `PlanDisplay` pattern already had a full suite of stories and unit tests covering its *previous* (pre-Plans-2.0) contract: unit tests for every subcomponent, and Storybook stories for every subcomponent plus two composition stories at the top level (`twoPlans` and `threePlans`).

None of that previous coverage exercised the AC-01 through AC-09 surface added here — there was no test or story for `ribbonLabel`, `gradient`, `PlanDisplay.Price`, `Header`'s `tag`, `Bullet`'s `badge`, `Footer`'s `icon`, comparison/ribbon-space alignment, a `horizontal`/`horizontal-mobile` composition, or the accessibility mechanics in AC-09 — because none of that surface existed yet.

New stories and tests exercise each AC against the concrete contract in section 5, for example:

- a story/test passing `ribbonLabel` alone (AC-02);
- a story/test passing `gradient` alone (AC-02);
- a story/test passing both `ribbonLabel` and `gradient` together, verifying the co-occurrence rule resolves to the ribbon rendering and `gradient` being fully suppressed (AC-02);
- a story/test for `PlanDisplay.Price` covering `price` alone, and `price` combined with each of `previousPrice`, `period`, and `annualNote` (AC-03);
- a story/test for `PlanDisplay.Header` with and without `tag` (AC-04);
- a story/test for `PlanDisplay.Bullet` with and without `badge` in the enabled state, where `unavailableLabel` is absent since `disabled` is `false` or omitted, verifying the enabled icon uses `primary-interactive` and never the legacy `success-interactive` (AC-05);
- a story/test for the disabled treatment verifying `disabled: true` requires the required `unavailableLabel: string`, per the discriminated union in section 5 — including a type-level check that `disabled: true` without `unavailableLabel` does not compile — with the consumer-supplied `icon` also present, and verifying the disabled icon and text keep the neutral unavailable treatment (AC-05, AC-09);
- a story/test verifying `unavailableLabel` is not visually rendered but is exposed to assistive technology, and that it carries no default value (AC-09);
- a story/test for `PlanDisplay.Footer` with and without `icon` (AC-06);
- a story/test for a multi-card comparison verifying reserved ribbon space and aligned, bottom-anchored footers (AC-07);
- a story/test for each of the two-plan, three-plan, horizontal, and horizontal-mobile usage examples (AC-08);
- accessibility assertions covering the requirements in section 8 (AC-09);
- the canonical visual-validation story added by the validation amendment (`canonicalRibbon` in `planDisplay.stories.tsx` — the only story labelled **normative** in this file: `ribbonLabel: "Más escogido"`, plan "Avanzado", Header containing the plan name and `PlanDisplay.Price` ("$219.999"/"/mes"), Content containing the description followed immediately by the primary action ("Subir de plan") and then the four enabled bullets, the `"Nuevo"` badge, and the disabled priority-support bullet, and Footer containing only the leading icon and the "Punto de venta Plus" supporting offer — per the canonical Plans 2.0 composition recipe in section 6), together with tests asserting the full ribbon visual contract against that exact story (`planDisplayCard.spec.tsx` and `planDisplay.canonicalRibbon.spec.tsx`) — full-width ribbon, `primary-interactive` background, centered `neutral-background` text, shared border radius/no seam with the card surface, `2px` `primary-interactive` border, suppressed level-2 shadow, and full gradient suppression when both `ribbonLabel` and `gradient` are supplied — plus the reserved, invisible ribbon-space alignment for cards without `ribbonLabel` in the same comparison (AC-02, AC-07);
- tests against that same canonical story verifying the bullet icon color treatment (AC-05): the four enabled bullets' icons render `primary-interactive` and never the legacy `success-interactive`, and the disabled priority-support bullet's icon keeps the neutral unavailable treatment (`planDisplay.canonicalRibbon.spec.tsx`), plus unit tests at the `PlanDisplayBullet` level covering the enabled/disabled/custom-icon cases directly (`planDisplayCardBullet.spec.tsx`).
- **Additional AC-07/AC-08 traceability from the canonical Plans 2.0 composition recipe and its validation expectations:**
  - a test (`planDisplay.canonicalRibbon.spec.tsx`) verifying the primary CTA ("Subir de plan") renders inside `PlanDisplay.Content`, positioned after the description and before the first feature bullet in DOM order;
  - a test verifying the primary CTA does **not** render inside `PlanDisplay.Footer`;
  - a test verifying `PlanDisplay.Footer` contains only the optional supporting offer ("Punto de venta Plus") and its leading icon, and no other content;
  - a test (`planDisplayCard.spec.tsx`) verifying that a card without supporting-offer content omits `PlanDisplay.Footer` entirely and still stretches/aligns with sibling cards via the card's existing equal-height layout mechanism, extending the AC-07 reserved-ribbon-space alignment tests to the footer-omission case;
  - explicit normative/illustrative labelling of every story in `planDisplay.stories.tsx` (via each story's `parameters.docs.description.story` and a leading source comment), so that only the normative canonical story is used as evidence that the approved Plans 2.0 experience was implemented.

- **Additional AC-02/AC-07 traceability from the card structural block model, Divider primitive, and bullet typography (validation amendment — "Card structure, divider, and bullet typography refinements"):**
  - a test verifying the reserved ribbon region is a distinct DOM element rendered outside the default card-body surface — not nested inside it and not rendered as padding within it — in both the ribbon-present and ribbon-absent states;
  - a test verifying the ribbon-absent reservation region and the rendered ribbon have equivalent rendered height;
  - a test verifying the ribbon's top-corner radius token (`--nimbus-shape-border-radius-2`), its `0-5`/`2` spacing, and the negative spacing-`2` overlap with the card-body surface are applied;
  - a test verifying the card-body surface switches correctly between the default level-2 shadow with no border (no ribbon) and the `2px` `primary-interactive` border with no shadow (with ribbon), while remaining a structurally distinct element from the reservation region;
  - a test verifying `PlanDisplay.Spacing` renders a Nimbus `Divider` element rather than a `Box` border, and that both the content separator and the footer separator use that same `Divider`-composing primitive;
  - a test verifying `PlanDisplay.Bullet` text uses `fontWeight="regular"` in both the enabled and disabled states.

## 12. Usage examples

Each example below is explicitly labelled **Normative** or **Illustrative**, per the validation amendment's "Usage-example classification": normative examples illustrate the resolved public contract from section 5, and — for the single canonical composition example — the canonical Plans 2.0 composition recipe (section 6); only that canonical example may be used as evidence that the approved Plans 2.0 experience was implemented. Illustrative examples demonstrate `PlanDisplay`'s compositional flexibility for a given public-contract prop and are not mandatory content placements.

**Card with `ribbonLabel` — Normative. Demonstrates AC-01, AC-02**

```tsx
<PlanDisplay.Card ribbonLabel="Most popular">
  <PlanDisplay.Header title="Pro" subtitle="For growing stores" />
  <PlanDisplay.Content>
    <PlanDisplay.Price price="$29" period="/month" />
  </PlanDisplay.Content>
</PlanDisplay.Card>
```

**Card with `gradient` — Normative. Demonstrates AC-01, AC-02**

```tsx
<PlanDisplay.Card gradient>
  <PlanDisplay.Header title="Enterprise" subtitle="For large catalogs" />
  <PlanDisplay.Content>
    <PlanDisplay.Price price="$99" period="/month" />
  </PlanDisplay.Content>
</PlanDisplay.Card>
```

**Card with both `ribbonLabel` and `gradient` — Normative. Demonstrates AC-02's precedence rule**

```tsx
{/* ribbonLabel takes precedence: the ribbon renders and gradient is fully suppressed */}
<PlanDisplay.Card ribbonLabel="Best value" gradient>
  <PlanDisplay.Header title="Pro" subtitle="For growing stores" />
  <PlanDisplay.Content>
    <PlanDisplay.Price price="$29" period="/month" />
  </PlanDisplay.Content>
</PlanDisplay.Card>
```

**`PlanDisplay.Price` with all four fields — Normative. Demonstrates AC-03**

```tsx
<PlanDisplay.Price
  price="$29"
  previousPrice="$39"
  period="/month"
  annualNote="Billed annually"
/>
```

**Header with `tag` — Normative. Demonstrates AC-04**

```tsx
<PlanDisplay.Header
  title="Pro"
  subtitle="For growing stores"
  tag={<Tag appearance="primary">New</Tag>}
/>
```

**Bullet with `badge` — Normative. Demonstrates AC-05**

```tsx
<PlanDisplay.Bullet icon={<CheckIcon />} badge={<Tag appearance="success">Upgraded</Tag>}>
  Unlimited products
</PlanDisplay.Bullet>
```

**Disabled bullet with consumer-supplied icon and `unavailableLabel` — Normative. Demonstrates AC-05, AC-09**

```tsx
// disabled only changes the visual treatment; the consumer supplies the icon
// through the existing required `icon` prop — the component does not
// auto-render a close icon. Per the discriminated union in section 5,
// `disabled: true` requires `unavailableLabel`, a localized string exposed
// only to assistive technology and never visibly rendered; it has no default.
<PlanDisplay.Bullet icon={<CloseIcon />} disabled unavailableLabel="Not included">
  Priority support
</PlanDisplay.Bullet>
```

**Footer with `icon` — Normative. Demonstrates AC-06**

```tsx
<PlanDisplay.Footer icon={<ArrowRightIcon />}>
  <Button appearance="primary">Choose plan</Button>
</PlanDisplay.Footer>
```

**Two-plan composition — Illustrative (required usage example for AC-08). Demonstrates AC-01 through AC-09 as applicable, AC-08**

This is one of the four required usage examples for AC-08, but it is classified **illustrative**: it demonstrates the existing auto-fit grid and `PlanDisplay`'s compositional flexibility with generic content, not a mandatory reproduction of the canonical Plans 2.0 composition recipe's content order. It must not be used as evidence of visual equivalence with the canonical reference; only the canonical example below is normative for that purpose.

```tsx
{/* two-plan and three-plan use the existing PlanDisplay auto-fit grid */}
<PlanDisplay minPlanWidth="236px">
  <PlanDisplay.Card ribbonLabel="Most popular">
    <PlanDisplay.Header title="Pro" subtitle="For growing stores" />
    <PlanDisplay.Content>
      <PlanDisplay.Price price="$29" period="/month" />
      <PlanDisplay.Bullet icon={<CheckIcon />}>
        Unlimited products
      </PlanDisplay.Bullet>
      <PlanDisplay.Bullet icon={<CheckIcon />}>
        Priority support
      </PlanDisplay.Bullet>
    </PlanDisplay.Content>
    <PlanDisplay.Footer>
      <Button appearance="primary">Choose plan</Button>
    </PlanDisplay.Footer>
  </PlanDisplay.Card>
  <PlanDisplay.Card>
    <PlanDisplay.Header title="Starter" subtitle="For new stores" />
    <PlanDisplay.Content>
      <PlanDisplay.Price price="$9" period="/month" />
      <PlanDisplay.Bullet icon={<CheckIcon />}>
        Up to 100 products
      </PlanDisplay.Bullet>
      <PlanDisplay.Bullet icon={<CloseIcon />} disabled unavailableLabel="Not included">
        Priority support
      </PlanDisplay.Bullet>
    </PlanDisplay.Content>
    <PlanDisplay.Footer>
      <Button appearance="secondary">Choose plan</Button>
    </PlanDisplay.Footer>
  </PlanDisplay.Card>
</PlanDisplay>
```

**Three-plan composition — Illustrative (required usage example for AC-08). Demonstrates AC-08**

Same classification rationale as the two-plan composition above: required for AC-08, but illustrative of `PlanDisplay`'s flexibility, not a mandatory reproduction of the canonical recipe or evidence of visual equivalence with the canonical reference.

```tsx
<PlanDisplay minPlanWidth="236px">
  <PlanDisplay.Card>
    <PlanDisplay.Header title="Starter" subtitle="For new stores" />
    <PlanDisplay.Content>
      <PlanDisplay.Price price="$9" period="/month" />
      <PlanDisplay.Bullet icon={<CheckIcon />}>
        Up to 100 products
      </PlanDisplay.Bullet>
    </PlanDisplay.Content>
    <PlanDisplay.Footer>
      <Button appearance="secondary">Choose plan</Button>
    </PlanDisplay.Footer>
  </PlanDisplay.Card>
  <PlanDisplay.Card ribbonLabel="Most popular">
    <PlanDisplay.Header title="Pro" subtitle="For growing stores" />
    <PlanDisplay.Content>
      <PlanDisplay.Price price="$29" period="/month" />
      <PlanDisplay.Bullet icon={<CheckIcon />}>
        Unlimited products
      </PlanDisplay.Bullet>
      <PlanDisplay.Bullet icon={<CheckIcon />}>
        Priority support
      </PlanDisplay.Bullet>
    </PlanDisplay.Content>
    <PlanDisplay.Footer>
      <Button appearance="primary">Choose plan</Button>
    </PlanDisplay.Footer>
  </PlanDisplay.Card>
  <PlanDisplay.Card gradient>
    <PlanDisplay.Header title="Enterprise" subtitle="For large catalogs" />
    <PlanDisplay.Content>
      <PlanDisplay.Price price="$99" period="/month" />
      <PlanDisplay.Bullet icon={<CheckIcon />}>
        Unlimited products
      </PlanDisplay.Bullet>
      <PlanDisplay.Bullet icon={<CheckIcon />}>
        Priority support
      </PlanDisplay.Bullet>
      <PlanDisplay.Bullet icon={<CheckIcon />}>
        Dedicated account manager
      </PlanDisplay.Bullet>
    </PlanDisplay.Content>
    <PlanDisplay.Footer>
      <Button appearance="primary">Choose plan</Button>
    </PlanDisplay.Footer>
  </PlanDisplay.Card>
</PlanDisplay>
```

**Horizontal composition (desktop) — Illustrative (required usage example for AC-08). Demonstrates AC-08 as a consumer composition**

Same classification rationale as the two-plan composition above: required for AC-08, but illustrative of a consumer-assembled composition, not a mandatory reproduction of the canonical recipe or evidence of visual equivalence with the canonical reference.

```tsx
{/* horizontal is a consumer composition assembled from a single PlanDisplay.Card's
    existing subcomponents, laid out in a row — not a new PlanDisplay prop or a new
    named runtime variant. The same content and order as the horizontal-mobile
    example below is preserved; only the flexDirection changes. */}
<Box maxWidth="740px">
  <PlanDisplay.Card ribbonLabel="Most popular">
    <Box display="flex" flexDirection="row" gap="4" alignItems="flex-start">
      <PlanDisplay.Header title="Pro" subtitle="For growing stores" />
      <PlanDisplay.Content>
        <PlanDisplay.Price price="$29" period="/month" />
        <PlanDisplay.Bullet icon={<CheckIcon />}>
          Unlimited products
        </PlanDisplay.Bullet>
        <PlanDisplay.Bullet icon={<CheckIcon />}>
          Priority support
        </PlanDisplay.Bullet>
      </PlanDisplay.Content>
    </Box>
    <PlanDisplay.Footer>
      <Button appearance="primary">Choose plan</Button>
    </PlanDisplay.Footer>
  </PlanDisplay.Card>
</Box>
```

**Horizontal-mobile composition — Illustrative (required usage example for AC-08). Demonstrates AC-08 as a distinct consumer composition**

Same classification rationale as the horizontal composition above: required for AC-08, but illustrative, not a mandatory reproduction of the canonical recipe or evidence of visual equivalence with the canonical reference.

```tsx
{/* horizontal-mobile arranges the same single card's content and order as the
    horizontal example above, but vertically. No automatic breakpoint transition
    between the two is implemented or promised; each is a distinct, explicit
    usage example. */}
<Box maxWidth="361px">
  <PlanDisplay.Card ribbonLabel="Most popular">
    <Box display="flex" flexDirection="column" gap="4" alignItems="stretch">
      <PlanDisplay.Header title="Pro" subtitle="For growing stores" />
      <PlanDisplay.Content>
        <PlanDisplay.Price price="$29" period="/month" />
        <PlanDisplay.Bullet icon={<CheckIcon />}>
          Unlimited products
        </PlanDisplay.Bullet>
        <PlanDisplay.Bullet icon={<CheckIcon />}>
          Priority support
        </PlanDisplay.Bullet>
      </PlanDisplay.Content>
    </Box>
    <PlanDisplay.Footer>
      <Button appearance="primary">Choose plan</Button>
    </PlanDisplay.Footer>
  </PlanDisplay.Card>
</Box>
```

**Canonical visual-validation example — Normative. Demonstrates AC-02's full ribbon visual contract, AC-07's comparison alignment, and the canonical Plans 2.0 composition recipe (validation amendment)**

This is the **only normative composition example** in this section: it is the sole usage example usable as evidence that the approved Plans 2.0 experience was implemented. It is a validation fixture used to visually verify the ribbon treatment resolved in section 9 and the canonical composition recipe resolved in section 6, not a new public variant: it is built entirely from the existing public composition (`.Card`, `.Header`, `.Price`, `.Content`, `.Bullet`, `.Footer`), with no new prop. It matches the `canonicalRibbon` story in `planDisplay.stories.tsx`. Content order follows the canonical recipe exactly: `PlanDisplay.Header` carries the plan name and `PlanDisplay.Price`; `PlanDisplay.Content` carries the description, then the primary action ("Subir de plan") immediately after the description and before the feature bullets; `PlanDisplay.Footer` carries only the leading icon and the "Punto de venta Plus" supporting offer — no primary action. Per the validation amendment's card structural model, the rendered `PlanDisplay.Card` itself is composed of two structurally distinct blocks — the ribbon-reservation region (rendered here as the full ribbon, since `ribbonLabel` is supplied) and the card-body surface beneath it — connected only by the shared top-corner radius token and the negative spacing-`2` overlap, not by a single shared clipped wrapper.

```tsx
<PlanDisplay.Card ribbonLabel="Más escogido">
  <PlanDisplay.Header
    subtitle="Punto de venta"
    title={
      <Box display="flex" gap="1">
        <Title as="h3" color="neutral-textLow">Plan</Title>
        <Title as="h3" color="neutral-textHigh">Avanzado</Title>
      </Box>
    }
  >
    <PlanDisplay.Price price="$219.999" period="/mes" />
  </PlanDisplay.Header>
  <PlanDisplay.Content>
    <Text color="neutral-textLow">
      Gestión avanzada y control total para tu negocio.
    </Text>
    <Button appearance="primary">Subir de plan</Button>
    <PlanDisplay.Bullet icon={<CheckIcon aria-hidden="true" />}>
      Funciones heredadas del plan anterior
    </PlanDisplay.Bullet>
    <PlanDisplay.Bullet icon={<CheckIcon aria-hidden="true" />}>
      Campos personalizados
    </PlanDisplay.Bullet>
    <PlanDisplay.Bullet
      icon={<CheckIcon aria-hidden="true" />}
      badge={<Tag appearance="success">Nuevo</Tag>}
    >
      Tablas de precios mayoristas
    </PlanDisplay.Bullet>
    <PlanDisplay.Bullet icon={<CheckIcon aria-hidden="true" />}>
      Gestión con inteligencia artificial
    </PlanDisplay.Bullet>
    <PlanDisplay.Bullet
      icon={<CloseIcon aria-hidden="true" />}
      disabled
      unavailableLabel="No incluido"
    >
      Soporte prioritario
    </PlanDisplay.Bullet>
  </PlanDisplay.Content>
  <PlanDisplay.Footer icon={<StoreIcon aria-hidden="true" />}>
    <Text fontSize="caption" color="neutral-textLow">Punto de venta Plus</Text>
  </PlanDisplay.Footer>
</PlanDisplay.Card>
```

**Migration example: `highlighted` (before) → `ribbonLabel`/`gradient` (after) — Illustrative**

Illustrative: it demonstrates the migration path from the removed `highlighted` prop, not the canonical Plans 2.0 composition recipe's content order.

```tsx
// Before (removed)
<PlanDisplay.Card highlighted>
  <PlanDisplay.Header title="Pro" subtitle="For growing stores" />
  <PlanDisplay.Content>
    <PlanDisplay.Price price="$29" period="/month" />
  </PlanDisplay.Content>
</PlanDisplay.Card>

// After — option 1: ribbon-based emphasis
<PlanDisplay.Card ribbonLabel="Most popular">
  <PlanDisplay.Header title="Pro" subtitle="For growing stores" />
  <PlanDisplay.Content>
    <PlanDisplay.Price price="$29" period="/month" />
  </PlanDisplay.Content>
</PlanDisplay.Card>

// After — option 2: gradient-based emphasis
<PlanDisplay.Card gradient>
  <PlanDisplay.Header title="Pro" subtitle="For growing stores" />
  <PlanDisplay.Content>
    <PlanDisplay.Price price="$29" period="/month" />
  </PlanDisplay.Content>
</PlanDisplay.Card>
```
