import axios from "axios";
import { Blog } from "../types/blogs";
import { ErrorResponse } from "../types/error";

const baseUrl = "/api";

let token: string | null = null;

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

const getUsers = async () => {
  const { data } = await axios.get(`${baseUrl}/users`);
  return data;
};

const createBlog = async (newBlog: Blog) => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const { data } = await axios.post(`${baseUrl}/blogs`, newBlog, config);
    return data;
  } catch (error) {
    const err = error as ErrorResponse;
    if (err.response && err.response.data && err.response.data.error) {
      throw new Error(err.response.data.error);
    } else {
      throw new Error("Error creating blog");
    }
  }
};

export { getUsers, createBlog, setToken };
