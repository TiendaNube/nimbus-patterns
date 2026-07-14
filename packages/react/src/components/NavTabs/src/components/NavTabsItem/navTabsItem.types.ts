import { ReactNode, HTMLAttributes } from "react";
import { BoxProperties } from "@nimbus-ds/components";

/**
 * Flat shape of NavTabs.Item's props, kept as a plain interface (not the
 * discriminated union below) because the docs generator (@nimbus-ds/scripts)
 * looks up a schema by the literal name `NavTabsItemProperties` and can't
 * introspect a union type. NavTabsItemProps is what actually types the
 * component and enforces the `icon`/`appearance` constraint at compile time.
 */
export interface NavTabsItemProperties {
  /**
   * Visual variant of the button.
   * "ai-generative" renders a fixed AI icon with a gradient border and does not accept a custom `icon`.
   * @default "neutral"
   */
  appearance?: "neutral" | "ai-generative";
  /**
   * Icon element to be rendered inside the button. Ignored when `appearance` is "ai-generative".
   * @TJS-type React.ReactNode
   */
  icon: ReactNode;
  /**
   * Controls whether the button is active or not. Not accepted when `appearance` is "ai-generative".
   */
  active?: boolean;
  /**
   * Displays a small badge on top of the button.
   */
  badge?: boolean;
  /**
   * Function executed on click.
   * @TJS-type onClick: () => void;
   */
  onClick: () => void;
  /**
   * Text label used for accessibility.
   */
  ariaLabel: string;
}

interface NavTabsItemBaseProperties {
  /**
   * Controls whether the button is active or not.
   */
  active?: boolean;
  /**
   * Displays a small badge on top of the button.
   */
  badge?: boolean;
  /**
   * Function executed on click.
   * @TJS-type onClick: () => void;
   */
  onClick: () => void;
  /**
   * Text label used for accessibility.
   */
  ariaLabel: string;
}

export interface NavTabsItemNeutralProperties
  extends NavTabsItemBaseProperties {
  /**
   * Visual variant of the button.
   * "ai-generative" renders a fixed AI icon with a gradient border and does not accept a custom `icon`.
   * @default "neutral"
   */
  appearance?: "neutral";
  /**
   * Icon element to be rendered inside the button.
   * @TJS-type React.ReactNode
   */
  icon: ReactNode;
}

export interface NavTabsItemAIGenerativeProperties
  extends Omit<NavTabsItemBaseProperties, "active"> {
  /**
   * Visual variant of the button.
   * "ai-generative" renders a fixed AI icon with a gradient border and does not accept a custom `icon`.
   * @default "neutral"
   */
  appearance: "ai-generative";
  icon?: never;
  // No active state: the AI treatment (gradient border + frozen icon)
  // never changes, and the one real usage (the Lumi nav entry point)
  // isn't visible while its own panel — the thing "active" would
  // reflect — is open.
  active?: never;
}

export type NavTabsItemVariantProperties =
  | NavTabsItemNeutralProperties
  | NavTabsItemAIGenerativeProperties;

export type NavTabsItemProps = NavTabsItemVariantProperties &
  Omit<BoxProperties, "onClick"> &
  Omit<HTMLAttributes<HTMLElement>, "color">;
