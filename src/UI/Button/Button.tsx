import styles from "./Button.module.scss";
import clsx from "clsx";
import { ButtonProps } from "./types";

export const Button = ({
  onClick,
  label,
  classNames,
  disabled,
}: ButtonProps) => {
  return (
    <button
      className={clsx(styles.button, classNames)}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
