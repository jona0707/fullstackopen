import * as yup from "yup";

export const validationSchemaTutorial = yup.object({
  firstName: yup
    .string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  lastName: yup
    .string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  email: yup.string().email("Invalid email address").required("Required"),
  acceptedTerms: yup
    .boolean()
    .required("Required")
    .oneOf([true], "You must accept the terms and conditions."),
  jobType: yup
    .string()
    .oneOf(["designer", "development", "product", "other"], "Invalid Job Type")
    .required("Required"),
});
