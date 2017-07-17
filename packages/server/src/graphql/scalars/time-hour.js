// @flow

import { GraphQLScalarType, Kind } from "graphql";
import moment from "moment";

const FORMAT = "HH";

function timeHourValue(value: mixed): ?moment {
  if (typeof value !== "string") return undefined;
  if (value.length !== 2) throw new Error("Invalid date format");
  const m = moment(value, FORMAT);
  if (m.isValid()) return m;
  else return undefined;
}

export default new GraphQLScalarType({
  name: "TimeHour",
  description: `A string value that represent a time hour. The format to be used is \`${FORMAT}\`.`,
  parseValue(value) {
    return timeHourValue(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return timeHourValue(ast.value);
    } else {
      return null;
    }
  },
  serialize() {
    throw new Error("Unimplemented");
  }
});
