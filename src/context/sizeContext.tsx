import { createContext, type ReactNode, useContext, useMemo } from "react";

export type Size = "sm" | "md";

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
export const useSizeContext = () => {
  return useContext(SizeContext);
};

export function useResolvedSize(size?: Size): Size {
  const inherited = useSizeContext()?.size;
  return size ?? inherited ?? DEFAULT_SIZE;
}

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
