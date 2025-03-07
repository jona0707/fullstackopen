export interface BlogProps {
  user: string;
}

export interface Blog {
  title: string;
  author?: string;
  url: string;
  id?: string;
  likes?: number;
}

export interface CreateBlogProps {
  prevBlogs: Blog[];
  setBlogs: (prevBlogs: Blog[]) => void;
  setType: (type: string) => void;
  setMessage: (message: string) => void;
  onSubmit: () => void;
}

export interface BlogComponentProps {
  blog: Blog;
  setType: (type: string) => void;
  setMessage: (message: string) => void;
  updateBlogs: (updatedBlog: Blog) => void;
  deleteBlog: (id: string) => void;
}
