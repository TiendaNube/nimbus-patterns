import React, { useRef } from "react";
import {
  useFloating,
  shift,
  flip,
  FloatingPortal,
  autoUpdate,
} from "@floating-ui/react";
import { popover } from "@nimbus-ds/styles";

import { useFloatingLinkEditor } from "./hooks";
import { PopoverEditLink } from "./components";

const CustomFloatingLinkEditor: React.FC = () => {
  const ref = useRef(null);
  const { isLink, linkUrl, showPopover, handlePopover } =
    useFloatingLinkEditor();

  const { floatingStyles } = useFloating({
    strategy: "fixed",
    whileElementsMounted: autoUpdate,
    elements: {
      floating: ref?.current,
      reference: window?.getSelection?.()?.focusNode?.parentElement,
    },
    middleware: [
      shift(),
      flip({
        crossAxis: true,
        fallbackAxisSideDirection: "end",
        padding: 5,
      }),
    ],
  });

  return (
    <FloatingPortal id="nimbus-popover-floating">
      <div
        ref={ref}
        style={{ ...floatingStyles, display: isLink ? "flex" : "none" }}
        className={popover.classnames.content}
      >
        {showPopover && (
          <PopoverEditLink linkUrl={linkUrl} handlePopover={handlePopover} />
        )}
      </div>
    </FloatingPortal>
  );
};

export { CustomFloatingLinkEditor };
