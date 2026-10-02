import { useCallback, useEffect } from "react";
import { useOptionalTabListContext, useOptionalTabsContext } from "@/components/Tabs";
import { CONFLICT_WARNING } from "./constants";
import type { UseTabProps } from "./types";

export default function useTab({ selected = false, value, variant, size }: UseTabProps) {
  const tabsContext = useOptionalTabsContext();
  const tabListContext = useOptionalTabListContext();
  const isSelected = Boolean(
    selected || (tabsContext?.activeTab && tabsContext?.activeTab === value),
  );
  const handleClick = useCallback(() => {
    if (!value) return;
    tabsContext?.setActiveTab(value);
  }, [
    tabsContext?.setActiveTab,
    value,
  ]);

  useEffect(() => {
    if (selected && tabsContext?.activeTab) {
      console.warn(CONFLICT_WARNING);
    }
  }, [
    selected,
    tabsContext?.activeTab,
  ]);

  const computedVariant = variant ?? tabListContext?.variant ?? "pill";
  const computedSize = size ?? tabListContext?.size ?? "md";

  return {
    isSelected,
    handleClick,
    computedVariant,
    computedSize,
  };
}
