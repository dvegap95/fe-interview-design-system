import { createContext, useContext } from "react";
import { SizeProvider, useResolvedSize } from "@/context/sizeContext";
import { TabVariantProvider, useResolvedTabVariant } from "@/context/tabVariantContext";
import { cn } from "@/lib/utils";
import styles from "./Tabs.module.scss";
import type {
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

export function useOptionalTabsContext() {
  return useContext(TabsContext);
}

export function TabsContextProvider(props: TabsContextProviderProps) {
  const contextValue = useTabsContextProvider(props);
  return <TabsContext.Provider value={contextValue}>{props.children}</TabsContext.Provider>;
}

export function Tabs({
  children,
  variant: variantProp,
  size: sizeProp,
  autoScrollBehavior = "smooth",
  ...props
}: TabsProps) {
  const { listRef } = useTabs({
    autoScrollBehavior,
  });
  const variant = useResolvedTabVariant(variantProp);
  const size = useResolvedSize(sizeProp);
  const className = cn(
    props.className,
    styles.tabs,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
  );
  return (
    <div
      role="tablist"
      {...props}
      className={className}
      ref={(node) => {
        listRef.current = node;
        if (typeof props.ref === "function") {
          props.ref(node);
        } else if (props.ref) {
          props.ref.current = node;
        }
      }}
    >
      <SizeProvider size={size}>
        <TabVariantProvider variant={variant}>{children}</TabVariantProvider>
      </SizeProvider>
    </div>
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
