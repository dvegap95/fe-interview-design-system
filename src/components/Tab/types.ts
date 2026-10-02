import type { ComponentPropsWithRef } from "react";
import type { BaseComponentProps } from "@/types/baseComponentTypes";

export type TabProps = ComponentPropsWithRef<"button"> & BaseComponentProps & {
  variant?: "pill" | "underline";
  selected?: boolean;
  size?: "sm" | "md"; // sm = mobile:True
  value?: string;
  slots?: {
    end?: React.ReactNode;
  };
};

export type UseTabProps = Omit<TabProps, "children">;
