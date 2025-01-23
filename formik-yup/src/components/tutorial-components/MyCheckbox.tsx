import { useField } from "formik";
import { CheckBoxProps } from "../../types/CheckBox";

export const MyCheckbox = ({ children, ...props }: CheckBoxProps) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <div>
      <label>
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};