export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label: string;
  type: string;
  name: string;
  placeholder: string;

}
