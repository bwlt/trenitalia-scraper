// @flow

import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'

import { StationType } from '../scalars'


export default new GraphQLObjectType({
  name: 'Solution',
  fields: {
    from:     { type: new GraphQLNonNull(StationType) },
    to:       { type: new GraphQLNonNull(StationType) },
    fromTime: { type: new GraphQLNonNull(GraphQLString) },
    toTime:   { type: new GraphQLNonNull(GraphQLString) },
    duration: { type: new GraphQLNonNull(GraphQLString) },
    price:    { type: new GraphQLNonNull(GraphQLString) },
    trains:   { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) },
  }
})
