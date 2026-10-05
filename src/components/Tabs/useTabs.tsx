import { type KeyboardEvent, useCallback, useLayoutEffect, useRef, useState } from "react";
import { useActiveTabContext } from "@/context/activeTabContext";
import type { UseTabsProps } from "./types";

export function useTabs({
  autoScrollBehavior,
  orientation = "horizontal",
  activation = "manual",
}: UseTabsProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const tabValueContext = useActiveTabContext();
  const [isListInView, setIsListInView] = useState(false);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsListInView(entry.isIntersecting);
    });
    observer.observe(list);
    return () => {
      observer.disconnect();
      setIsListInView(false);
    };
  }, []);

  useLayoutEffect(() => {
    if (autoScrollBehavior === "none") return;
    const list = listRef.current;
    if (!list || !tabValueContext?.activeTab) return;
    if (!isListInView) return;
    const tab = list.querySelector<HTMLElement>(`[role="tab"][aria-selected="true"]`);
    if (!tab) return;
    tab.scrollIntoView({
      behavior: autoScrollBehavior,
      inline: "center",
      block: "nearest",
    });
  }, [
    tabValueContext?.activeTab,
    autoScrollBehavior,
    isListInView,
  ]);

  // Automatic activation: keep keyboard focus on the active tab when selection changes
  // while focus is already inside the tablist (e.g. controlled `activeTab` updates).
  useLayoutEffect(() => {
    if (activation !== "automatic") return;
    const list = listRef.current;
    if (!list || !tabValueContext?.activeTab) return;
    if (!list.contains(document.activeElement)) return;
    const selected = list.querySelector<HTMLElement>(`[role="tab"][aria-selected="true"]`);
    if (!selected || selected === document.activeElement) return;
    selected.focus();
  }, [
    activation,
    tabValueContext?.activeTab,
  ]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const list = listRef.current;
      if (!list) return;

      const tabs = Array.from(
        list.querySelectorAll<HTMLElement>(
          '[role="tab"]:not([disabled]):not([aria-disabled="true"])',
        ),
      );
      if (!tabs.length) return;

      const currentIndex = tabs.indexOf(event.target as HTMLElement);
      if (currentIndex === -1) return;

      const isHorizontal = orientation === "horizontal";
      const nextKey = isHorizontal ? "ArrowRight" : "ArrowDown";
      const previousKey = isHorizontal ? "ArrowLeft" : "ArrowUp";

      let nextIndex: number | undefined;

      switch (event.key) {
        case nextKey:
          nextIndex = (currentIndex + 1) % tabs.length;
          break;
        case previousKey:
          nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
          break;
        case "Home":
          nextIndex = 0;
          break;
        case "End":
          nextIndex = tabs.length - 1;
          break;
        case "Enter":
        case " ":
          event.preventDefault();
          tabs[currentIndex].click();
          return;
        default:
          return;
      }

      event.preventDefault();
      const nextTab = tabs[nextIndex];
      nextTab.focus();
      if (activation === "automatic") {
        nextTab.click();
      }
    },
    [
      orientation,
      activation,
    ],
  );

  return {
    listRef,
    handleKeyDown,
    orientation,
  };
}
