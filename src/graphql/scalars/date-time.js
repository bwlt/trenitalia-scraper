// @flow

import { GraphQLScalarType } from "graphql";
import moment from "moment";

const DateTimeType = new GraphQLScalarType({
  name: "DateTime",
  parseValue() {
    throw new Error("Unimplemented");
  },
  parseLiteral() {
    throw new Error("Unimplemented");
  },
  serialize(value: mixed) {
    if (value instanceof moment) {
      return value.toISOString();
    } else {
      throw new Error("Expecting a moment instance to serialize");
    }
  }
});

export default DateTimeType;
