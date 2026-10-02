import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useOptionalTabsContext } from "./Tabs";
import type {
  TabListContextType,
  TabsContextType,
  UseTabsContextProviderProps,
  UseTabsProps,
  UseTabsWithContextProps,
} from "./types";

export function useTabsContextProvider(props: UseTabsContextProviderProps): TabsContextType {
  const [activeTab, setActiveTab] = useState(props.defaultActiveTab ?? "");
  const contextValue = useMemo(
    () => ({
      activeTab: props.activeTab ?? activeTab ?? "",
      setActiveTab: props.onActiveTabChange ?? setActiveTab,
    }),
    [
      props.activeTab,
      props.onActiveTabChange,
      activeTab,
    ],
  );

  return contextValue;
}

export function useTabs({ variant, size, autoScrollBehavior }: UseTabsProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const hasMountedRef = useRef(false);
  const tabsContext = useOptionalTabsContext();

  useLayoutEffect(() => {
    if(autoScrollBehavior === "none") return;
    const list = listRef.current;
    if (!list || !tabsContext?.activeTab) return;
    const tab = list.querySelector<HTMLElement>(`[role="tab"][aria-selected="true"]`);
    if (!tab) return;
    tab.scrollIntoView({
      behavior: hasMountedRef.current ? "smooth" : "instant",
      inline: "center",
    });
    hasMountedRef.current = true;
  }, [tabsContext?.activeTab, autoScrollBehavior]);

  const tabListContext = useMemo<TabListContextType>(
    () => ({
      variant,
      size,
    }),
    [
      variant,
      size,
    ],
  );
  return {
    tabListContext,
    listRef,
  };
}

export default function useTabsWithContext(_props: UseTabsWithContextProps = {}) {
  return {};
}
