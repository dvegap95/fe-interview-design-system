import { cn } from "@/lib/utils";
import styles from "./Badge.module.scss";
import type { BadgeProps } from "./types";

export default function Badge({
  children,
  variant = "neutral",
  size = "sm",
  ...props
}: BadgeProps) {
  const className = cn(
    props.className,
    styles.badge,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
  );
  return (
    <div
      {...props}
      className={className}
    >
      {children}
    </div>
  );
}
