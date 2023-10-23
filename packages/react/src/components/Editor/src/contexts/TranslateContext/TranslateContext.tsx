import { createContext } from "react";
import { TranslateContextProps } from "./translateContext.types";
import { initialTranslationContext } from "./translateContext.definitions";

export const TranslateContext = createContext<TranslateContextProps>(
  initialTranslationContext as TranslateContextProps
);
