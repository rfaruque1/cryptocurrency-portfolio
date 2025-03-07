import { ReactNode } from "react";

export interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  modalTitle?: string;
  classNames?: string;
}
