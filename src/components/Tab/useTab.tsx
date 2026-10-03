import { useCallback, useEffect } from "react";
import { useActiveTabContext } from "@/context/activeTabContext";
import { CONFLICT_WARNING } from "./constants";
import type { UseTabProps } from "./types";

export default function useTab({ selected = false, value }: UseTabProps) {
  const activeTabContext = useActiveTabContext();
  const isSelected = Boolean(
    selected || (activeTabContext?.activeTab && activeTabContext?.activeTab === value),
  );
  const handleClick = useCallback(() => {
    if (!value) return;
    activeTabContext?.setActiveTab?.(value);
  }, [
    activeTabContext?.setActiveTab,
    value,
  ]);

  useEffect(() => {
    if (selected && activeTabContext?.activeTab) {
      console.warn(CONFLICT_WARNING);
    }
  }, [
    selected,
    activeTabContext?.activeTab,
  ]);

  const isOutsideActiveTabContext = activeTabContext == null;
  const hasActiveTab = Boolean(activeTabContext?.activeTab);
  const belongsInTabOrder = isOutsideActiveTabContext || isSelected || !hasActiveTab;
  const tabIndex = belongsInTabOrder ? 0 : -1;

  return {
    isSelected,
    handleClick,
    tabIndex,
  };
}
