// @flow

import { GraphQLScalarType } from "graphql";

const PriceType = new GraphQLScalarType({
  name: "Price",
  parseValue() {
    throw new Error("Unimplemented");
  },
  parseLiteral() {
    throw new Error("Unimplemented");
  },
  serialize(value: mixed) {
    if (typeof value !== "string") throw new Error("Serialize error");
    const regex = /(\d+),(\d{2})\s€/,
      matches = value.match(regex);
    if (!matches) throw new Error("Serialize error");
    const amount = Number.parseInt(`${matches[1]}${matches[2]}`),
      currency = "EUR";
    return { amount, currency };
  }
});

export default PriceType;
