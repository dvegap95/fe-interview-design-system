import { createContext, type ReactNode, useContext, useMemo } from "react";

export type TabVariant = "pill" | "underline";

export type TabVariantContextType = {
  variant: TabVariant;
};

export type TabVariantProviderProps = {
  variant: TabVariant;
  children: ReactNode;
};

export const DEFAULT_TAB_VARIANT: TabVariant = "pill";

export const TabVariantContext = createContext<TabVariantContextType>({
  variant: DEFAULT_TAB_VARIANT,
});

/** Reads the nearest tab variant context value. */
export const useTabVariantContext = () => {
  return useContext(TabVariantContext);
};

/** Resolves variant from prop, then context, then the default (`pill`). */
export function useResolvedTabVariant(variant?: TabVariant): TabVariant {
  const inherited = useTabVariantContext()?.variant;
  return variant ?? inherited ?? DEFAULT_TAB_VARIANT;
}

/** Provides a tab variant token to descendants. */
export function TabVariantProvider({ variant, children }: TabVariantProviderProps) {
  const value = useMemo(
    () => ({
      variant,
    }),
    [
      variant,
    ],
  );
  return <TabVariantContext.Provider value={value}>{children}</TabVariantContext.Provider>;
}
