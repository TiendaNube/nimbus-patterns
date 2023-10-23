import { useContext } from "react";

import { TranslateContext, TranslateContextProps } from "../../contexts";

export const useTranslate: () => TranslateContextProps = () => {
  const context = useContext(TranslateContext);
  return context;
};
