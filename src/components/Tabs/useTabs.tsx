import { useLayoutEffect, useRef } from "react";
import { useActiveTabContext } from "@/context/activeTabContext";
import type { UseTabsProps } from "./types";

export function useTabs({ autoScrollBehavior }: UseTabsProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const hasMountedRef = useRef(false);
  const tabValueContext = useActiveTabContext();

  useLayoutEffect(() => {
    if (autoScrollBehavior === "none") return;
    const list = listRef.current;
    if (!list || !tabValueContext?.activeTab) return;
    const tab = list.querySelector<HTMLElement>(`[role="tab"][aria-selected="true"]`);
    if (!tab) return;
    tab.scrollIntoView({
      behavior: hasMountedRef.current ? "smooth" : "instant",
      inline: "center",
    });
    hasMountedRef.current = true;
  }, [
    tabValueContext?.activeTab,
    autoScrollBehavior,
  ]);

  return {
    listRef,
  };
}
