export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id?: string;
  label: string;
  name: string;
  children: React.ReactNode;
}
