// @flow

import { GraphQLScalarType } from "graphql";
import moment from "moment";

const DurationType = new GraphQLScalarType({
  name: "Duration",
  parseValue() {
    throw new Error("Unimplemented");
  },
  parseLiteral() {
    throw new Error("Unimplemented");
  },
  serialize(value: mixed) {
    if (moment.isDuration(value)) {
      // $FlowFixMe
      return value.toISOString();
    } else {
      throw new Error("Serialize error");
    }
  }
});

export default DurationType;
