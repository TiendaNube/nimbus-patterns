import React, { useState } from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Alert, Button, Modal, Popover, Text } from "@nimbus-ds/components";
import { ThemeProvider } from "@nimbus-ds/styles";

import { BottomSheet } from "./BottomSheet";
import { BottomSheetProps } from "./bottomSheet.types";

const makeSut = (props: Partial<BottomSheetProps> = {}) => {
  const onRemove = jest.fn();
  const utils = render(
    <BottomSheet open onRemove={onRemove} {...props}>
      <BottomSheet.Header>
        <span data-testid="header-content">Header</span>
      </BottomSheet.Header>
      <BottomSheet.Body>
        <button type="button">Focusable body button</button>
      </BottomSheet.Body>
    </BottomSheet>
  );
  return { ...utils, onRemove };
};

describe("GIVEN <BottomSheet />", () => {
  describe("WHEN open is false", () => {
    it("THEN should not render", () => {
      render(
        <BottomSheet open={false}>
          <BottomSheet.Body>content</BottomSheet.Body>
        </BottomSheet>
      );
      expect(screen.queryByRole("dialog")).toBeNull();
    });
  });

  describe("WHEN open is true", () => {
    it("THEN should render as a modal dialog with the submitted header and body", () => {
      makeSut();
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      expect(screen.getByTestId("header-content")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Focusable body button" })
      ).toBeInTheDocument();
    });

    it("THEN should NOT set overflow: hidden on the panel, so floating content portaled into it (e.g. Popover) isn't clipped (relies on Body's own overflow/minHeight instead)", () => {
      makeSut();
      expect(screen.getByRole("dialog")).not.toHaveStyle({
        overflow: "hidden",
      });
    });

    it("THEN should NOT set a default z-index, matching Sidebar/Modal/Popover's own DS convention of relying on DOM mount order for stacking", () => {
      makeSut();
      // Any explicit positive z-index always paints above an element left at
      // the default `z-index: auto` (e.g. Popover, which never sets one),
      // regardless of DOM/open order. A default here would make the sheet
      // always render above a Popover opened from inside it.
      expect(screen.getByRole("dialog").style.zIndex).toBe("");
    });

    it("THEN should apply an explicit zIndex when the consumer provides one", () => {
      makeSut({ zIndex: 42 });
      expect(screen.getByRole("dialog").style.zIndex).toBe("42");
    });

    it("THEN a real Popover opened from inside the sheet should render above it, even inside a real Nimbus ThemeProvider (as Storybook and every real app wrap their tree)", async () => {
      // Regression test: Popover/Sidebar/Modal all portal into
      // refThemeProvider.current (Nimbus's <ThemeProvider> own wrapper div),
      // not document.body. Defaulting this sheet's portal to document.body
      // put it outside that shared container and ahead of it in the DOM, so
      // a Popover portaled inside the ThemeProvider div would render behind
      // the sheet. This only reproduces with a real ThemeProvider present
      // (as every real Nimbus app has) — without one, both fall back to
      // document.body and happen to line up by coincidence.
      const user = userEvent.setup();
      const Story = () => {
        const [visible, setVisible] = useState(false);
        return (
          <ThemeProvider theme="base">
            <BottomSheet open>
              <BottomSheet.Body>
                <Popover
                  content={
                    <span data-testid="popover-content">Popover content</span>
                  }
                  visible={visible}
                  onVisibility={setVisible}
                >
                  <Button onClick={() => setVisible((v) => !v)}>
                    Toggle popover
                  </Button>
                </Popover>
              </BottomSheet.Body>
            </BottomSheet>
          </ThemeProvider>
        );
      };

      render(<Story />);
      expect(screen.queryByTestId("popover-content")).toBeNull();

      await user.click(screen.getByRole("button", { name: "Toggle popover" }));

      const popoverContent = screen.getByTestId("popover-content");
      expect(popoverContent).toBeInTheDocument();

      // The popover's floating content and the sheet's panel must share the
      // same portal container (refThemeProvider's div), with the popover
      // mounted after the panel, so it paints on top via DOM order.
      const panel = screen.getByRole("dialog");
      const sharedContainer = panel.parentElement;
      expect(sharedContainer).not.toBeNull();
      expect(sharedContainer?.contains(popoverContent)).toBe(true);

      const children = Array.from(sharedContainer?.children ?? []);
      const panelIndex = children.indexOf(panel);
      const popoverFloatingIndex = children.findIndex((el) =>
        el.contains(popoverContent)
      );
      expect(popoverFloatingIndex).toBeGreaterThan(panelIndex);
    });

    it("THEN a real Modal opened from inside the sheet should render above it, inside a real ThemeProvider", async () => {
      const user = userEvent.setup();
      const Story = () => {
        const [modalOpen, setModalOpen] = useState(false);
        return (
          <ThemeProvider theme="base">
            <BottomSheet open>
              <BottomSheet.Body>
                <Button onClick={() => setModalOpen(true)}>Open modal</Button>
                <Modal open={modalOpen} onDismiss={() => setModalOpen(false)}>
                  <Modal.Header title="Modal title" />
                  <Modal.Body>
                    <span data-testid="modal-content">Modal content</span>
                  </Modal.Body>
                </Modal>
              </BottomSheet.Body>
            </BottomSheet>
          </ThemeProvider>
        );
      };

      render(<Story />);
      expect(screen.queryByTestId("modal-content")).toBeNull();

      await user.click(screen.getByRole("button", { name: "Open modal" }));

      const modalContent = screen.getByTestId("modal-content");
      expect(modalContent).toBeInTheDocument();

      // Modal's own floating-ui setup marks the rest of the page (including
      // our sheet's panel) as aria-hidden/inert while it's open — correct
      // a11y behavior, but it means getAllByRole("dialog") would only find
      // Modal's own (RTL excludes aria-hidden elements from role queries).
      // Query raw DOM here since we want both regardless of aria-hidden.
      const dialogs = Array.from(
        document.querySelectorAll<HTMLElement>('[role="dialog"]')
      );
      const sheetPanel = dialogs.find(
        (dialog) => !dialog.contains(modalContent)
      );
      const sharedContainer = sheetPanel?.parentElement;
      expect(sharedContainer?.contains(modalContent)).toBe(true);

      const children = Array.from(sharedContainer?.children ?? []);
      const panelIndex = sheetPanel ? children.indexOf(sheetPanel) : -1;
      const modalIndex = children.findIndex((el) => el.contains(modalContent));
      expect(modalIndex).toBeGreaterThan(panelIndex);
    });

    it("THEN dismissing a Modal opened from inside the sheet should close only the modal, not the sheet", async () => {
      // Regression test: Modal doesn't tag its own overlay/close button with
      // our ignoreAttributeName convention (nothing in Nimbus does — that's
      // purely our own cross-BottomSheet convention), so dismissing it used
      // to also register as an outside press against the sheet, closing both.
      const user = userEvent.setup();
      const onRemoveSheet = jest.fn();
      const Story = () => {
        const [modalOpen, setModalOpen] = useState(true);
        return (
          <ThemeProvider theme="base">
            <BottomSheet open onRemove={onRemoveSheet}>
              <BottomSheet.Body>
                <Modal open={modalOpen} onDismiss={() => setModalOpen(false)}>
                  <Modal.Header title="Modal title" />
                  <Modal.Body>
                    <span data-testid="modal-content">Modal content</span>
                  </Modal.Body>
                </Modal>
              </BottomSheet.Body>
            </BottomSheet>
          </ThemeProvider>
        );
      };

      render(<Story />);
      const modalContent = screen.getByTestId("modal-content");
      expect(modalContent).toBeInTheDocument();

      await user.click(screen.getByTestId("dismiss-modal-button"));

      expect(screen.queryByTestId("modal-content")).toBeNull();
      expect(onRemoveSheet).not.toHaveBeenCalled();
    });

    it("THEN an inline Alert inside the sheet should render normally (it's not an overlay, no stacking concerns)", () => {
      render(
        <BottomSheet open>
          <BottomSheet.Body>
            <Alert appearance="warning" title="Heads up">
              <Text>This is an inline Alert.</Text>
            </Alert>
          </BottomSheet.Body>
        </BottomSheet>
      );
      expect(screen.getByText("Heads up")).toBeInTheDocument();
    });

    it("THEN should render the submitted footer", () => {
      render(
        <BottomSheet open>
          <BottomSheet.Body>content</BottomSheet.Body>
          <BottomSheet.Footer>
            <button type="button">Confirm</button>
          </BottomSheet.Footer>
        </BottomSheet>
      );
      expect(
        screen.getByRole("button", { name: "Confirm" })
      ).toBeInTheDocument();
    });

    it("THEN should move focus into the sheet", () => {
      makeSut();
      expect(
        screen.getByRole("button", { name: "Focusable body button" })
      ).toHaveFocus();
    });

    it("THEN Tab/Shift+Tab should wrap focus among the sheet's focusable elements, and closing should restore focus to the opener", () => {
      const Story = () => {
        const [open, setOpen] = useState(false);
        return (
          <>
            <button type="button" onClick={() => setOpen(true)}>
              Open
            </button>
            <BottomSheet open={open} onRemove={() => setOpen(false)}>
              <BottomSheet.Header>
                <span data-testid="header-content">Header</span>
              </BottomSheet.Header>
              <BottomSheet.Body>
                <button type="button">Focusable body button</button>
              </BottomSheet.Body>
              <BottomSheet.Footer>
                <button type="button">Confirm</button>
              </BottomSheet.Footer>
            </BottomSheet>
          </>
        );
      };
      render(<Story />);

      const opener = screen.getByRole("button", { name: "Open" });
      opener.focus();

      fireEvent.click(opener);

      const bodyButton = screen.getByRole("button", {
        name: "Focusable body button",
      });
      const confirmButton = screen.getByRole("button", { name: "Confirm" });

      // Initial focus lands on the first focusable element.
      expect(bodyButton).toHaveFocus();

      // Tab from the last focusable wraps to the first.
      confirmButton.focus();
      fireEvent.keyDown(confirmButton, { key: "Tab" });
      expect(bodyButton).toHaveFocus();

      // Shift+Tab from the first focusable wraps to the last.
      fireEvent.keyDown(bodyButton, { key: "Tab", shiftKey: true });
      expect(confirmButton).toHaveFocus();

      // Closing the sheet restores focus to the element that opened it.
      fireEvent.keyDown(document, { key: "Escape" });
      expect(opener).toHaveFocus();
    });
  });

  describe("WHEN the user presses Escape", () => {
    it("THEN should call onRemove", () => {
      const { onRemove } = makeSut();
      fireEvent.keyDown(document, { key: "Escape" });
      expect(onRemove).toHaveBeenCalledTimes(1);
    });
  });

  describe("WHEN the user presses outside the sheet", () => {
    it("THEN should call onRemove", () => {
      const { onRemove } = makeSut();
      fireEvent.pointerDown(document.body);
      expect(onRemove).toHaveBeenCalledTimes(1);
    });

    it("THEN should NOT call onRemove when closeOnOutsidePress is false", () => {
      const { onRemove } = makeSut({ closeOnOutsidePress: false });
      fireEvent.pointerDown(document.body);
      expect(onRemove).not.toHaveBeenCalled();
    });

    it("THEN should respect a closeOnOutsidePress predicate", () => {
      const { onRemove } = makeSut({ closeOnOutsidePress: () => false });
      fireEvent.pointerDown(document.body);
      expect(onRemove).not.toHaveBeenCalled();
    });
  });

  describe("WHEN the press lands on an element marked to be ignored", () => {
    it("THEN should NOT call onRemove (e.g. a Popover portaled above the sheet)", () => {
      const { onRemove } = makeSut();
      const ignored = document.createElement("div");
      ignored.setAttribute("data-nimbus-outside-press-ignore", "");
      document.body.appendChild(ignored);

      fireEvent.pointerDown(ignored);
      expect(onRemove).not.toHaveBeenCalled();

      document.body.removeChild(ignored);
    });

    it("THEN should respect a custom ignoreAttributeName", () => {
      const { onRemove } = makeSut({
        ignoreAttributeName: "data-custom-ignore",
      });
      const ignored = document.createElement("div");
      ignored.setAttribute("data-custom-ignore", "");
      document.body.appendChild(ignored);

      fireEvent.pointerDown(ignored);
      expect(onRemove).not.toHaveBeenCalled();

      document.body.removeChild(ignored);
    });
  });

  describe("WHEN a second BottomSheet opens above an already open one", () => {
    it("THEN pressing content inside the second sheet should NOT close the first", () => {
      const onRemoveFirst = jest.fn();
      render(
        <>
          <BottomSheet open onRemove={onRemoveFirst}>
            <BottomSheet.Body>First sheet content</BottomSheet.Body>
          </BottomSheet>
          <BottomSheet open onRemove={jest.fn()}>
            <BottomSheet.Body>
              <button type="button">Second sheet button</button>
            </BottomSheet.Body>
          </BottomSheet>
        </>
      );

      fireEvent.pointerDown(
        screen.getByRole("button", { name: "Second sheet button" })
      );

      expect(onRemoveFirst).not.toHaveBeenCalled();
    });

    it("THEN pressing the second sheet's own overlay should NOT close the first", () => {
      const onRemoveFirst = jest.fn();
      const onRemoveSecond = jest.fn();
      render(
        <>
          <BottomSheet open onRemove={onRemoveFirst}>
            <BottomSheet.Body>First sheet content</BottomSheet.Body>
          </BottomSheet>
          <BottomSheet open onRemove={onRemoveSecond}>
            <BottomSheet.Body>Second sheet content</BottomSheet.Body>
          </BottomSheet>
        </>
      );

      // Each sheet's fragment mounts as [overlay, panel] siblings under body,
      // in mount order, so the second dialog's overlay is its previous sibling.
      const dialogs = screen.getAllByRole("dialog");
      const secondPanel = dialogs[dialogs.length - 1];
      const secondOverlay =
        secondPanel.previousElementSibling as HTMLElement | null;
      expect(secondOverlay).not.toBeNull();

      fireEvent.pointerDown(secondOverlay as HTMLElement);

      expect(onRemoveSecond).toHaveBeenCalledTimes(1);
      expect(onRemoveFirst).not.toHaveBeenCalled();
    });

    it("THEN pressing Escape once should dismiss only the topmost (second) sheet", () => {
      const onRemoveFirst = jest.fn();
      const onRemoveSecond = jest.fn();
      render(
        <>
          <BottomSheet open onRemove={onRemoveFirst}>
            <BottomSheet.Body>First sheet content</BottomSheet.Body>
          </BottomSheet>
          <BottomSheet open onRemove={onRemoveSecond}>
            <BottomSheet.Body>Second sheet content</BottomSheet.Body>
          </BottomSheet>
        </>
      );

      fireEvent.keyDown(document, { key: "Escape" });

      expect(onRemoveSecond).toHaveBeenCalledTimes(1);
      expect(onRemoveFirst).not.toHaveBeenCalled();
    });
  });

  describe("WHEN the press lands inside the panel content", () => {
    it("THEN should NOT call onRemove", () => {
      const { onRemove } = makeSut();
      fireEvent.pointerDown(screen.getByTestId("header-content"));
      expect(onRemove).not.toHaveBeenCalled();
    });
  });

  describe("WHEN the on-screen keyboard covers part of the viewport", () => {
    const originalVisualViewport = window.visualViewport;

    afterEach(() => {
      Object.defineProperty(window, "visualViewport", {
        value: originalVisualViewport,
        configurable: true,
      });
    });

    it("THEN should reposition the sheet above the keyboard using the Visual Viewport API", () => {
      const listeners: Record<string, Array<() => void>> = {};
      const mockViewport = {
        height: 800,
        offsetTop: 0,
        addEventListener: (event: string, cb: () => void) => {
          listeners[event] = [...(listeners[event] ?? []), cb];
        },
        removeEventListener: jest.fn(),
      };
      Object.defineProperty(window, "visualViewport", {
        value: mockViewport,
        configurable: true,
      });
      Object.defineProperty(window, "innerHeight", {
        value: 800,
        configurable: true,
      });

      makeSut();
      const panel = screen.getByRole("dialog");
      expect(panel.style.bottom).toBe("0px");

      mockViewport.height = 500;
      act(() => {
        listeners.resize?.forEach((cb) => cb());
      });

      expect(panel.style.bottom).toBe("300px");
    });

    it("THEN should degrade gracefully when the Visual Viewport API is unavailable", () => {
      Object.defineProperty(window, "visualViewport", {
        value: undefined,
        configurable: true,
      });

      expect(() => makeSut()).not.toThrow();
      expect(screen.getByRole("dialog").style.bottom).toBe("0px");
    });
  });

  describe("WHEN the user drags the grabber", () => {
    const originalInnerHeight = window.innerHeight;

    beforeEach(() => {
      Object.defineProperty(window, "innerHeight", {
        value: 800,
        configurable: true,
      });
    });

    afterEach(() => {
      Object.defineProperty(window, "innerHeight", {
        value: originalInnerHeight,
        configurable: true,
      });
    });

    // containerHeight = 800. snapPoints ["40%", "80%"] resolve to
    // heights [320, 640] and offsets [480, 160] (offset = containerHeight - height).
    const dragSut = (defaultSnap: number) =>
      makeSut({ snapPoints: ["40%", "80%"], defaultSnap });

    // jsdom in this environment has no PointerEvent constructor
    // (`typeof window.PointerEvent === "undefined"`), so RTL's
    // fireEvent.pointerDown/Move/Up fall back to a plain Event that carries
    // no clientY. MouseEvent does support clientY and is dispatched with the
    // same "pointerdown"/"pointermove"/"pointerup" type strings our
    // listeners (and React's own event delegation) match on by name, not by
    // constructor, so this reaches the same code path a real PointerEvent would.
    const firePointerEvent = (
      target: Document | Element,
      type: string,
      clientY: number
    ) => {
      fireEvent(
        target,
        new MouseEvent(type, { clientY, bubbles: true, cancelable: true })
      );
    };

    const drag = (fromClientY: number, toClientY: number) => {
      firePointerEvent(
        screen.getByRole("separator"),
        "pointerdown",
        fromClientY
      );
      firePointerEvent(document, "pointermove", toClientY);
      firePointerEvent(document, "pointerup", toClientY);
    };

    it("THEN should settle at the next snap after dragging past its midpoint", () => {
      dragSut(0);
      const panel = screen.getByRole("dialog");
      expect(panel.style.height).toBe("320px");

      // Drag up (decreasing clientY) by 200px: 480 -> 280, past the 320
      // midpoint between the 480 and 160 offsets, so it should settle at
      // the taller (80%, height 640) snap rather than getting stuck at 280.
      drag(500, 300);

      expect(panel.style.height).toBe("640px");
    });

    it("THEN should snap back to the same snap when the drag doesn't cross a midpoint", () => {
      dragSut(0);
      const panel = screen.getByRole("dialog");

      // Drag up by only 50px: 480 -> 430, nowhere near the 320 midpoint.
      drag(500, 450);

      expect(panel.style.height).toBe("320px");
    });

    it("THEN should dismiss when dragged down past the dismiss threshold from the lowest snap", () => {
      const { onRemove } = dragSut(0);

      // Drag down by 150px (> DISMISS_DISTANCE_THRESHOLD of 96) from the
      // lowest snap: 480 -> 630.
      drag(500, 650);

      expect(onRemove).toHaveBeenCalledTimes(1);
    });
  });
});
