import { Field, Form, Formik } from "formik";
import { FormularioSeleccionProps } from "../types/FormularioSeleccionTypes";
import { useState } from "react";

export const FormularioSeleccion = ({
  setSelection,
}: FormularioSeleccionProps) => {
  const [initialValues, setInitialValues] = useState({ selection: "" });
  const handleSubmit = (sel: { selection: string }) => setSelection(sel.selection);

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({}) => (
        <Form>
          <div className="selection">
            <label htmlFor="selection">Selecciona un formulario:</label>
            <div>
              <Field
                id="selection"
                name="selection"
                type="radio"
                value="Youtube"
              />{" "}
              Youtube
            </div>
            <div>
              <Field id="selection" name="selection" type="radio" value="FCC" />{" "}
              freeCodeCamp
            </div>
            <div>
              <Field
                id="selection"
                name="selection"
                type="radio"
                value="formik"
              />{" "}
              formik
            </div>
          </div>
          <button id="selection-btn" type="submit">
            Seleccionar
          </button>
        </Form>
      )}
    </Formik>
  );
};
