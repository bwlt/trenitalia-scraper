// @flow

import fetch from "node-fetch";
import querystring from "querystring";
import createDebug from "debug";
const debug = createDebug("app:lib:trenitalia");
import moment from "moment";

import { invariant } from "../utils";
import * as scraper from "./scraper";

const DATE_FORMAT = "DD-MM-YYYY";

export async function search({
  from,
  to,
  date
}: {
  from: string,
  to: string,
  date: moment
}): Promise<SolutionObject[]> {
  debug("Search parameters: ", arguments[0]);
  const urlStr =
    "https://www.lefrecce.it/B2CWeb/searchExternal.do?parameter=initBaseSearch&lang=it";
  const body = querystring.stringify({
    arrivalStation: from,
    departureStation: to,
    departureDate: date.format(DATE_FORMAT),
    departureTime: "00",
    isRoundTrip: "false",
    noOfAdults: "1",
    noOfChildren: "0",
    selectedTrainClassification: "",
    selectedTrainType: "tutti",
    tripType: "on",
    url_desktop:
      "https://www.lefrecce.it/B2CWeb/searchExternal.do?parameter=initBaseSearch&lang=it",
    url_mobile:
      "https://www.lefrecce.it/msite/SearchExternal.do?parameter=initBaseSearch&lang=it",
    ynFlexibleDates: ""
  });
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Content-Length": body.length
  };

  debug(`first call: POST ${urlStr}`);
  const firstResponse = await fetch(urlStr, {
    method: "POST",
    headers,
    redirect: "manual",
    body
  });
  invariant(
    firstResponse.status === 302,
    `Expected a redirect, but got status: '${firstResponse.status}'`
  );

  const cookie = firstResponse.headers
    .getAll("set-cookie")
    .reduce((acc, cookie) => {
      const firstPart = cookie.split("; ")[0];
      return acc.concat([firstPart]);
    }, [])
    .join("; ");
  const location = firstResponse.headers.get("location");
  debug(`Got cookie: ${cookie}`);
  debug(`Got location: ${location}`);

  const secondResponse = await fetch(location, {
    headers: {
      Cookie: cookie
    }
  });

  invariant(secondResponse.status === 200, "Expecsted a 200");

  const responsePage = await secondResponse.text();
  const solutions = scraper.scrapeSolutions(responsePage);

  return solutions;
}
