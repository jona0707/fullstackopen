import { Form, Formik, FormikHelpers } from "formik";
import { validationSchemaTutorial } from "../utils/validationSchemaTutorial";
import { MyTextInput } from "./tutorial-components/MyTextInput";
import { MySelect } from "./tutorial-components/MySelect";
import { MyCheckbox } from "./tutorial-components/MyCheckbox";
import { useState } from "react";
import { FormularioTutorialTypes } from "../types/FormularioTutorialTypes";

export const FormularioTutorial = () => {
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    acceptedTerms: false,
    jobType: "",
  });

  const handleSubmit = (
    values: FormularioTutorialTypes,
    { setSubmitting }: FormikHelpers<FormularioTutorialTypes>
  ) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  return (
    <>
      <h3>Subscribe!</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchemaTutorial}
        onSubmit={handleSubmit}
      >
        <Form className="formulario">
          <MyTextInput
            label="First Name"
            name="firstName"
            type="text"
            placeholder="Jane"
          />

          <MyTextInput
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Doe"
          />

          <MyTextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="jane@formik.com"
          />

          <MySelect label="Job Type" name="jobType">
            <option value="">Select a job type</option>
            <option value="designer">Designer</option>
            <option value="development">Developer</option>
            <option value="product">Product Manager</option>
            <option value="other">Other</option>
          </MySelect>

          <div className="checkbox-form-tuto">
            <MyCheckbox name="acceptedTerms">
              I accept the terms and conditions
            </MyCheckbox>
          </div>

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
};
