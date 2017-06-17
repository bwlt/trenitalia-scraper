/* eslint-env jest */

import fs from 'fs'
import path from 'path'
import util from 'util'

const readFile = util.promisify(fs.readFile)


describe(`${__filename}`, () => {

  it('works', async () => {
    const scraper = require('./scraper')
    const htmlStr = await readFile(path.join(__dirname, 'sample-page.html'), 'utf8')

    const solutions = scraper.scrapeSolutions(htmlStr)

    expect(solutions[0]).toEqual({
      departureTime: '06:45',
      departureStation: 'Milano Centrale',
      arrivalTime: '10:06',
      arrivalStation: 'Pordenone',
      duration: '3h 21\'',
      trains: [
        'Frecciarossa 9703'
      ],
      price: '39,90 €'
    })
    expect(solutions[1]).toEqual({
      departureTime: '07:45',
      departureStation: 'Milano Centrale',
      arrivalTime: '11:15',
      arrivalStation: 'Pordenone',
      duration: '3h 30\'',
      trains: [
        'Frecciarossa 9707',
        'Regionale Veloce 2446'
      ],
      price: '42,05 €'
    })
  })

})
