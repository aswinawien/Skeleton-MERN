import React from "react";
import { hydrate } from "react-dom";
import HelloWorld from "./HelloWorld";
import App from "./App";

hydrate(<App />, document.getElementById("root"));
