import { type KeyboardEvent, useCallback, useLayoutEffect, useRef } from "react";
import { useActiveTabContext } from "@/context/activeTabContext";
import type { UseTabsProps } from "./types";

export function useTabs({ autoScrollBehavior, orientation = "horizontal" }: UseTabsProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const tabValueContext = useActiveTabContext();

  useLayoutEffect(() => {
    if (autoScrollBehavior === "none") return;
    const list = listRef.current;
    if (!list || !tabValueContext?.activeTab) return;
    const tab = list.querySelector<HTMLElement>(`[role="tab"][aria-selected="true"]`);
    if (!tab) return;
    tab.scrollIntoView({
      behavior: autoScrollBehavior,
      inline: "center",
    });
  }, [
    tabValueContext?.activeTab,
    autoScrollBehavior,
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
      tabs[nextIndex].focus();
    },
    [
      orientation,
    ],
  );

  return {
    listRef,
    handleKeyDown,
    orientation,
  };
}
