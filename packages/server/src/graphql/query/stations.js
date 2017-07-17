// @flow

import { GraphQLList, GraphQLNonNull } from "graphql";
import moment from "moment";

import { StationType } from "../objects";
import type { Ctx } from "../index";

type Args = {
  from: string,
  to: string,
  date: moment
};

export default {
  type: new GraphQLNonNull(new GraphQLList(StationType)),
  resolve(source: mixed, args: Args, ctx: Ctx): StationObject[] {
    return ctx.trenitalia.getStations();
  }
};
