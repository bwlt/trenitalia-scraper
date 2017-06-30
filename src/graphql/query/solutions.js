// @flow

import { GraphQLInt, GraphQLList, GraphQLNonNull } from "graphql";
import moment from "moment";

import { SolutionType } from "../objects";
import { DateType, StationType, TimeHourType } from "../scalars";
import type { Ctx } from "../index";

type Args = {
  origin: string,
  destination: string,
  date: moment,
  time: moment,
  limit?: ?number,
  offset?: ?number
};

export default {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(SolutionType))),
  description: "Search travel solutions",
  args: {
    origin: { type: new GraphQLNonNull(StationType) },
    destination: { type: new GraphQLNonNull(StationType) },
    date: { type: new GraphQLNonNull(DateType) },
    time: { type: new GraphQLNonNull(TimeHourType) },
    limit: { type: GraphQLInt },
    offset: { type: GraphQLInt }
  },
  resolve(source: mixed, args: Args, ctx: Ctx): Promise<SolutionObject[]> {
    const parameters = {};
    parameters.origin = args.origin;
    parameters.destination = args.destination;
    parameters.time = args.time;
    parameters.date = args.date;
    if (args.limit) parameters.limit = args.limit;
    if (args.offset) parameters.offset = args.offset;

    return ctx.trenitalia.search(parameters);
  }
};
