// @flow

import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql'
import moment from 'moment'

import { DateType, StationType } from '../scalars'
import type { Ctx } from '../index'


type Args = {
  from: string,
  to:   string,
  date: moment,
}

export default {
  type: new GraphQLList(new GraphQLNonNull(GraphQLString)),
  args: {
    from: { type: new GraphQLNonNull(StationType) },
    to:   { type: new GraphQLNonNull(StationType) },
    date: { type: new GraphQLNonNull(DateType) },
  },
  async resolve(source: mixed, args: Args, ctx: Ctx) {
    const results = await ctx.trenitalia.search({
      from: args.from,
      to:   args.to,
      date: args.date.format('DD-MM-YYYY')
    })

    console.log(results) // eslint-disable-line no-console

    return null
  }
}
