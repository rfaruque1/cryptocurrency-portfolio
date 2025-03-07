export interface InputProps {
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  classNames?: string;
  placeholder?: string;
  value?: string;
  type?: string;
  min?: number;
}
