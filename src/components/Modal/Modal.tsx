import { createPortal } from "react-dom";
import { Background } from "../../UI/Background/Background";
import styles from "./Modal.module.scss";
import { Button } from "../../UI/Button/Button";
import clsx from "clsx";
import { ModalProps } from "./types";

export const Modal = ({
  children,
  onClose,
  modalTitle,
  classNames,
}: ModalProps) => {
  return createPortal(
    <div className={styles.container}>
      <Background />

      <span className={clsx(styles.panel, classNames)}>
        <h2>{modalTitle}</h2>
        <Button classNames={styles.close} label="X" onClick={onClose} />
        {children}
      </span>
    </div>,
    document.getElementById("modal") as HTMLElement
  );
};
