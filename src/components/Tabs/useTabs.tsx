import { useMemo, useState } from "react";
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

export function useTabs({ variant, size }: UseTabsProps) {
  const tabListContext = useMemo<TabListContextType>(() => ({
    variant,
    size,
  }), [variant, size]);
  return {
    tabListContext,
  };
}

export default function useTabsWithContext(_props: UseTabsWithContextProps = {}) {
  return {};
}
