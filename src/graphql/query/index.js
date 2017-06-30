// @flow

import { GraphQLObjectType } from "graphql";

import solutions from "./solutions";
import stations from "./stations";

export default new GraphQLObjectType({
  name: "Query",
  fields: {
    solutions,
    stations
  }
});
