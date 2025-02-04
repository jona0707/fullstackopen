import * as yup from "yup";

export const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  number: yup.string().required("Number is required"),
});
