import { ActiveTabContextProvider } from "@/context/activeTabContext";
import { SizeProvider, useResolvedSize } from "@/context/sizeContext";
import { TabVariantProvider, useResolvedTabVariant } from "@/context/tabVariantContext";
import { cn } from "@/lib/utils";
import styles from "./Tabs.module.scss";
import type { ManagedTabsProps, TabsProps } from "./types";

import { useTabs } from "./useTabs";

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

export function ManagedTabs({
  activeTab,
  onActiveTabChange,
  defaultActiveTab,
  children,
  ...props
}: ManagedTabsProps) {
  return (
    <ActiveTabContextProvider
      activeTab={activeTab}
      onActiveTabChange={onActiveTabChange}
      defaultActiveTab={defaultActiveTab}
    >
      <Tabs {...props}>{children}</Tabs>
    </ActiveTabContextProvider>
  );
}
