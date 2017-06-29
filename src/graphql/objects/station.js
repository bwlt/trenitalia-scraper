// @flow

import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export default new GraphQLObjectType({
  name: "StationType",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) }
  }
});
