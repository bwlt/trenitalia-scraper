// @flow

import microCors from "micro-cors";

import "./error-handler";
import graphql from "./graphql";

export default microCors()(graphql);
