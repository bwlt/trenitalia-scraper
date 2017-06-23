// @flow

import graphqlHTTP from 'express-graphql'
import { GraphQLSchema } from 'graphql'

import * as trenitalia from '../lib/trenitalia'
import './scalars'
import query from './query'


const context = { trenitalia }

export type Ctx = typeof context

const schema = new GraphQLSchema({
  query
})


export default graphqlHTTP({
  schema,
  graphiql: true,
  context,
})
