// @flow

import {
  GraphQLScalarType,
  Kind,
} from 'graphql'

import list from '../../lib/trenitalia/stations-list.json'
import { invariant } from '../../utils'


function getStationFromValue(value: mixed): ?string {
  if (typeof value !== 'string') return undefined
  const station = list[value]
  if (station) return value
  else return undefined
}


const DateType = new GraphQLScalarType({
  name: 'Station',
  parseValue(value) {
    const station = getStationFromValue(value)
    if (station) return value
    else throw new Error(`Station '${String(value)}' not valid`)
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      const station = getStationFromValue(ast.value)
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
