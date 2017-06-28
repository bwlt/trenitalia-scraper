// @flow

import { GraphQLObjectType } from "graphql";

import searchSolutions from "./search-solutions";

export default new GraphQLObjectType({
  name: "Mutation",
  fields: {
    searchSolutions
  }
});
