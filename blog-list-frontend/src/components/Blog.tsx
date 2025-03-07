import { useState } from "react";
import { deleteBlog, updateLikes } from "../services/blogsService";
import { BlogComponentProps } from "../types/blogs";

export const Blog = ({
  blog,
  setType,
  setMessage,
  updateBlogs,
  deleteBlog: delBlogList,
}: BlogComponentProps) => {
  const [currentBlog, setCurrentBlog] = useState(blog);
  const [isOppened, setIsOppened] = useState(false);
  const handlToggle = () => setIsOppened(!isOppened);

  const handleLike = async () => {
    try {
      const updatedBlog = {
        ...currentBlog,
        likes: (currentBlog.likes ?? 0) + 1,
      };
      const response = await updateLikes(updatedBlog);
      setCurrentBlog(response);
      updateBlogs(response);
    } catch (error) {
      setType("error");
      setMessage(`${error}`);
    }
  };

  const handleDelete = async () => {
    try {
      if (window.confirm(`Do you want to delete blog: ${currentBlog.title}?`)) {
        const response = await deleteBlog(currentBlog.id ?? "");
        delBlogList(response);
        setType("success");
        setMessage("Blog deleted");
      }
    } catch (error) {
      setType("error");
      setMessage(`${error}`);
    }
  };

  return (
    <div
      style={{
        border: "1px solid black",
        padding: 5,
        marginBottom: 5,
      }}
      className="blog"
    >
      <div style={{ display: "flex", gap: 5 }} className="blog-header">
        <div className="blog-title">{currentBlog.title}</div>
        <div>
          <strong>author:</strong> {currentBlog.author}
        </div>
        <button onClick={handlToggle}>{isOppened ? "hide" : "view"}</button>
      </div>
      {isOppened && (
        <div className="blog-details">
          <div>
            <strong>url:</strong> {currentBlog.url}
          </div>
          <div>
            <strong>likes:</strong> {currentBlog.likes}{" "}
            <button onClick={handleLike} className="likeButton">
              like
            </button>
          </div>
          <div>
            <button onClick={handleDelete}>remove</button>
          </div>
        </div>
      )}
    </div>
  );
};
