import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import registerServiceWorker from "./utils/registerServiceWorker";
import store from "./utils/store";
import App from "./App";

import "semantic-ui-css/semantic.min.css";
import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
