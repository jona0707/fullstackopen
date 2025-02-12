export const UserLog = ({ user }: { user: string }) => {
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    window.location.reload();
  };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
      <div>{user} logged in.</div>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};
