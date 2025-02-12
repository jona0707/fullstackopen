import { useEffect, useState } from "react";
import { Login } from "./components/Login";
import { Blogs } from "./components/Blogs";
import { setToken } from "./services/blogsService";

const App = () => {
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setToken(user.token);
      setUser(user.username);
    }
  }, []);

  const [user, setUser] = useState(null as string | null);

  return (
    <>
      <h1>Log in to application</h1>
      {user ? <Blogs user={user} /> : <Login setUser={setUser} />}
    </>
  );
};

export default App;
