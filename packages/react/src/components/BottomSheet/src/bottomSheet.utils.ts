/**
 * Keeps a snap index inside `[0, length - 1]`, clamping to 0 for an empty
 * `snapPoints`. Shared by BottomSheet (initial/clamped snap state) and
 * Grabber (keyboard-driven stepping) instead of each re-implementing the
 * same min/max formula, so a future change to the clamping rule only has
 * one place to update.
 */
export const clampIndex = (index: number, length: number): number =>
  Math.min(Math.max(index, 0), Math.max(length - 1, 0));

/**
 * Conservative check for whether `name` is safe to use both as a literal
 * DOM attribute name (`{ [name]: "" }` in JSX, which React turns into
 * `setAttribute(name, "")` and throws `InvalidCharacterError` for on an
 * invalid one) and inside a CSS attribute-selector fragment (`[${name}]`,
 * which `Element.closest()` throws a `SyntaxError` for). `ignoreAttributeName`
 * is consumer-supplied and expected to be a plain identifier-like string in
 * practice (the default is "data-nimbus-outside-press-ignore"), but nothing
 * enforces that on its own — an unexpected value (e.g. containing a space or
 * a quote) would otherwise crash render or every future pointerdown instead
 * of degrading to the default.
 */
export const isValidAttributeName = (name: string): boolean =>
  /^-?[a-zA-Z_][a-zA-Z0-9_-]*$/.test(name);
