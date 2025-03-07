import { useEffect, useState } from "react";
import { getUsers } from "../services/blogsService";
import { Blog as BlogTypes, BlogProps } from "../types/blogs";
import { User } from "../types/users";
import { UserLog } from "./UserLog";
import { CreateBlog } from "./CreateBlog";
import { Notification } from "./Notification";
import { Blog } from "./Blog";
import { Togglable } from "./Togglable";

export const Blogs = ({ user }: BlogProps) => {
  const [blogs, setBlogs] = useState(null as BlogTypes[] | null);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [visible, setVisible] = useState(false);

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

  const updateBlog = (updatedBlog: BlogTypes) => {
    setBlogs(
      (prevBlogs) =>
        prevBlogs?.map((blog) =>
          blog.id === updatedBlog.id ? updatedBlog : blog
        ) ?? null
    );
  };

  const deleteBlog = (id: string) => {
    setBlogs(
      (prevBlogs) => prevBlogs?.filter((blog) => blog.id !== id) ?? null
    );
  };
  console.log(blogs);

  return (
    <>
      <h2>Blogs</h2>
      <Notification message={message} type={type} />
      <UserLog user={user} />

      {blogs && (
        <>
          <Togglable
            buttonLabel="Create Blog"
            visible={visible}
            setVisible={setVisible}
          >
            <CreateBlog
              prevBlogs={blogs}
              setBlogs={setBlogs}
              setType={setType}
              setMessage={setMessage}
              onSubmit={() => setVisible(false)}
            />
          </Togglable>
          {blogs
            .sort((a, b) => {
              const likesA = a.likes ?? 0;
              const likesB = b.likes ?? 0;
              return likesB - likesA;
            })
            .map((blog: BlogTypes) => (
              <Blog
                key={blog.id}
                blog={blog}
                setType={setType}
                setMessage={setMessage}
                updateBlogs={updateBlog}
                deleteBlog={deleteBlog}
              />
            ))}
        </>
      )}
    </>
  );
};
