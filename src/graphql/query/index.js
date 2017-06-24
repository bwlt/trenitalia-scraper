// @flow

import { GraphQLObjectType } from 'graphql'

import solutions from './solutions'


export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    solutions
  }
})
