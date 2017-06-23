// @flow

import {
  GraphQLScalarType,
  Kind,
} from 'graphql'
import moment from 'moment'


const FORMAT = 'DD-MM-YYYY'


function dateValue(value: mixed): ?moment {
  if (typeof value !== 'string') return null
  const m = moment(value, FORMAT)
  if (m.isValid()) return m
  else return null
}


const DateType = new GraphQLScalarType({
  name: 'Date',
  parseValue() {
    throw new Error('Unimplemented')
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return dateValue(ast.value)
    }
    else {
      return null
    }
  },
  serialize() {
    throw new Error('Unimplemented')
  }
})


export default DateType
