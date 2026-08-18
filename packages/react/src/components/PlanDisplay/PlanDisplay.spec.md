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

## 3. Non-goals

- Retaining or re-adding the legacy `highlighted` prop is out of scope: it is removed, and consumers migrate to `ribbonLabel` or `gradient`.
- No public contract changes beyond the seven additions and one removal listed under "Public API" below are in scope for this contribution — this is a hard boundary, including the `PlanDisplay.Bullet.unavailableLabel` accessibility contract. Any additional public contract requires a new explicit issue decision.
- The two-plan, three-plan, horizontal, and horizontal-mobile compositions named in AC-08 are the required usage examples for this contribution, built entirely from the resolved public contract rather than introducing new named layout props or runtime variants. A composition that would require a new public contract or a new layout API is out of scope here.

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

## 5. Public API, types, defaults, and precedence rules

- **`PlanDisplay.Price`** (new subcomponent): `price: ReactNode` (required); `previousPrice?: ReactNode`; `period?: ReactNode`; `annualNote?: ReactNode`. All four are typed `ReactNode`. The component defines no defaults; formatting, currency, localization, and the final textual value are consumer-owned.
- **`PlanDisplay.Card.ribbonLabel`**: `ribbonLabel?: ReactNode`. Renders in the card's top ribbon.
- **`PlanDisplay.Card.gradient`**: `gradient?: boolean`. `true` selects one single, fixed Plans 2.0 gradient (see section 9); it is not a token or color the consumer can choose.
- **Co-occurrence rule:** when `ribbonLabel` is present, `gradient` is fully suppressed. This is a valid, defined combination — not an error.
- **`PlanDisplay.Header.tag`**: `tag?: ReactNode`. Renders to the right of the header's supporting text. The pattern does not constrain its appearance or define a structured tag value.
- **`PlanDisplay.Bullet.badge`**: `badge?: ReactNode`. Renders inline after the bullet content. The pattern does not constrain its appearance or define a structured badge value.
- **`PlanDisplay.Bullet` disabled treatment and `unavailableLabel`:** the consumer continues to supply the visual icon manually through the existing required `icon: ReactNode` prop — the component does not automatically select or render a close icon. The contract is extended with a localized accessibility label, typed as a discriminated union:

  `{ disabled: true; unavailableLabel: string } | { disabled?: false; unavailableLabel?: never }`

  `disabled` controls the visual unavailable treatment; `unavailableLabel` is required whenever `disabled` is `true`, is consumer-provided localized text, defines no default, and is exposed only to assistive technology — it is never visibly rendered.
- **`PlanDisplay.Footer.icon`**: `icon?: ReactNode`. Renders before the footer's content.
- **Remove `highlighted`** from `PlanDisplay.Card`. This is a breaking change shipped in a major release. Previously, `highlighted` rendered a bordered/shadow treatment (`borderColor: "primary-interactive"`, `borderRadius: "2"`, `borderStyle: "solid"`, `borderWidth: "3"`, `boxShadow: "3"`) — this is the exact treatment replaced by `ribbonLabel`/`gradient`.

No further public contract changes are in scope: the seven items above (together with the removal of `highlighted`) are a hard boundary for this contribution, including the approved `PlanDisplay.Bullet.unavailableLabel` accessibility contract. Any additional public contract requires a new explicit issue decision.

## 6. Observable states and variants

- `PlanDisplay.Card`: default state (level-2 shadow, no emphasis); emphasized with `ribbonLabel` only; emphasized with `gradient` only; both `ribbonLabel` and `gradient` supplied together (renders the ribbon; `gradient` is fully suppressed).
- `PlanDisplay.Price`: renders the required current `price`; `previousPrice`, `period`, and `annualNote` may each independently be present or absent. Each being independently optional means each may or may not be supplied; no further combination-level validation is stated or implied.
- `PlanDisplay.Header`: with `tag`; without `tag`.
- `PlanDisplay.Bullet`: enabled feature without `badge` (no `unavailableLabel` needed, since `disabled` is `false` or absent); enabled feature with `badge`; disabled feature — `disabled: true`, where the consumer supplies the close icon through the existing `icon` prop and the required `unavailableLabel: string` per the discriminated union — the component itself never auto-renders a close icon, and `unavailableLabel` is not optional once `disabled` is `true`.
- `PlanDisplay.Footer`: with `icon`; without `icon`.
- Comparison sets of cards: ribbon space is reserved consistently across all cards in the set, including cards that do not themselves carry a `ribbonLabel`, so that comparable content and footers remain aligned (AC-07).

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
- **Ribbon-space alignment (AC-07):** every card reserves the same top ribbon area, including cards without a `ribbonLabel`. The reference implementation uses spacing tokens `0-5` above the label and `2` below it, with a negative spacing-`2` overlap before the card surface. Equal-height flex cards with bottom-anchored footers keep comparable content and footers aligned across the set. The implementation may vary internally provided this observable alignment is preserved.
- **Gradient design (AC-02):** the `gradient` emphasis treatment resolves to the fixed value `linear-gradient(194.55deg, var(--nimbus-colors-primary-surface) 4.18%, var(--nimbus-colors-neutral-background) 45.97%)`, applied only when `gradient` is `true` and no ribbon (`ribbonLabel`) is present.

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
- a story/test for `PlanDisplay.Bullet` with and without `badge` in the enabled state, where `unavailableLabel` is absent since `disabled` is `false` or omitted (AC-05);
- a story/test for the disabled treatment verifying `disabled: true` requires the required `unavailableLabel: string`, per the discriminated union in section 5 — including a type-level check that `disabled: true` without `unavailableLabel` does not compile — with the consumer-supplied `icon` also present (AC-05, AC-09);
- a story/test verifying `unavailableLabel` is not visually rendered but is exposed to assistive technology, and that it carries no default value (AC-09);
- a story/test for `PlanDisplay.Footer` with and without `icon` (AC-06);
- a story/test for a multi-card comparison verifying reserved ribbon space and aligned, bottom-anchored footers (AC-07);
- a story/test for each of the two-plan, three-plan, horizontal, and horizontal-mobile usage examples (AC-08);
- accessibility assertions covering the requirements in section 8 (AC-09).

## 12. Usage examples

The examples below are normative: each illustrates the actual, resolved public contract from section 5.

**Card with `ribbonLabel` — demonstrates AC-01, AC-02**

```tsx
<PlanDisplay.Card ribbonLabel="Most popular">
  <PlanDisplay.Header title="Pro" subtitle="For growing stores" />
  <PlanDisplay.Content>
    <PlanDisplay.Price price="$29" period="/month" />
  </PlanDisplay.Content>
</PlanDisplay.Card>
```

**Card with `gradient` — demonstrates AC-01, AC-02**

```tsx
<PlanDisplay.Card gradient>
  <PlanDisplay.Header title="Enterprise" subtitle="For large catalogs" />
  <PlanDisplay.Content>
    <PlanDisplay.Price price="$99" period="/month" />
  </PlanDisplay.Content>
</PlanDisplay.Card>
```

**Card with both `ribbonLabel` and `gradient` — demonstrates AC-02's precedence rule**

```tsx
{/* ribbonLabel takes precedence: the ribbon renders and gradient is fully suppressed */}
<PlanDisplay.Card ribbonLabel="Best value" gradient>
  <PlanDisplay.Header title="Pro" subtitle="For growing stores" />
  <PlanDisplay.Content>
    <PlanDisplay.Price price="$29" period="/month" />
  </PlanDisplay.Content>
</PlanDisplay.Card>
```

**`PlanDisplay.Price` with all four fields — demonstrates AC-03**

```tsx
<PlanDisplay.Price
  price="$29"
  previousPrice="$39"
  period="/month"
  annualNote="Billed annually"
/>
```

**Header with `tag` — demonstrates AC-04**

```tsx
<PlanDisplay.Header
  title="Pro"
  subtitle="For growing stores"
  tag={<Tag appearance="primary">New</Tag>}
/>
```

**Bullet with `badge` — demonstrates AC-05**

```tsx
<PlanDisplay.Bullet icon={<CheckIcon />} badge={<Tag appearance="success">Upgraded</Tag>}>
  Unlimited products
</PlanDisplay.Bullet>
```

**Disabled bullet with consumer-supplied icon and `unavailableLabel` — demonstrates AC-05, AC-09**

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

**Footer with `icon` — demonstrates AC-06**

```tsx
<PlanDisplay.Footer icon={<ArrowRightIcon />}>
  <Button appearance="primary">Choose plan</Button>
</PlanDisplay.Footer>
```

**Two-plan composition — demonstrates AC-01 through AC-09 as applicable, AC-08**

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

**Three-plan composition — demonstrates AC-08**

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

**Horizontal composition (desktop) — demonstrates AC-08 as a consumer composition**

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

**Horizontal-mobile composition — demonstrates AC-08 as a distinct consumer composition**

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

**Migration example: `highlighted` (before) → `ribbonLabel`/`gradient` (after)**

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
