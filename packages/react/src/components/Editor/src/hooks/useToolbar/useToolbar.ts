import { useContext } from "react";

import { ToolbarContext, ToolbarContextProps } from "../../contexts";

export const useToolbar: () => ToolbarContextProps = () => {
  const context = useContext(ToolbarContext);

  return context;
};
