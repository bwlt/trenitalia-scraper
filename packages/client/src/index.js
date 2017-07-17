// @flow

import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";

import App from "./App";
import Provider from "./components/Provider";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Cannot find element #root");

rootEl.style.setProperty("height", "100%");

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  rootEl
);
registerServiceWorker();
