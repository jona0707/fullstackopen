import axios from "axios";
import { Credentials } from "../types/users";
import { ErrorResponse } from "../types/error";

const baseUrl = "/api";

const logIn = async (credentials: Credentials) => {
  try {
    const { data } = await axios.post(`${baseUrl}/login`, credentials);
    return data;
  } catch (error) {
    const err = error as ErrorResponse;
    if (err.response && err.response.data && err.response.data.error) {
      throw new Error(err.response.data.error);
    } else {
      throw new Error("Error logging in");
    }
  }
};

export { logIn };
