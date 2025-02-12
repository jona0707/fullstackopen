import { Field, Form, Formik } from "formik";
import { logIn } from "../services/usersService";
import { Credentials } from "../types/users";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { setToken } from "../services/blogsService";
import { Notification } from "./Notification";

export const Login = ({
  setUser,
}: {
  setUser: Dispatch<SetStateAction<string | null>>;
}) => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const initialValues = {
    username: "",
    password: "",
  };
  const handleSubmit = async (values: Credentials) => {
    try {
      const userRecover = await logIn(values);
      const { username } = userRecover;
      window.localStorage.setItem(
        "loggedBlogAppUser",
        JSON.stringify(userRecover)
      );
      setToken(userRecover.token);
      setUser(username);
    } catch (error) {
      setType("error");
      setMessage(`${error}`);
    }
  };

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
      <Notification message={message} type={type} />
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {() => (
          <Form>
            <div>
              <label htmlFor="username">Name: </label>
              <Field
                type="text"
                name="username"
                placeholder="Ingresa tu nombre completo"
              />
            </div>
            <div>
              <label htmlFor="password">Password: </label>
              <Field
                name="password"
                type="password"
                placeholder="Ingresa tu contraseña"
              />
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
