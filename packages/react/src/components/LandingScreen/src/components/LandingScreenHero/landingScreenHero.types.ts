import { ReactNode, ReactElement, PropsWithChildren } from "react";
import { BoxProps } from "@nimbus-ds/components";
import LandingScreenBullet, {
  LandingScreenBulletProps,
} from "../LandingScreenBullet";

type HeroImage = {
  alt: string;
  src: string;
};

type BaseHeroProps = {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  image: HeroImage;
};

export type HeroWithDescription = BaseHeroProps & {
  description: string;
  bullets?: never;
};

export type HeroWithBullets = BaseHeroProps & {
  description?: never;
  bullets: ReactElement<LandingScreenBulletProps, typeof LandingScreenBullet>[];
};

export type LandingScreenHeroProps = PropsWithChildren<
  HeroWithDescription | HeroWithBullets
> &
  Omit<BoxProps, "alignItems" | "mx" | "height">;
