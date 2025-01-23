import { Formulario } from "./components/Formulario";
import { FormularioFCC } from "./components/FormularioFCC";
import { FormularioSeleccion } from "./components/FormularioSeleccion";
import { FormularioTutorial } from "./components/FormularioTutorial";
import "./index.css";
import { useState } from "react";

const App = () => {
  const [selection, setSelection] = useState("Youtube");
  console.log(selection);
  return (
    <>
      <h1>Formularios en React con Formik y Yup</h1>
      <FormularioSeleccion setSelection={setSelection} />
      {selection === "Youtube" ? (
        <div className="container-form">
          <h2>Formulario tutorial Youtube</h2>
          <Formulario />
        </div>
      ) : selection === "FCC" ? (
        <div className="container-form">
          <h2>Formulario tutorial freeCodeCamp</h2>
          <FormularioFCC />
        </div>
      ) : (
        <div className="container-form">
          <h2>Formulario tutorial formik</h2>
          <FormularioTutorial />
        </div>
      )}
    </>
  );
};

export default App;
