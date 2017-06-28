// @flow

import { GraphQLObjectType, GraphQLString } from "graphql";

export default new GraphQLObjectType({
  name: "Query",
  fields: {
    greet: {
      type: GraphQLString,
      resolve: () => null
    }
  }
});
