export const Notification = ({
  message,
  type,
}: {
  message: string | null;
  type: string | null;
}) => {
  const successStyle = {
    color: "green",
    backgroundColor: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  const errorStyle = {
    color: "red",
    backgroundColor: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (type === "success") {
    return <div style={successStyle}>{message}</div>;
  } else if (type === "error") {
    return <div style={errorStyle}>{message}</div>;
  } else {
    return null;
  }
};
