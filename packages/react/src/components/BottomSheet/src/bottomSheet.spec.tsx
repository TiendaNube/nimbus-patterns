import React, { useState } from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
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

// window.visualViewport/innerHeight are read by useKeyboardInset/useSnapPoints
// on every render. Several tests below mutate them (directly, or via a mock
// visualViewport object) to simulate a resized viewport/open keyboard. Rather
// than relying on each describe block to clean up perfectly after itself
// (fragile — CI has shown these can leak a stale value into unrelated tests
// that never touch these globals themselves), force a known, real baseline
// before every single test in this file, regardless of what ran before it.
const ORIGINAL_INNER_HEIGHT = window.innerHeight;
const ORIGINAL_VISUAL_VIEWPORT = window.visualViewport;

beforeEach(() => {
  // Plain assignment, not Object.defineProperty: CI's full parallel
  // test:ci run showed defineProperty's own attributes (configurable/
  // enumerable/writable) landing correctly on window.visualViewport while
  // the `value` it was given silently became undefined — reproducibly,
  // only under that full run, never locally or in isolation. Plain
  // assignment is a simpler property-set path that isn't affected by
  // whatever that was.
  window.visualViewport = ORIGINAL_VISUAL_VIEWPORT;
  Object.defineProperty(window, "innerHeight", {
    value: ORIGINAL_INNER_HEIGHT,
    configurable: true,
  });
});

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

      const grabber = screen.getByRole("separator");
      const bodyButton = screen.getByRole("button", {
        name: "Focusable body button",
      });
      const confirmButton = screen.getByRole("button", { name: "Confirm" });

      // Initial focus skips the grabber (chrome, not content) and lands on
      // the first real content element.
      expect(bodyButton).toHaveFocus();

      // The grabber is keyboard-focusable and comes first in the DOM, so it
      // IS the wrap boundary: Tab from the last focusable wraps to it, not to
      // bodyButton.
      confirmButton.focus();
      fireEvent.keyDown(confirmButton, { key: "Tab" });
      expect(grabber).toHaveFocus();

      // Shift+Tab from the grabber (the first focusable) wraps to the last.
      fireEvent.keyDown(grabber, { key: "Tab", shiftKey: true });
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

  describe("WHEN the sheet locks background scroll", () => {
    afterEach(() => {
      document.body.style.overflow = "";
    });

    const fireTouchMove = (target: Element) => {
      const event = new Event("touchmove", {
        bubbles: true,
        cancelable: true,
      });
      target.dispatchEvent(event);
      return event;
    };

    it("THEN should set overflow: hidden on the body without moving its position", () => {
      // Deliberately NOT position: fixed + a captured/restored scroll offset
      // (the technique some other libraries use for the same iOS touch-
      // scroll gap): forcing that layout change on document.body can itself
      // make the browser's own chrome (address bar/toolbar) animate to a
      // different size right as the sheet opens, corrupting
      // useKeyboardInset/useSnapPoints's viewport-based measurements taken
      // around that same moment. Blocking the touch gesture itself (below)
      // instead means the page's real scroll position never has to move at
      // all, so there's nothing for that chrome-jank to react to.
      makeSut();

      expect(document.body.style.overflow).toBe("hidden");
      expect(document.body.style.position).toBe("");
      expect(document.body.style.top).toBe("");
    });

    it("THEN should restore overflow on unlock", () => {
      const { rerender } = makeSut();

      rerender(
        <BottomSheet open={false} onRemove={jest.fn()}>
          <BottomSheet.Body>Body</BottomSheet.Body>
        </BottomSheet>
      );

      expect(document.body.style.overflow).toBe("");
    });

    it("THEN should NOT prevent a touchmove that lands inside the sheet's own panel", () => {
      // The sheet's own content (Body's overflowY: auto) and the grabber's
      // drag gesture both rely on their own touchmove events reaching them
      // untouched — this is the case that happens constantly in normal use,
      // so it must never be blocked.
      makeSut();
      const bodyButton = screen.getByRole("button", {
        name: "Focusable body button",
      });

      const event = fireTouchMove(bodyButton);

      expect(event.defaultPrevented).toBe(false);
    });

    it("THEN should prevent a touchmove that lands outside the sheet (the background)", () => {
      makeSut();
      const background = document.createElement("div");
      document.body.appendChild(background);

      const event = fireTouchMove(background);

      expect(event.defaultPrevented).toBe(true);
      document.body.removeChild(background);
    });

    it("THEN two stacked sheets should share a single lock, each one's own content still scrollable, released only when the last one closes", () => {
      const { rerender: rerenderFirst } = render(
        <BottomSheet open onRemove={jest.fn()}>
          <BottomSheet.Body>
            <button type="button">First sheet button</button>
          </BottomSheet.Body>
        </BottomSheet>
      );
      render(
        <BottomSheet open onRemove={jest.fn()}>
          <BottomSheet.Body>
            <button type="button">Second sheet button</button>
          </BottomSheet.Body>
        </BottomSheet>
      );

      expect(document.body.style.overflow).toBe("hidden");
      expect(
        fireTouchMove(
          screen.getByRole("button", { name: "First sheet button" })
        ).defaultPrevented
      ).toBe(false);
      expect(
        fireTouchMove(
          screen.getByRole("button", { name: "Second sheet button" })
        ).defaultPrevented
      ).toBe(false);

      rerenderFirst(
        <BottomSheet open={false} onRemove={jest.fn()}>
          <BottomSheet.Body>
            <button type="button">First sheet button</button>
          </BottomSheet.Body>
        </BottomSheet>
      );

      // The second sheet is still open: the lock must survive the first
      // sheet's own close instead of being released early, and the second
      // sheet's own content must still scroll normally.
      expect(document.body.style.overflow).toBe("hidden");
      expect(
        fireTouchMove(
          screen.getByRole("button", { name: "Second sheet button" })
        ).defaultPrevented
      ).toBe(false);
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
    const originalInnerHeight = window.innerHeight;

    afterEach(() => {
      window.visualViewport = originalVisualViewport;
      // The first test below mutates window.innerHeight directly (not scoped
      // to this describe); without restoring it here, a stale keyboardInset
      // from that mutation could otherwise leak into every later test in this
      // file that computes heights against window.innerHeight.
      Object.defineProperty(window, "innerHeight", {
        value: originalInnerHeight,
        configurable: true,
      });
    });

    it("THEN should reposition the sheet above the keyboard using the Visual Viewport API", async () => {
      const listeners: Record<string, Array<() => void>> = {};
      const addEventListener = jest.fn((event: string, cb: () => void) => {
        listeners[event] = [...(listeners[event] ?? []), cb];
      });
      // A real (not bare jest.fn()) removal, so a double-subscribe in any
      // render pass (e.g. an effect re-running) can't leave a duplicate,
      // stale listener behind that this test can't see.
      const removeEventListener = jest.fn((event: string, cb: () => void) => {
        listeners[event] = (listeners[event] ?? []).filter(
          (registered) => registered !== cb
        );
      });
      const mockViewport = {
        height: 800,
        offsetTop: 0,
        addEventListener,
        removeEventListener,
      };
      // Plain assignment, not Object.defineProperty: CI's full parallel
      // test:ci run showed defineProperty's own attributes (configurable/
      // enumerable/writable) landing correctly while the `value` it was
      // given silently became undefined — reproducibly, only under that
      // full run, never locally or in isolation. Plain assignment is a
      // simpler property-set path that isn't affected by whatever that was.
      window.visualViewport = mockViewport as unknown as VisualViewport;
      Object.defineProperty(window, "innerHeight", {
        value: 800,
        configurable: true,
      });

      makeSut();
      const panel = screen.getByRole("dialog");
      // Definitive, assertion-based (not console.log-based) proof of whether
      // useKeyboardInset's effect actually subscribed to this mock: CI's
      // debug logs from inside the hook never appeared at all for any test
      // in this file, which console.log output from unrelated files in the
      // same run did — pointing at the effect body never running there,
      // not at swallowed output. A jest.fn() call assertion can't be
      // ambiguous the way a maybe-swallowed log can.
      expect(addEventListener).toHaveBeenCalledWith(
        "resize",
        expect.any(Function)
      );
      expect(panel.style.bottom).toBe("0px");
      // containerHeight(800) - offset(320) - keyboardInset(0) for the default
      // 60% snap.
      expect(panel.style.height).toBe("480px");

      mockViewport.height = 500;

      // Height must shrink by the same 300px the keyboard covers
      // (480 - 300 = 180), not stay fixed: bottom(300) + height(180) = 480 =
      // the original top offset, so the panel's top edge stays put instead
      // of the whole fixed-height block sliding up past the viewport's top
      // edge. Re-fires the currently-registered listeners on every poll
      // (not just once) as a defensive retry, in case a fresh CI run still
      // shows the state settling a tick later than expected.
      await waitFor(() => {
        act(() => {
          listeners.resize?.forEach((cb) => cb());
        });
        expect(panel.style.bottom).toBe("300px");
        expect(panel.style.height).toBe("180px");
      });
    });

    it("THEN should NOT double-count the browser chrome's own height change as keyboard coverage", async () => {
      // Regression for a real-device bug: the browser's own chrome (address
      // bar/toolbar) showing shrinks BOTH window.innerHeight and the visual
      // viewport's height together, since it genuinely reduces the page's
      // real layout space — useSnapPoints's containerHeight (read from
      // window.innerHeight) already accounts for that on its own. If
      // useKeyboardInset reacted to the visual viewport's shrink in
      // isolation (ignoring that window.innerHeight shrank by the same
      // amount), it would treat that already-handled space as ALSO covered
      // by a keyboard, subtracting it a second time and leaving a
      // permanent gap at the bottom whenever the chrome happens to be
      // visible — with no keyboard involved at all.
      const listeners: Record<string, Array<() => void>> = {};
      const mockViewport = {
        height: 800,
        offsetTop: 0,
        addEventListener: (event: string, cb: () => void) => {
          listeners[event] = [...(listeners[event] ?? []), cb];
        },
        removeEventListener: jest.fn(),
      };
      window.visualViewport = mockViewport as unknown as VisualViewport;
      Object.defineProperty(window, "innerHeight", {
        value: 800,
        configurable: true,
      });

      makeSut();
      const panel = screen.getByRole("dialog");
      expect(panel.style.bottom).toBe("0px");

      // The chrome appears: both shrink together by the same 100px, no
      // keyboard involved.
      mockViewport.height = 700;
      Object.defineProperty(window, "innerHeight", {
        value: 700,
        configurable: true,
      });

      await waitFor(() => {
        act(() => {
          listeners.resize?.forEach((cb) => cb());
        });
        expect(panel.style.bottom).toBe("0px");
      });
    });

    it("THEN should re-run when only window (not the visual viewport) fires resize", async () => {
      // Regression for a real-device bug: scrolling the background right
      // before opening the sheet, then focusing an input, can make the
      // browser's own chrome adjustment and the keyboard opening land close
      // together — and which of "window" or "visualViewport" actually fires
      // its own resize event for a given change isn't reliable on every
      // mobile browser. Simulates the case where only window's resize fires
      // (the keyboard-inset test above already covers the opposite case,
      // only visualViewport's).
      const mockViewport = {
        height: 800,
        offsetTop: 0,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      };
      window.visualViewport = mockViewport as unknown as VisualViewport;
      Object.defineProperty(window, "innerHeight", {
        value: 800,
        configurable: true,
      });

      makeSut();
      const panel = screen.getByRole("dialog");
      expect(panel.style.bottom).toBe("0px");

      // Chrome shrinks by 100px, keyboard covers a further 300px of the
      // now-smaller visible area — only window's own resize fires.
      Object.defineProperty(window, "innerHeight", {
        value: 700,
        configurable: true,
      });
      mockViewport.height = 400;

      await waitFor(() => {
        act(() => {
          window.dispatchEvent(new Event("resize"));
        });
        // 700 - 400 = 300px: isolates just the keyboard's own coverage,
        // unaffected by the chrome's separate 100px reduction (already
        // handled by containerHeight).
        expect(panel.style.bottom).toBe("300px");
      });
    });

    it("THEN should degrade gracefully when the Visual Viewport API is unavailable", () => {
      window.visualViewport = undefined as unknown as VisualViewport;

      expect(() => makeSut()).not.toThrow();
      expect(screen.getByRole("dialog").style.bottom).toBe("0px");
    });

    it("THEN should re-measure the container height when only the visual viewport (not window) fires resize", async () => {
      // Regression for a real-device bug: our own scroll-lock's position:fixed
      // trick can perturb the browser's chrome (address bar/toolbar) right
      // around mount, changing window.innerHeight — but that native,
      // chrome-driven change doesn't reliably fire window's own `resize`
      // event on all mobile browsers, only visualViewport's `resize`. Without
      // also re-measuring on that event, a stale containerHeight (and
      // therefore a wrong panel height, leaving a gap) would stick for the
      // sheet's entire open lifetime instead of self-correcting.
      const listeners: Record<string, Array<() => void>> = {};
      const mockViewport = {
        height: 800,
        offsetTop: 0,
        addEventListener: (event: string, cb: () => void) => {
          listeners[event] = [...(listeners[event] ?? []), cb];
        },
        removeEventListener: jest.fn(),
      };
      window.visualViewport = mockViewport as unknown as VisualViewport;
      Object.defineProperty(window, "innerHeight", {
        value: 800,
        configurable: true,
      });

      makeSut();
      const panel = screen.getByRole("dialog");
      // containerHeight(800) * 60% default snap.
      expect(panel.style.height).toBe("480px");

      Object.defineProperty(window, "innerHeight", {
        value: 600,
        configurable: true,
      });

      await waitFor(() => {
        // Fires only the visual viewport's own listeners, never window's
        // "resize" — isolating exactly the re-measurement path this test
        // covers.
        act(() => {
          listeners.resize?.forEach((cb) => cb());
        });
        // containerHeight(600) * 60% default snap.
        expect(panel.style.height).toBe("360px");
      });
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
    //
    // `timeStamp` is overridden explicitly because jsdom assigns it from a
    // real clock: events constructed back-to-back in the same synchronous
    // tick land on the same millisecond, which would make every drag read as
    // an (effectively) instantaneous, high-velocity flick. Controlling it
    // lets the distance-only tests simulate a deliberate, non-flick drag and
    // the flick tests simulate a genuinely fast one. The base timestamp must
    // be non-zero: React's SyntheticEvent treats a falsy nativeEvent.timeStamp
    // (i.e. exactly 0) as "unsupported" and substitutes a fresh Date.now()
    // of its own — only pointerdown goes through React's synthetic system
    // (pointermove/pointerup are plain document listeners), so a 0 base
    // would desync pointerdown's clock from the other two.
    const firePointerEvent = (
      target: Document | Element,
      type: string,
      clientY: number,
      timeStamp: number
    ) => {
      const event = new MouseEvent(type, {
        clientY,
        bubbles: true,
        cancelable: true,
      });
      Object.defineProperty(event, "timeStamp", {
        value: timeStamp,
        configurable: true,
      });
      fireEvent(target, event);
    };

    // Default duration models a deliberate drag, slow enough that velocity
    // stays under DISMISS_VELOCITY_THRESHOLD (0.5px/ms) for the small
    // distances the distance-only tests below use, so only geometric
    // position decides their outcome. The velocity-flick tests pass a much
    // shorter duration for the same distance to cross that threshold.
    const drag = (fromClientY: number, toClientY: number, durationMs = 200) => {
      firePointerEvent(
        screen.getByRole("separator"),
        "pointerdown",
        fromClientY,
        1
      );
      firePointerEvent(document, "pointermove", toClientY, 1 + durationMs);
      firePointerEvent(document, "pointerup", toClientY, 1 + durationMs);
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

    it("THEN a fast upward flick should settle at the taller snap even without crossing the midpoint", () => {
      dragSut(0);
      const panel = screen.getByRole("dialog");
      expect(panel.style.height).toBe("320px");

      // Drag up by only 40px (480 -> 440, nowhere near the 320 midpoint) but
      // in just 20ms: velocity = 40/20 = 2px/ms, well past the 0.5px/ms
      // DISMISS_VELOCITY_THRESHOLD used as the flick threshold. Distance
      // alone would settle back at the same (320) snap; velocity should
      // instead bias to the taller (640) one.
      drag(500, 460, 20);

      expect(panel.style.height).toBe("640px");
    });

    it("THEN a fast downward flick should settle at the shorter snap even without crossing the midpoint", () => {
      dragSut(1);
      const panel = screen.getByRole("dialog");
      expect(panel.style.height).toBe("640px");

      // Drag down by only 40px (160 -> 200, nowhere near the 320 midpoint)
      // in just 20ms: velocity = 40/20 = 2px/ms, past the flick threshold.
      // Distance alone would settle back at the same (640) snap; velocity
      // should instead bias to the shorter (320) one.
      drag(200, 240, 20);

      expect(panel.style.height).toBe("320px");
    });

    it("THEN should dismiss when dragged down past the dismiss threshold from the lowest snap", () => {
      const { onRemove } = dragSut(0);

      // Drag down by 150px (> DISMISS_DISTANCE_THRESHOLD of 96) from the
      // lowest snap: 480 -> 630.
      drag(500, 650);

      expect(onRemove).toHaveBeenCalledTimes(1);
    });

    it("THEN a pointercancel should stop the drag and detach its listeners instead of leaving them stuck", () => {
      dragSut(0);
      const panel = screen.getByRole("dialog");

      firePointerEvent(screen.getByRole("separator"), "pointerdown", 500, 1);
      firePointerEvent(document, "pointermove", 300, 21);

      // Mid-drag: no settle transition, height tracks the live (unresolved) offset.
      expect(panel.style.transition).toBe("none");

      firePointerEvent(document, "pointercancel", 300, 21);

      // Cancelled, not released: reverts to the original snap height (not the
      // dragged-to offset) and re-enables the settle transition.
      expect(panel.style.height).toBe("320px");
      expect(panel.style.transition).not.toBe("none");

      // A pointermove after pointercancel must be a no-op: if the listener
      // were still attached (the bug this test guards against), this would
      // move the panel again.
      firePointerEvent(document, "pointermove", 100, 41);
      expect(panel.style.height).toBe("320px");
    });

    it("THEN unmounting mid-drag should detach its listeners instead of firing on a gone component", () => {
      const { onRemove, unmount } = dragSut(0);

      firePointerEvent(screen.getByRole("separator"), "pointerdown", 500, 1);
      // Drag down 150px (past DISMISS_DISTANCE_THRESHOLD): handlePointerUp
      // resolves from this recorded offset/velocity, not from pointerup's own
      // clientY, so the dismiss-worthy state must be set here before unmount.
      firePointerEvent(document, "pointermove", 650, 21);

      unmount();

      // If pointerup were still attached after unmount (the bug this test
      // guards against), it would resolve the drag recorded above and call
      // onRemove despite the component being gone.
      firePointerEvent(document, "pointerup", 650, 41);

      expect(onRemove).not.toHaveBeenCalled();
    });

    it("THEN the grabber should expose its snap position via ARIA and be keyboard-focusable", () => {
      dragSut(0);
      const grabber = screen.getByRole("separator");

      expect(grabber).toHaveAttribute("tabindex", "0");
      expect(grabber).toHaveAttribute("aria-valuenow", "0");
      expect(grabber).toHaveAttribute("aria-valuemin", "0");
      expect(grabber).toHaveAttribute("aria-valuemax", "1"); // 2 snaps: indices 0-1
    });

    it("THEN ArrowUp/ArrowDown on the grabber should step to the adjacent snap", () => {
      dragSut(0);
      const grabber = screen.getByRole("separator");
      const panel = screen.getByRole("dialog");
      expect(panel.style.height).toBe("320px");

      fireEvent.keyDown(grabber, { key: "ArrowUp" });
      expect(panel.style.height).toBe("640px");
      expect(grabber).toHaveAttribute("aria-valuenow", "1");

      fireEvent.keyDown(grabber, { key: "ArrowDown" });
      expect(panel.style.height).toBe("320px");
      expect(grabber).toHaveAttribute("aria-valuenow", "0");

      // Already at the lowest snap: ArrowDown clamps instead of going out of bounds.
      fireEvent.keyDown(grabber, { key: "ArrowDown" });
      expect(panel.style.height).toBe("320px");
    });

    it("THEN Home/End on the grabber should jump to the lowest/tallest snap", () => {
      dragSut(0);
      const grabber = screen.getByRole("separator");
      const panel = screen.getByRole("dialog");

      fireEvent.keyDown(grabber, { key: "End" });
      expect(panel.style.height).toBe("640px");

      fireEvent.keyDown(grabber, { key: "Home" });
      expect(panel.style.height).toBe("320px");
    });

    it("THEN keyboard-driven snap changes should never dismiss the sheet", () => {
      const { onRemove } = dragSut(0);
      const grabber = screen.getByRole("separator");

      fireEvent.keyDown(grabber, { key: "ArrowDown" });
      fireEvent.keyDown(grabber, { key: "Home" });

      expect(onRemove).not.toHaveBeenCalled();
    });
  });

  describe("WHEN snapPoints shrinks while the sheet is already open", () => {
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

    it("THEN should clamp the active snap index instead of leaving it out of bounds", () => {
      const { rerender } = render(
        <BottomSheet open snapPoints={["30%", "60%", "90%"]} defaultSnap={2}>
          <BottomSheet.Body>content</BottomSheet.Body>
        </BottomSheet>
      );

      const panel = screen.getByRole("dialog");
      expect(panel.style.height).toBe("720px");

      // Shrinking to a single snap point removes index 2 (the active one).
      // defaultSnap is intentionally unchanged (still 2) to prove the sheet
      // isn't just re-reading defaultSnap: it must clamp whatever the
      // current index was.
      rerender(
        <BottomSheet open snapPoints={["30%"]} defaultSnap={2}>
          <BottomSheet.Body>content</BottomSheet.Body>
        </BottomSheet>
      );

      expect(panel.style.height).toBe("240px");
    });
  });

  describe("WHEN the sheet needs an accessible name", () => {
    it("THEN should label the dialog via aria-labelledby pointing at its own Header", () => {
      render(
        <BottomSheet open>
          <BottomSheet.Header>
            <span>Edit product</span>
          </BottomSheet.Header>
          <BottomSheet.Body>content</BottomSheet.Body>
        </BottomSheet>
      );

      const dialog = screen.getByRole("dialog");
      const labelledBy = dialog.getAttribute("aria-labelledby");
      expect(labelledBy).toBeTruthy();

      const header = document.getElementById(labelledBy as string);
      expect(header).not.toBeNull();
      expect(header).toHaveTextContent("Edit product");
    });

    it("THEN should NOT override an explicit aria-label from the consumer", () => {
      render(
        <BottomSheet open aria-label="Custom label">
          <BottomSheet.Header>
            <span>Edit product</span>
          </BottomSheet.Header>
          <BottomSheet.Body>content</BottomSheet.Body>
        </BottomSheet>
      );

      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveAttribute("aria-label", "Custom label");
      expect(dialog).not.toHaveAttribute("aria-labelledby");
    });

    it("THEN should NOT override an explicit aria-labelledby from the consumer", () => {
      render(
        <>
          <span id="external-label">Externally provided label</span>
          <BottomSheet open aria-labelledby="external-label">
            <BottomSheet.Header>
              <span>Edit product</span>
            </BottomSheet.Header>
            <BottomSheet.Body>content</BottomSheet.Body>
          </BottomSheet>
        </>
      );

      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveAttribute("aria-labelledby", "external-label");
    });
  });
});
