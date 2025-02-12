import { useEffect, useState } from "react";
import { getUsers } from "../services/blogsService";
import { Blog, BlogProps } from "../types/blogs";
import { User } from "../types/users";
import { UserLog } from "./UserLog";
import { CreateBlog } from "./CreateBlog";
import { Notification } from "./Notification";

export const Blogs = ({ user }: BlogProps) => {
  const [blogs, setBlogs] = useState(null as Blog[] | null);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    const searchUser = async () => {
      const users = await getUsers();
      const userLog = users.find((u: User) => u.username === user);
      setBlogs(userLog.blogs);
    };
    searchUser();
    setType("success");
    setMessage(`Welcome ${user}`);
  }, [user]);

  useEffect(() => {
    if (message && type) {
      const timer = setTimeout(() => {
        setMessage("");
        setType("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message, type]);

  return (
    <>
      <h2>Blogs</h2>
      <Notification message={message} type={type} />
      <UserLog user={user} />

      {blogs && (
        <>
          <CreateBlog
            prevBlogs={blogs}
            setBlogs={setBlogs}
            setType={setType}
            setMessage={setMessage}
          />
          {blogs.map(({ title, id }: Blog) => (
            <div key={id}>{title}</div>
          ))}
        </>
      )}
    </>
  );
};
