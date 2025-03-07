import { ReactNode } from "react";

interface TogglableProps {
  buttonLabel: ReactNode;
  children: ReactNode;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

export const Togglable = ({
  buttonLabel,
  children,
  visible,
  setVisible,
}: TogglableProps) => {
  const hidenWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hidenWhenVisible}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
};
