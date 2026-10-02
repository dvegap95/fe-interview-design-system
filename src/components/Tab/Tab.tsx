import { TabProps } from "./types";
import useTab from "./useTab";
import { cn } from "@/lib/utils";

import styles from './Tab.module.scss';

export default function Tab(
    { children, variant = 'pill', selected = false, size = 'md', id, value, ...props }: TabProps
) {
    const { isSelected, handleClick } = useTab({ variant, selected, value });
    const className = cn(props.className, styles.tab, styles[variant], isSelected && styles.selected, styles[`size-${size}`]);
    return <button role="tab" tabIndex={0} id={id} aria-selected={isSelected ? 'true' : 'false'} onClick={handleClick} {...props} className={className}>{children}</button>;
};