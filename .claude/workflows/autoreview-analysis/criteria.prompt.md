## Review criteria

Evaluate the diff against the points below. CodeRabbit already blocks merges
on the three checks under "Versioning & breaking changes" via its own
`custom_checks` (`.coderabbit.yaml`) — your read is a second, code-aware pass
over the same risk, not a rubber stamp of what CodeRabbit already said.

### Hard rules (always `REQUIRES_REVIEW`, regardless of code quality)

- **Unversioned breaking changes** — a removed/renamed prop in `*.types.ts`,
  a narrowed prop type, an optional prop made required, a removed export in
  `index.ts`, or a changed default value/behavior, without a MAJOR version
  bump in the affected package's `package.json`.
- **Undocumented breaking changes** — a MAJOR version bump, or a breaking
  change per the point above, without a "### 🛠 Breaking changes" or
  "#### 🛠 Breaking changes" section in the package's `CHANGELOG.md`
  (format: `- Description. ([#PR](url) by [@author](url))`).
- **Undocumented CSS breaking changes** — in a `*.css.ts` (Vanilla-Extract)
  file: a removed `styleVariants`/`recipe`/`globalStyle`/`createVar` export, a
  removed variant option, a renamed CSS class or CSS variable (`--nimbus-*`)
  identifier, a changed `defaultVariants`, or a token reference remapped to a
  different token — without a matching CHANGELOG entry as above. (This repo
  has no `*.css.ts` files today; this rule exists for parity with
  `.coderabbit.yaml`'s own check and applies automatically if one is ever
  added.) Adding a previously-missing declaration that restores a documented
  contract, or correcting a value to the token/behavior the component's
  contract already specifies, is a conformity fix, not a breaking change.
- Any new external network call or third-party dependency.

A trivial change that does not touch the public contract — an internal
variable/helper rename, a typo, a log message, a comment, test-only code — is
exempt. Renaming or removing an **exported** prop, function, CSS class, or CSS
variable identifier is NOT exempt: `.coderabbit.yaml`'s own checks (and the
hard rules above) treat those renames as breaking changes, not as trivia.

### General checks

- **Correctness** — does the diff do what the description says? Flag any
  scope mismatch between the two.
- **Design-system conventions** — components composed from
  `@nimbus-ds/components` rather than raw HTML elements; compound patterns
  where the component family already uses them; each component self-
  contained rather than reaching into another component's internals.
- **Types** — `*.types.ts` exports a `ComponentNameProperties` interface
  that does NOT inherit `HTMLElement`/`BoxProperties` and only declares this
  component's own props; no `any` (prefer `unknown`).
- **Accessibility** — WCAG-relevant attributes (ARIA, keyboard navigation)
  present where the component introduces new interactive behavior.
- **Tests** — does new behavior have a Jest test covering it? A test-only
  change never needs one of its own.
- **Security** — unsanitized input reaching a query, shell command, or
  template; secrets or credentials committed; broadened permissions.
- **Reversibility** — can this be rolled back cleanly if it's wrong in
  production?

If CodeRabbit's comments raise a concern, verify it against the code before
deciding whether it's real — CodeRabbit can be wrong too.
