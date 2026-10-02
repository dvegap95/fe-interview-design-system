import { useCallback, useEffect } from "react";
import { useOptionalTabsContext } from "@/components/Tabs";
import { CONFLICT_WARNING } from "./constants";
import type { UseTabProps } from "./types";

export default function useTab({ selected = false, value }: UseTabProps) {
  const tabsContext = useOptionalTabsContext();
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

  return {
    isSelected,
    handleClick,
  };
}
