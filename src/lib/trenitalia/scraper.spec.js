/* eslint-env jest */

import fs from "fs";
import path from "path";
import util from "util";
import moment from "moment";

const readFile = util.promisify(fs.readFile);

describe(`${__filename}`, () => {
  it("works", async () => {
    const scraper = require("./scraper");
    const htmlStr = await readFile(
      path.join(__dirname, "sample-page.html"),
      "utf8"
    );

    const solutions = scraper.scrapeSolutions(htmlStr);

    expect(solutions[0]).toEqual(
      expect.objectContaining({
        from: "Milano Centrale",
        to: "Pordenone",
        // duration: '3h 21\'',
        trains: ["Frecciarossa 9703"],
        price: "39,90 €"
      })
    );
    expect(solutions[0].fromTime).toBeInstanceOf(moment);
    expect(solutions[0].fromTime.toISOString()).toBe(
      "2017-06-18T04:45:00.000Z"
    );
    expect(solutions[0].toTime.toISOString()).toBe("2017-06-18T08:06:00.000Z");
    expect(solutions[0].duration.toISOString()).toBe("PT3H21M");

    expect(solutions[1]).toEqual(
      expect.objectContaining({
        from: "Milano Centrale",
        to: "Pordenone",
        // duration: '3h 30\'',
        trains: ["Frecciarossa 9707", "Regionale Veloce 2446"],
        price: "42,05 €"
      })
    );
    expect(solutions[1].fromTime).toBeInstanceOf(moment);
    expect(solutions[1].fromTime.toISOString()).toBe(
      "2017-06-18T05:45:00.000Z"
    );
    expect(solutions[1].toTime.toISOString()).toBe("2017-06-18T09:15:00.000Z");
    expect(solutions[1].duration.toISOString()).toBe("PT3H30M");
  });
});
