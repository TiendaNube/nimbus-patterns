/** Space in pixels before the first and after the last plan (spacing-4). */
export const GUTTER = 16;
/** Space in pixels between adjacent plans (spacing-4). */
export const GAP = 16;
/** Pixels of a neighbouring plan that peek next to the active one. */
export const PEEK = 16;

/** Milliseconds without scroll events after which a scroll counts as settled. */
export const SETTLE_DELAY = 150;

/**
 * Width of a plan for a scroll area of `areaWidth` pixels: the area minus a
 * gutter and a peek on each side, so that the active plan is the only one
 * fully visible.
 */
export const getItemWidth = (areaWidth: number): number =>
  Math.max(0, areaWidth - 2 * (GUTTER + PEEK));

/**
 * Scroll position at which the plan at `index` rests. The first plan rests at
 * the start, the last one with a trailing gutter and every other plan with a
 * peek of its neighbours on both sides.
 */
export const getRestPosition = (
  index: number,
  total: number,
  areaWidth: number
): number => {
  const step = getItemWidth(areaWidth) + GAP;
  if (total <= 1 || index <= 0) return 0;
  if (index >= total - 1) return (total - 1) * step - (GUTTER + PEEK);
  return index * step - GUTTER;
};

/**
 * Index of the plan whose rest position is nearest to `scrollLeft`. At an
 * exact midpoint between two plans the earlier one is kept.
 */
export const getActiveIndex = (
  scrollLeft: number,
  total: number,
  areaWidth: number
): number => {
  let nearest = 0;
  let nearestDistance = Infinity;
  for (let index = 0; index < total; index += 1) {
    const distance = Math.abs(
      scrollLeft - getRestPosition(index, total, areaWidth)
    );
    if (distance < nearestDistance) {
      nearest = index;
      nearestDistance = distance;
    }
  }
  return nearest;
};
