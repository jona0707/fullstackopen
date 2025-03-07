import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { Blog } from "./Blog";
import * as blogsService from "../services/blogsService";

// Mockeo las funciones de servicio:
vi.mock("../services/blogsService", () => ({
  updateLikes: vi.fn(),
  deleteBlog: vi.fn(),
}));

test("a blog shows title and author but not url or likes by default", () => {
  const blog = {
    title: "Test Blog",
    author: "Test Author",
    url: "http://testurl.com",
    likes: 5,
  };

  render(
    <Blog
      blog={blog}
      setType={vi.fn()}
      setMessage={vi.fn()}
      updateBlogs={vi.fn()}
      deleteBlog={vi.fn()}
    />
  );

  // Verificar que el título y el autor están presentes
  const title = screen.getByText("Test Blog");
  const author = screen.getByText("Test Author");
  expect(title).toBeDefined();
  expect(author).toBeDefined();

  // Verificar que la URL y los likes no están presentes por defecto
  const url = screen.queryByText("url: http://testurl.com");
  const likes = screen.queryByText("likes: 5");
  expect(url).toBeNull();
  expect(likes).toBeNull();
});

test("url and likes appears when press the button", async () => {
  const blog = {
    title: "Test Blog",
    author: "Test Author",
    url: "http://testurl.com",
    likes: 5,
  };

  render(
    <Blog
      blog={blog}
      setType={vi.fn()}
      setMessage={vi.fn()}
      updateBlogs={vi.fn()}
      deleteBlog={vi.fn()}
    />
  );

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  // Verificar que la URL y los likes se muestran luego de botón
  const url = screen.queryByText("http://testurl.com");
  const likes = screen.queryByText("5");
  expect(url).toBeDefined();
  expect(likes).toBeDefined();
});

test("press like two times calls service two times", async () => {
  const blog = {
    title: "Test Blog",
    author: "Test Author",
    url: "http://testurl.com",
    likes: 5,
  };

  const likeHandler = vi.fn();
  vi.mocked(blogsService.updateLikes).mockResolvedValue({
    ...blog,
    likes: blog.likes + 1,
  });

  const { container } = render(
    <Blog
      blog={blog}
      setType={vi.fn()}
      setMessage={vi.fn()}
      updateBlogs={likeHandler}
      deleteBlog={vi.fn()}
    />
  );

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  const buttonLike = container.querySelector(".likeButton");
  if (!buttonLike) {
    throw new Error("Button like not found");
  }
  await user.click(buttonLike);
  await user.click(buttonLike);

  expect(likeHandler.mock.calls).toHaveLength(2);
});
