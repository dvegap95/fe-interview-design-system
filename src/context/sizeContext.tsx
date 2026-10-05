import { createContext, type ReactNode, useContext, useMemo } from "react";

export type Size = "sm" | "md"; // sm => Mobile: ON; md => Mobile: OFF

export type SizeContextType = {
  size: Size;
};

export type SizeContextProviderProps = {
  size: Size;
  children: ReactNode;
};

export const DEFAULT_SIZE: Size = "md";

export const SizeContext = createContext<SizeContextType>({
  size: DEFAULT_SIZE,
});

/** Reads the nearest size context value. */
export const useSizeContext = () => {
  return useContext(SizeContext);
};

/** Resolves size from prop, then context, then the default (`md`). */
export function useResolvedSize(size?: Size): Size {
  const inherited = useSizeContext()?.size;
  return size ?? inherited ?? DEFAULT_SIZE;
}

/** Provides a size token to descendants (e.g. nested badges). */
export function SizeProvider({ size, children }: SizeContextProviderProps) {
  const value = useMemo(
    () => ({
      size,
    }),
    [
      size,
    ],
  );
  return <SizeContext.Provider value={value}>{children}</SizeContext.Provider>;
}
