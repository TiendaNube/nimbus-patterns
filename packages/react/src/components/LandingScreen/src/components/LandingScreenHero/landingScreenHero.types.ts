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
  description?: string;
  bullets?: ReactElement<
    LandingScreenBulletProps,
    typeof LandingScreenBullet
  >[];
};

export type LandingScreenHeroProps = PropsWithChildren<BaseHeroProps> &
  Omit<BoxProps, "alignItems" | "mx" | "height">;
