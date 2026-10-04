import { ActiveTabContextProvider } from "@/context/activeTabContext";
import { SizeProvider, useResolvedSize } from "@/context/sizeContext";
import { TabVariantProvider, useResolvedTabVariant } from "@/context/tabVariantContext";
import cn from "@/utils/cn";
import styles from "./Tabs.module.scss";
import type { ManagedTabsProps, TabsProps } from "./types";

import { useTabs } from "./useTabs";

/** Visual tab list (`role="tablist"`). Does not own selection state. */
export function Tabs({
  children,
  variant: variantProp,
  size: sizeProp,
  autoScrollBehavior = "none",
  orientation = "horizontal",
  ...props
}: TabsProps) {
  const { listRef, handleKeyDown } = useTabs({
    autoScrollBehavior,
    orientation,
  });
  const variant = useResolvedTabVariant(variantProp);
  const size = useResolvedSize(sizeProp);
  return (
    <div
      role="tablist"
      aria-orientation={orientation}
      {...props}
      className={cn(styles.tabs, props.className)}
      data-variant={variant}
      data-size={size}
      onKeyDown={(event) => {
        handleKeyDown(event);
        props.onKeyDown?.(event);
      }}
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

/** `ActiveTabContextProvider` + `Tabs` for selection and visuals together. */
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
