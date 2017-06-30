// @flow

import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from "graphql";

import { StationType } from "../scalars";
import TrainType from "./train";

export default new GraphQLObjectType({
  name: "Solution",
  fields: {
    idsolution: { type: new GraphQLNonNull(GraphQLID) },
    origin: { type: new GraphQLNonNull(StationType) },
    destination: { type: new GraphQLNonNull(StationType) },
    direction: { type: new GraphQLNonNull(GraphQLString) },
    departuretime: { type: new GraphQLNonNull(GraphQLString) },
    arrivaltime: { type: new GraphQLNonNull(GraphQLString) },
    minprice: { type: new GraphQLNonNull(GraphQLFloat) },
    // optionaltext: null,
    duration: { type: new GraphQLNonNull(GraphQLString) },
    changesno: { type: new GraphQLNonNull(GraphQLInt) },
    trainlist: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(TrainType)))
    },
    bookable: { type: new GraphQLNonNull(GraphQLBoolean) },
    saleable: { type: new GraphQLNonNull(GraphQLBoolean) },
    onlycustom: { type: new GraphQLNonNull(GraphQLBoolean) },
    // extraInfo: [],
    showSeat: { type: new GraphQLNonNull(GraphQLBoolean) }
  }
});
