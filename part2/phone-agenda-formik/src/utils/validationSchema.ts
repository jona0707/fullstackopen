import * as yup from "yup";

export const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  number: yup.string().matches(/^[0-9]+$/, "Only numbers.").required("Number is required"),
});
