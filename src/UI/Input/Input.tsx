import clsx from "clsx";
import styles from "./Input.module.scss";
import { useEffect, useState } from "react";
import { InputProps } from "./types";

export const Input = ({
  placeholder,
  onChange,
  onBlur,
  onFocus,
  classNames,
  value,
  type,
  min,
}: InputProps) => {
  const [currentValue, setCurrentValue] = useState(value);

  const handleOnChange = (value: string) => {
    setCurrentValue(value);
    onChange(value);
  };

  useEffect(() => {
    if (value) {
      setCurrentValue(value);
    }
  }, [value]);

  return (
    <input
      className={clsx(styles.container, classNames)}
      placeholder={placeholder}
      onChange={({ target: { value } }) => handleOnChange(value)}
      onFocus={onFocus}
      onBlur={onBlur}
      value={currentValue}
      type={type}
      min={min}
    />
  );
};
