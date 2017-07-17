/* eslint-env jest */

describe(`${__filename}`, () => {
  it("Does not break if importing the main module", () => {
    // It generate a lot of missing coverage muhahaha
    require(".");
  });
});
