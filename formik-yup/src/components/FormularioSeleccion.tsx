import { Field, Form, Formik } from "formik";
import { FormularioSeleccionProps } from "../types/FormularioSeleccionTypes";

export const FormularioSeleccion = ({
  setSelection,
}: FormularioSeleccionProps) => {
  return (
    <Formik
      initialValues={{ selection: "" }}
      onSubmit={(sel) => setSelection(sel.selection)}
    >
      {({}) => (
        <Form>
          <div className="selection">
            <label htmlFor="selection">Selecciona un formulario:</label>
            <div>
              <Field id="selection" name="selection" type="radio" value="Youtube"/>{" "}
              Youtube
            </div>
            <div>
              <Field id="selection" name="selection" type="radio" value="FCC" />{" "}
              freeCodeCamp
            </div>
            <div>
              <Field id="selection" name="selection" type="radio" value="formik" />{" "}
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
