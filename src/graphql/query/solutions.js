// @flow

import {
  GraphQLList,
  GraphQLNonNull,
} from 'graphql'
import moment from 'moment'

import { SolutionType } from '../objects'
import { DateType, StationType } from '../scalars'
import type { Ctx } from '../index'


type Args = {
  from: string,
  to:   string,
  date: moment,
}

export default {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(SolutionType))),
  args: {
    from: { type: new GraphQLNonNull(StationType) },
    to:   { type: new GraphQLNonNull(StationType) },
    date: { type: new GraphQLNonNull(DateType) },
  },
  resolve(source: mixed, args: Args, ctx: Ctx): Promise<SolutionObject[]> {
    return ctx.trenitalia.search({
      from: args.from,
      to:   args.to,
      date: args.date,
    })
  }
}
