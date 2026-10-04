import { useResolvedSize } from "@/context/sizeContext";
import cn from "@/utils/cn";
import styles from "./Badge.module.scss";
import type { BadgeProps } from "./types";

/** Compact status or count label; often composed into `Tab` via `slots.end`. */
export default function Badge({
  children,
  variant = "neutral",
  size: sizeProp,
  ...props
}: BadgeProps) {
  const size = useResolvedSize(sizeProp);
  return (
    <span
      {...props}
      data-variant={variant}
      data-size={size}
      className={cn(styles.badge, props.className)}
    >
      {children}
    </span>
  );
}
