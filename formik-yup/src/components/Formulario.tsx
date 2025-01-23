import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchema } from "../utils/validationSchema";
import { useState } from "react";
import { FormularioTypes } from "../types/FormularioTypes";

export const Formulario = () => {
  const [formularioEnviado, setFormularioEnviado] = useState(false);

  return (
    <Formik
      initialValues={{
        nombre: "",
        correo: "",
        pais: "",
        sexo: "",
        mensaje: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(valores: FormularioTypes, { resetForm }) => {
        resetForm();
        console.log(valores);
        setFormularioEnviado(true);
        setTimeout(() => {
          setFormularioEnviado(false);
        }, 5000);
      }}
    >
      {() => (
        <Form className="formulario">
          <div>
            <label htmlFor="nombre">Nombre</label>
            <Field id="nombre" type="text" name="nombre" placeholder="Nombre" />
            <ErrorMessage name="nombre" component="div" className="error" />
            {/* 
            Lo mismo que:
            <ErrorMessage name="nombre" component={() => (
                <div className="error">{errors.nombre}</div>
            )} className="error" />
            Pero hay que usar la prop de errors.
            */}
          </div>
          <div>
            <label htmlFor="correo">Correo</label>
            <Field id="correo" type="text" name="correo" placeholder="Correo" />
            <ErrorMessage name="correo" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="pais">Pais</label>
            <Field id="correo" type="text" name="pais" as="select">
              <option value="Ecuador">Ecuador</option>
              <option value="Colombia">Colombia</option>
              <option value="Perú">Perú</option>
            </Field>
          </div>
          <div>
            <label>
              <Field id="rb-hombre" type="radio" name="sexo" value="hombre" />{" "}
              Hombre
            </label>
            <label>
              <Field id="rb-mujer" type="radio" name="sexo" value="mujer" />{" "}
              Mujer
            </label>
          </div>
          <div>
            <Field
              id="mensaje"
              name="mensaje"
              as="textarea"
              placeholder="Mensaje"
            />
          </div>
          <button type="submit">Enviar</button>
          {formularioEnviado && (
            <p className="exito">¡Formulario enviado con éxito!</p>
          )}
        </Form>
      )}
    </Formik>
  );
};
