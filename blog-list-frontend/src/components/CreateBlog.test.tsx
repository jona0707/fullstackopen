import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { CreateBlog } from "./CreateBlog";
import * as blogsService from "../services/blogsService";

vi.mock("../services/blogsService", () => ({
  createBlog: vi.fn(),
}));

test("create blog calls controller with correct props", async () => {
  const prevBlogs = [
    {
      title: "Test Blog",
      author: "Test Author",
      url: "http://testurl.com",
      likes: 5,
    },
    {
      title: "Second Blog",
      author: "Test Author",
      url: "http://testurl.com",
      likes: 5,
    },
  ];

  render(
    <CreateBlog
      prevBlogs={prevBlogs}
      setBlogs={vi.fn()}
      setType={vi.fn()}
      setMessage={vi.fn()}
      onSubmit={vi.fn()}
    />
  );

  const newBlog = {
    title: "New Blog",
    author: "New Author",
    url: "http://newurl.com",
    likes: 0,
  };

  const user = userEvent.setup();

  // Completo el form
  await user.type(screen.getByPlaceholderText("Title"), newBlog.title);
  await user.type(screen.getByPlaceholderText("Author"), newBlog.author);
  await user.type(screen.getByPlaceholderText("Url"), newBlog.url);

  // Envío
  await user.click(screen.getByText("Create"));
  expect(blogsService.createBlog).toHaveBeenCalledWith(newBlog);
});
