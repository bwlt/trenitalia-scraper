// @flow

import graphqlHTTP from "express-graphql";
import { makeExecutableSchema } from 'graphql-tools'
import moment from 'moment'

import * as trenitalia from "../lib/trenitalia";
import formatError from "./format-error";
import * as scalars from './scalars'

const context = { trenitalia };

export type Ctx = typeof context;

const typeDefs = /* GraphQL */`

  scalar Date
  scalar DateTime
  scalar Duration
  scalar Station
  scalar TimeHour

  type Train {
    trainidentifier: String
    trainacronym: String
    traintype: String
    pricetype: String
  }

  type Solution {
    idsolution: ID!
    origin: Station!
    destination: Station!
    direction: String!
    departuretime: DateTime!
    arrivaltime: DateTime!
    minprice: Float!
    duration: Duration!
    changesno: Int!
    trainlist: [Train!]!
    bookable: Boolean!
    saleable: Boolean!
    onlycustom: Boolean!
    showSeat: Boolean!
  }

  type Query {
    solutions(
      origin: Station!
      destination: Station!
      date: Date!
      time: TimeHour!
      limit: Int
      offset: Int
    ): [Solution!]!

    stations: [Station!]!
  }
`

const resolvers = {
  Query: {
    solutions(source: mixed, args: { origin: string, destination: string, date: moment, time: moment, limit?: number, offset?: number }, context: Ctx) {
      return context.trenitalia.search({
        origin: args.origin,
        destination: args.destination,
        date: args.date,
        time: args.time,
        limit: args.limit,
        offset: args.offset
      })
    },
    stations(source: mixed, args: mixed, context: Ctx) {
      return context.trenitalia.stations.dataList
    }
  },
  DateTime: scalars.DateTime,
  Date: scalars.Date,
  Duration: scalars.Duration,
  Station: scalars.Station,
  TimeHour: scalars.TimeHour
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default graphqlHTTP({
  schema,
  graphiql: true,
  context,
  formatError
});
