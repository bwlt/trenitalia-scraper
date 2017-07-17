// @flow

import { GraphQLScalarType, Kind } from "graphql";
import moment from "moment";

const FORMAT = "DD-MM-YYYY";

function dateValue(value: mixed): ?moment {
  if (typeof value !== "string") return undefined;
  if (value.length !== 10) throw new Error("Invalid date format");
  const m = moment(value, FORMAT);
  if (m.isValid()) return m;
  else return undefined;
}

const DateType = new GraphQLScalarType({
  name: "Date",
  description: `A string value that represent a date. The format to be used is \`${FORMAT}\`.`,
  parseValue(value) {
    return dateValue(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return dateValue(ast.value);
    } else {
      return null;
    }
  },
  serialize() {
    throw new Error("Unimplemented");
  }
});

export default DateType;
