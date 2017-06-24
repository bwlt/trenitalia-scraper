// @flow

import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'

import {
  DateTimeType,
  DurationType,
  PriceType,
  StationType,
} from '../scalars'


export default new GraphQLObjectType({
  name: 'Solution',
  fields: {
    from:     { type: new GraphQLNonNull(StationType) },
    to:       { type: new GraphQLNonNull(StationType) },
    fromTime: { type: new GraphQLNonNull(DateTimeType) },
    toTime:   { type: new GraphQLNonNull(DateTimeType) },
    duration: { type: new GraphQLNonNull(DurationType) },
    price:    { type: new GraphQLNonNull(PriceType) },
    trains:   { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) },
  }
})
