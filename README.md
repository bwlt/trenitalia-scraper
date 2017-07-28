# TRENITALIA SCRAPER

[![Greenkeeper badge](https://badges.greenkeeper.io/bwlt/trenitalia-scraper.svg)](https://greenkeeper.io/)

A GraphQL interface to [trenitalia.com](http://www.trenitalia.com/) website solutions.

---

Try it with the GraphiQL interface on https://trenitalia-scraper.now.sh/.  
The schema is explorable and documented on GraphiQL using the _Docs_ tab (top right position).

Sample query:
```graphql
query($origin: Station!, $destination: Station!, $date: Date!, $time: TimeHour!) {
  solutions(origin: $origin, destination: $destination, date: $date, time: $time, limit: 2, offset: 2) {
    idsolution
    origin
    destination
    direction
    departuretime
    arrivaltime
    minprice
    duration
    changesno
    trainlist {
      trainidentifier
      trainacronym
      traintype
      pricetype
    }
    bookable
    saleable
    onlycustom
    showSeat
  }
}

# variables (bottom left panel on GraphiQL)
{
  "origin": "Milano Centrale",
  "destination": "Treviso Centrale",
  "date": "20/07/2017",
  "time": "08"
}
```

## Release notes

- 2017-07-01, v0.1.0  
  Breaking change: Changed Solution GraphQL Object.  
  Reduced response time and supporting more query arguments on `solutions` query.  
  Under the hood:
    - Using mobile website API instead of scraping desktop website: more fast and simple
- 2017-06-24, v0.0.1
  Initial draft
