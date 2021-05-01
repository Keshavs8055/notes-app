import { createStore } from "redux";
import { rootReducer } from "./rootReducer";

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__({
      trace: true,
      serialize: {
        options: {
          undefined: true,
          function: function (fn) {
            return fn.toString();
          },
        },
      },
    })
);
