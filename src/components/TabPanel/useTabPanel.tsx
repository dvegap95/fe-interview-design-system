import { useActiveTabContext } from "@/context/activeTabContext";
import { MISSING_CONTEXT_ERROR } from "./constants";
import type { UseTabPanelProps } from "./types";

export default function useTabPanel({ value }: UseTabPanelProps) {
  const activeTabContext = useActiveTabContext();
  if (!activeTabContext) {
    throw MISSING_CONTEXT_ERROR;
  }

  const isSelected = Boolean(activeTabContext.activeTab && activeTabContext.activeTab === value);

  return {
    isSelected,
  };
}
