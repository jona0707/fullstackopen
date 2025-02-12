export interface BlogProps {
  user: string;
}

export interface Blog {
  title: string;
  author?: string;
  url: string;
  id?: string;
}

export interface CreateBlogProps {
  prevBlogs: Blog[];
  setBlogs: (prevBlogs: Blog[]) => void;
  setType: (type: string) => void;
  setMessage: (message: string) => void;
}
