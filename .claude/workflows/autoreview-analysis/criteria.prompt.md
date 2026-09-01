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
  change per the point above, without a "#### 🛠 Breaking changes" section
  in the package's `CHANGELOG.md` (format: `- Description. ([#PR](url) by
  [@author](url))`).
- Any new external network call or third-party dependency.

A trivial change in one of these areas (rename, typo, log message, comment,
test-only) is still exempt — the rule exists for behavior changes, not for
touching the file.

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
