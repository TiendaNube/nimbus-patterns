import React from "react";
import { Box } from "@nimbus-ds/components";

type LandingScreenListProps = {
  icon: React.ReactNode;
  title: string;
};

const LandingScreenList: React.FC<
  React.PropsWithChildren<LandingScreenListProps>
> = () => <Box p="4" borderRadius="2" boxShadow="2" />;

export { LandingScreenList };
