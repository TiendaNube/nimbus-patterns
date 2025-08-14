const defaultDismissExemptAttribute = "data-nimbus-dismiss-exempt";

const stopDismissPropagation = (
  event: React.SyntheticEvent,
  dismissExemptAttribute: string
) => {
  // Keyboard: only guard Escape
  const maybeKeyboard = event as unknown as {
    key?: string;
    nativeEvent?: { key?: string };
  };
  const keyboardKey = maybeKeyboard.key ?? maybeKeyboard.nativeEvent?.key;
  if (keyboardKey && keyboardKey !== "Escape") return;

  // Pointer/mouse/touch/click or Escape key: stop only if event originated from an exempt element.
  const nativeEvent =
    (event as unknown as { nativeEvent?: Event }).nativeEvent ??
    (event as unknown as Event);
  const path = (nativeEvent as any).composedPath?.() as
    | Array<EventTarget>
    | undefined;

  const shouldGuard = path?.some(
    (node) =>
      node instanceof Element &&
      (node as Element).closest(`[${dismissExemptAttribute}]`)
  );
  if (shouldGuard) event.stopPropagation();
};

export { defaultDismissExemptAttribute, stopDismissPropagation };
