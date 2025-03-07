import clsx from "clsx";
import styles from "./Panel.module.scss";
import { PanelProps } from "./types";

//for common consistent panels
export const Panel = ({ children, classNames }: PanelProps) => {
  return <div className={clsx(styles.container, classNames)}>{children}</div>;
};
