import { AddFormProps } from "../types/AddFormTypes";
import { Formik, Form, FormikHelpers, Field, ErrorMessage } from "formik";
import { PersonFormType } from "../types/PersonType";
import { useState } from "react";
import { validationSchema } from "../utils/validationSchema";

export const AddForm = ({ addPerson }: AddFormProps) => {
  const [initialValues, setInitialValues] = useState({
    name: "",
    number: "",
  });
  const handleSubmit = (
    values: PersonFormType,
    { resetForm }: FormikHelpers<PersonFormType>
  ) => {
    addPerson(values.name, values.number);
    resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {() => (
        <Form>
          <div>
            name: <Field name="name" type="text" />
            <ErrorMessage name="name" component="div" className="error"/>
          </div>
          <div>
            number: <Field name="number" type="text" />
            <ErrorMessage name="number" component="div" className="error"/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
