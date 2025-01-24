export interface CheckBoxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  name: string;
  value?: string;
  children?: React.ReactNode;
}
