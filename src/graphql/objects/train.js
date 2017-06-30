// @flow

import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export default new GraphQLObjectType({
  name: "Train",
  fields: {
    trainidentifier: { type: new GraphQLNonNull(GraphQLString) },
    trainacronym: { type: new GraphQLNonNull(GraphQLString) },
    traintype: { type: new GraphQLNonNull(GraphQLString) },
    pricetype: { type: new GraphQLNonNull(GraphQLString) }
  }
});
