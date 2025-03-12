import { createRoot } from "react-dom/client";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { reducer } from "./reducers/anecdoteReducer";
import App from "./App.tsx";

const store = createStore(reducer);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
