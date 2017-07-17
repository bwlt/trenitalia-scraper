// @flow

const BASE_URL = "https://www.lefrecce.it";

import querystring from "querystring";
import moment from "moment";
import fetch from "node-fetch";

import invariant from "../../utils/invariant";

export default async ({
  origin,
  destination,
  date,
  time,
  limit,
  offset
}: {
  origin: string,
  destination: string,
  date: moment,
  time: moment,
  limit?: number,
  offset?: number
}) => {
  const queryObj = {};
  queryObj.origin = origin.toUpperCase();
  queryObj.destination = destination.toUpperCase();
  queryObj.arflag = "A";
  queryObj.atime = time.format("HH");
  queryObj.adultno = 1;
  queryObj.childno = 0;
  queryObj.direction = "A";
  queryObj.frecce = false;
  queryObj.onlyRegional = false;
  if (limit) queryObj.limit = limit;
  if (offset) queryObj.offset = offset;
  let queryStr = "";
  queryStr += querystring.stringify(queryObj);
  // Trenitalia does not encode slash inside date
  queryStr += `&adate=${date.format("DD/MM/YYYY")}`;

  const urlStr = `${BASE_URL}/msite/api/solutions?${queryStr}`;
  const response = await fetch(urlStr);
  invariant(
    response.status === 200,
    `Response status must be 200; got ${response.status}`
  );
  invariant(
    response.headers.get("content-type") === "application/json",
    `Response content type must be set to 'application/json'`
  );

  const solutions = await response.json();

  return solutions.map(s => {
    const departuretime = moment(s.departuretime);
    const arrivaltime = moment(s.arrivaltime);
    const [dh, dm] = s.duration.split(":");
    const duration = moment.duration({ h: dh, m: dm });
    return {
      ...s,
      departuretime,
      arrivaltime,
      duration
    };
  });
};
