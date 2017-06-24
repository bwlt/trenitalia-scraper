// @flow

import {
  GraphQLScalarType,
  Kind,
} from 'graphql'

import list from '../../lib/trenitalia/stations-list.json'
import { invariant } from '../../utils'


const DateType = new GraphQLScalarType({
  name: 'Station',
  parseValue() {
    throw new Error('Unimplemented')
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      const station = list[ast.value]
      if (station) return ast.value
      else throw new Error(`Station '${ast.value}' not valid`)
    }
    else {
      return null
    }
  },
  serialize(value) {
    invariant(typeof value === 'string', 'Expected to serialize a Station string value')
    return value
  }
})


export default DateType
