import { createContext, useContext } from "react";
import { cn } from "@/lib/utils";
import styles from "./Tabs.module.scss";
import type {
  TabListContextType,
  TabsContextProviderProps,
  TabsContextType,
  TabsProps,
  TabsWithContextProps,
} from "./types";
import { useTabs, useTabsContextProvider } from "./useTabs";

export const TabsContext = createContext<TabsContextType>({
  activeTab: "",
  setActiveTab: () => {},
});

export const TabListContext = createContext<TabListContextType>({
  variant: "pill",
  size: "md",
});

export function useOptionalTabsContext() {
  return useContext(TabsContext);
}

export function useOptionalTabListContext() {
  return useContext(TabListContext);
}

export function TabsContextProvider(props: TabsContextProviderProps) {
  const contextValue = useTabsContextProvider(props);
  return <TabsContext.Provider value={contextValue}>{props.children}</TabsContext.Provider>;
}

export function Tabs({ children, variant, size, ...props }: TabsProps) {
  const { tabListContext } = useTabs({
    variant,
    size,
  });
  const className = cn(
    props.className,
    styles.tabs,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
  );
  return (
    <TabListContext.Provider value={tabListContext}>
      <div
        role="tablist"
        {...props}
        className={className}
      >
        {children}
      </div>
    </TabListContext.Provider>
  );
}

export function TabsWithContext({
  activeTab,
  onActiveTabChange,
  defaultActiveTab,
  children,
  ...props
}: TabsWithContextProps) {
  return (
    <TabsContextProvider
      activeTab={activeTab}
      onActiveTabChange={onActiveTabChange}
      defaultActiveTab={defaultActiveTab}
    >
      <Tabs {...props}>{children}</Tabs>
    </TabsContextProvider>
  );
}
