import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { validationSchemaFCC } from "../utils/validationSchemaFCC";
import { FormularioFCCTypes } from "../types/FormularioFCCTypes";
import { useState } from "react";

export const FormularioFCC = () => {
  // Sin uso de formularioEnviado (estado local) sino con la prop setSubmitting
  //   const [formularioEnviado, setFormularioEnviado] = useState(false);

  const [initialValues, setinitialValues] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleSubmit = (
    valores: FormularioFCCTypes,
    { resetForm, setSubmitting }: FormikHelpers<FormularioFCCTypes>
  ) => {
    setTimeout(() => {
      console.log(valores);
      alert(JSON.stringify(valores, null, 2));
      setSubmitting(false);
    }, 40);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchemaFCC}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="formulario">
          <div>
            <label htmlFor="nombre">Nombre</label>
            <Field
              type="text"
              name="fullname"
              placeholder="Ingresa tu nombre completo"
            />
            <ErrorMessage name="fullname" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="email">Correo</label>
            <Field
              id="email"
              type="text"
              name="email"
              placeholder="Ingresa tu dirección de correo"
            />
            <ErrorMessage name="email" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="password">Contraseña</label>
            <Field
              type="password"
              name="password"
              placeholder="Ingresa tu contraseña (mínimo 6 caracteres)"
            />
            <ErrorMessage name="password" component="div" className="error" />
          </div>

          <button type="submit" disabled={isSubmitting}>
            Enviar
          </button>
          {isSubmitting && (
            <p className="exito">¡Formulario enviado con éxito!</p>
          )}
        </Form>
      )}
    </Formik>
  );
};
