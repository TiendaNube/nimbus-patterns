import { ReactNode, ReactElement } from "react";
import LandingScreenheroBullet, {
  LandingScreenheroBulletProps,
} from "../LandingScreenHeroBullet";

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
  bullets: ReactElement<
    LandingScreenheroBulletProps,
    typeof LandingScreenheroBullet
  >[];
};
