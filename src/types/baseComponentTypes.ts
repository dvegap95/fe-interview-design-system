import type { ReactNode } from "react";

export type BaseComponentProps = {
  children?: ReactNode;
  id?: string;
  /** Extra class names merged onto the root element. */
  className?: string;
};
