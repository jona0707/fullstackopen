import { Field, Form, Formik } from "formik";
import { Blog, CreateBlogProps } from "../types/blogs";
import { createBlog } from "../services/blogsService";

export const CreateBlog = ({
  prevBlogs,
  setBlogs,
  setType,
  setMessage,
}: CreateBlogProps) => {
  const initialValues = {
    title: "",
    author: "",
    url: "",
  };

  const handleOnSubmit = async (values: Blog) => {
    try {
      const response = await createBlog(values);
      setBlogs([...prevBlogs, response]);
      setType("success");
      if (response.title && response.author)
        setMessage(
          `A new blog "${response.title}" by ${response.author} added.`
        );
      if (response.title && !response.author)
        setMessage(`A new blog "${response.title}" added.`);
    } catch (error) {
      setType("error");
      setMessage(`${error}`);
    }
  };

  return (
    <>
      <h2>Create new</h2>
      <Formik initialValues={initialValues} onSubmit={handleOnSubmit}>
        {() => (
          <Form>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <div>
                <label htmlFor="title">Title: </label>
                <Field type="text" name="title" placeholder="Title" />
              </div>
              <div>
                <label htmlFor="author">Author: </label>
                <Field type="text" name="author" placeholder="Author" />
              </div>
              <div>
                <label htmlFor="url">Url: </label>
                <Field type="text" name="url" placeholder="Url" />
              </div>
            </div>
            <button type="submit">Create</button>
          </Form>
        )}
      </Formik>
    </>
  );
};
