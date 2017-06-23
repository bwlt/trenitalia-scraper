// @flow

import fetch from 'node-fetch'
import querystring from 'querystring'

import { invariant, log } from '../utils'
import * as scraper from './scraper'


export async function search({ from: arrivalStation, to: departureStation, date: departureDate }: {
  from: string,
  to:   string,
  date: string,
}) {
  log('Search parameters: ', arguments[0])
  const urlStr = 'https://www.lefrecce.it/B2CWeb/searchExternal.do?parameter=initBaseSearch&lang=it'
  const body = querystring.stringify({
    arrivalStation,
    departureDate,
    departureStation,
    departureTime: '00',
    isRoundTrip: 'false',
    noOfAdults: '1',
    noOfChildren: '0',
    selectedTrainClassification: '',
    selectedTrainType: 'tutti',
    tripType: 'on',
    url_desktop: 'https://www.lefrecce.it/B2CWeb/searchExternal.do?parameter=initBaseSearch&lang=it',
    url_mobile: 'https://www.lefrecce.it/msite/SearchExternal.do?parameter=initBaseSearch&lang=it',
    ynFlexibleDates: '',
  })
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': body.length,
  }

  log(`first call: POST ${urlStr}`)
  const firstResponse = await fetch(urlStr, {
    method: 'POST',
    headers,
    redirect: 'manual',
    body,
  })
  invariant(firstResponse.status === 302, 'Expected a redirect')

  const cookie = firstResponse.headers.getAll('set-cookie').reduce((acc, cookie) => {
    const firstPart = cookie.split('; ')[0]
    return acc.concat([firstPart])
  }, []).join('; ')
  const location = firstResponse.headers.get('location')
  log(`Got cookie: ${cookie}`)
  log(`Got location: ${location}`)

  const secondResponse = await fetch(location, {
    headers: {
      Cookie: cookie
    }
  })

  invariant(secondResponse.status === 200, 'Expecsted a 200')

  const responsePage = await secondResponse.text()
  const solutions = scraper.scrapeSolutions(responsePage)

  return solutions
}
