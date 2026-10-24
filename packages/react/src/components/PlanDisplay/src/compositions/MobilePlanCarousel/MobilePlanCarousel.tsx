import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";

import { Box, ScrollPane } from "@nimbus-ds/components";
import { ProductUpdates } from "@nimbus-ds/productupdates";

import {
  getActiveIndex,
  getItemWidth,
  getRestPosition,
  GUTTER,
  SETTLE_DELAY
} from "./mobilePlanCarousel.definitions";
import { MobilePlanCarouselProps } from "./mobilePlanCarousel.types";

const CONTENT_CONTAINER_PROPS = {
  margin: "none",
  gap: "4",
  px: "4"
} as const;

// "instant" is a valid scroll behaviour that the TypeScript DOM typings in use do not list;
// "auto" would still animate because the scroller's CSS sets `scroll-behavior: smooth`.
const INSTANT_BEHAVIOR = "instant" as unknown as "auto";

const ARROW_STEPS: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1 };

// Box ignores `style`, so the visually hidden live region is a native element.
const VISUALLY_HIDDEN_STYLE: React.CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap"
};

const prefersReducedMotion = (): boolean =>
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const getSnapAlign = (index: number, total: number) => {
  if (total <= 1 || index === 0) return "start";
  return index === total - 1 ? "end" : "center";
};

/**
 * Reference mobile composition of PlanDisplay cards: one ScrollPane item per plan, snapping so
 * that one plan rests fully visible with its neighbours peeking, and neutral position dots below.
 * It is documentation of the composition and is not exported by the package.
 */
const MobilePlanCarousel: React.FC<MobilePlanCarouselProps> = ({
  getPositionLabel,
  plans,
  scrollAreaLabel
}: MobilePlanCarouselProps) => {
  const total = plans.length;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const widthRef = useRef(0);
  const activeRef = useRef(0);
  const pendingTargetRef = useRef<number | null>(null);
  const lastAnnouncedRef = useRef<string | null>(null);
  const settleTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const restoreIndexRef = useRef<number | null>(null);
  const pointerRef = useRef(false);
  const getPositionLabelRef = useRef(getPositionLabel);
  const [width, setWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [announcement, setAnnouncement] = useState("");

  getPositionLabelRef.current = getPositionLabel;

  const scheduleSettle = useCallback(() => {
    clearTimeout(settleTimerRef.current);
    settleTimerRef.current = setTimeout(() => {
      pendingTargetRef.current = null;
      if (total < 2) return;
      const label = getPositionLabelRef.current(activeRef.current, total);
      const lastAnnounced =
        lastAnnouncedRef.current ?? getPositionLabelRef.current(0, total);
      lastAnnouncedRef.current = label;
      if (label !== lastAnnounced) setAnnouncement(label);
    }, SETTLE_DELAY);
  }, [total]);

  // Snap on the scroller: swipe, wheel, trackpad and focus scrolls rest on a plan.
  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;
    scroller.style.setProperty("scroll-snap-type", "x mandatory");
    scroller.style.setProperty("scroll-padding-inline", `${GUTTER}px`);
    widthRef.current = scroller.clientWidth;
    setWidth(scroller.clientWidth);
    return () => {
      scroller.style.removeProperty("scroll-snap-type");
      scroller.style.removeProperty("scroll-padding-inline");
    };
  }, []);

  // Keep the plan that was active when the scroll area changes width.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || typeof ResizeObserver === "undefined") return undefined;
    const observer = new ResizeObserver(() => {
      if (scroller.clientWidth === widthRef.current) return;
      restoreIndexRef.current = activeRef.current;
      widthRef.current = scroller.clientWidth;
      setWidth(scroller.clientWidth);
    });
    observer.observe(scroller);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const restoreIndex = restoreIndexRef.current;
    const scroller = scrollerRef.current;
    if (restoreIndex === null || !scroller) return;
    restoreIndexRef.current = null;
    scroller.scrollTo({
      left: getRestPosition(restoreIndex, total, width),
      behavior: INSTANT_BEHAVIOR
    });
  }, [width, total]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;
    const handleScroll = () => {
      if (restoreIndexRef.current !== null) return;
      const next = getActiveIndex(scroller.scrollLeft, total, widthRef.current);
      if (next !== activeRef.current) {
        activeRef.current = next;
        setActiveIndex(next);
      }
      scheduleSettle();
    };
    scroller.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      scroller.removeEventListener("scroll", handleScroll);
      clearTimeout(settleTimerRef.current);
    };
  }, [total, scheduleSettle]);

  const scrollToPlan = (index: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    pendingTargetRef.current = index;
    scroller.scrollTo({
      left: getRestPosition(index, total, widthRef.current),
      behavior: prefersReducedMotion() ? INSTANT_BEHAVIOR : "smooth"
    });
    scheduleSettle();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    const step = ARROW_STEPS[event.key];
    if (event.target !== event.currentTarget || !step) return;
    const target = (pendingTargetRef.current ?? activeRef.current) + step;
    if (target < 0 || target > total - 1) return;
    event.preventDefault();
    scrollToPlan(target);
  };

  const handleFocus = (event: React.FocusEvent<HTMLElement>) => {
    if (event.target === event.currentTarget || pointerRef.current) return;
    const item = (event.target as HTMLElement).closest("[data-plan-index]");
    if (!item) return;
    const index = Number(item.getAttribute("data-plan-index"));
    if (index !== (pendingTargetRef.current ?? activeRef.current)) {
      scrollToPlan(index);
    }
  };

  const itemWidth = getItemWidth(width);
  const shownIndex = Math.min(activeIndex, Math.max(total - 1, 0));

  return (
    <Box position="relative">
      <ScrollPane
        showArrows={false}
        showScrollbar={false}
        scrollToItemOnClick={false}
        scrollContainerRef={scrollerRef}
        contentContainerProps={CONTENT_CONTAINER_PROPS}
        role="region"
        aria-label={scrollAreaLabel}
        tabIndex={0}
        boxShadow={{ focusVisible: "focusRing" }}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onPointerDownCapture={() => {
          pointerRef.current = true;
        }}
        onKeyDownCapture={() => {
          pointerRef.current = false;
        }}
      >
        {plans.map((plan, index) => (
          <ScrollPane.Item
            key={plan.name}
            role="group"
            aria-label={plan.name}
            tabIndex={undefined}
            data-plan-index={index}
            style={{
              flex: "0 0 auto",
              display: "flex",
              width: `${itemWidth}px`,
              scrollSnapAlign: getSnapAlign(index, total)
            }}
          >
            {plan.card}
          </ScrollPane.Item>
        ))}
      </ScrollPane>
      {total >= 2 && (
        <Box display="flex" justifyContent="center" mt="4">
          <ProductUpdates.Paginator
            appearance="neutral"
            totalItems={total}
            activeIndex={shownIndex}
            aria-label={getPositionLabel(shownIndex, total)}
          />
        </Box>
      )}
      <div aria-live="polite" aria-atomic="true" style={VISUALLY_HIDDEN_STYLE}>
        {announcement}
      </div>
    </Box>
  );
};

MobilePlanCarousel.displayName = "MobilePlanCarousel";

export { MobilePlanCarousel };
