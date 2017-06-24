// @flow

import cheerio from 'cheerio'
import moment from 'moment'

import { ScrapeError } from './errors'


const DATE_FORMAT = 'DD-MM-YYYY'

type SelectorType = string | Selection | Node

type Selection = {
  attr: (attrName: string) => ?string,
  each: (iterator: (index: number, node: Node) => mixed) => mixed,
  find: (what: SelectorType) => Selection,
  get: (index: number) => Node,
  html: () => string,
  length: number,
  slice: (from: number, to?: number) => Selection,
  text: () => string,
}

type Node = {
  type: 'tag',
  children: Node[]
} | {
  type: 'text',
  data: string
}

/*flow-include
// used for typing moment.duration
const sampleDuration = moment.duration(1, 'seconds')
type Duration = typeof sampleDuration
*/

const createSelector = (htmlStr: string) => {
  const $ = cheerio.load(htmlStr)

  return (input: SelectorType): Selection => {
    return $(input)
  }
}


const scrapeFromTime = (fromDate: moment, $node: Selection): moment => {
  const value = $node.find('.time').text().trim()
  if (!value) throw new ScrapeError('Departure time not found')
  if (value.split(':').length !== 2) throw new ScrapeError(`Invalid scraped 'fromTime' format. Found '${value}'`)
  const [h, m] = value.split(':').map((v) => Number.parseInt(v))

  return moment(fromDate).hour(h).minutes(m)
}


const scrapeToTime = (fromDate: moment, $node: Selection): moment => {
  const value = $node.find('.time').text().trim()
  if (!value) throw new ScrapeError('Arrival time not found')
  if (value.split(':').length !== 2) throw new ScrapeError(`Invalid scraped 'toTime' format. Found '${value}'`)
  const [h, m] = value.split(':').map((v) => Number.parseInt(v))

  return moment(fromDate).hour(h).minutes(m)
}


const scrapeDuration = ($node: Selection): Duration => {
  const valueStr = $node.find('.duration').text().trim()
  if (!valueStr) throw new ScrapeError('Duration not found')
  const regex = /(\d)h\s(\d{2})'/
  const matches = valueStr.match(regex)
  if (!matches) throw new ScrapeError(`Invalid 'duration' format. Found '${valueStr}'`)
  const hours = Number.parseInt(matches[1]),
        minutes = Number.parseInt(matches[2])

  return moment.duration({ hours, minutes })
}


export function scrapeSolutions(htmlStr: string): SolutionObject[] {
  const $ = createSelector(htmlStr)

  const solutions: SolutionObject[] = []

  // Get the date of the actual search
  // It is used to construct the solution fromTime & toTime because they are
  // expressed as time only
  const $fromDate = $('#returnDate')
  if ($fromDate.length !== 1) throw new ScrapeError(`Expecting to find one '#returnDate' element`)
  const fromDateStr = $fromDate.attr('value')
  if (!fromDateStr) throw new ScrapeError(`Attribute 'value' not found o '#returnDate' element`)
  const fromDate = moment(fromDateStr.trim(), DATE_FORMAT)

  const $solutionRow = $('.solutionRow')
  if ($solutionRow.length === 0) throw new ScrapeError(`'.solutionRow' HTML Elements not found`)

  $solutionRow.each((index, node) => {
    const $node = $(node)

    const $tableCells = $node.find('td')
    if ($tableCells.length !== 6) throw new ScrapeError(`Expected to find 6 columns in a '.solutionRow'`)

    const $firstCell = $($tableCells.get(0)),
          fromTime = scrapeFromTime(fromDate, $firstCell)

    const from = $firstCell.find('.station').text().trim()
    if (!from) throw new ScrapeError('Departure station not found')

    const $thirdCell = $($tableCells.get(2)),
          toTime = scrapeToTime(fromDate, $thirdCell)

    const to = $thirdCell.find('.station').text().trim()
    if (!to) throw new ScrapeError('Arrival station not found')

    const $fourthCell = $($tableCells.get(3)),
          duration = scrapeDuration($fourthCell)

    const $fifthCell = $($tableCells.get(4))

    const $trainOffers = $fifthCell.find('.trainOffer')
    if ($trainOffers.length === 0) throw new Error(`'.trainOffer' HTML Elements not found`)
    const trains: $PropertyType<SolutionObject, 'trains'> = []
    $trainOffers.each((index, node) => {
      const $node = $(node)
      const descrNode = $node.find('.descr').get(0)
      if (descrNode.type !== 'tag') throw new ScrapeError('Expecting a node type tag for scraping train offer')
      const train = $(descrNode.children[0]).text().trim()
      if (!train) throw new ScrapeError('Train not found')
      const trainNumber = $(descrNode.children[1]).text().trim()
      if (!trainNumber) throw new ScrapeError('Train number not found')

      trains.push(`${train} ${trainNumber}`)
    })

    const $sixthCell = $($tableCells.get(5))
    const price = $sixthCell.find('.price').text().trim()
    if (!price) throw new ScrapeError('Price not found')

    solutions.push({
      fromTime,
      from,
      toTime,
      to,
      duration,
      price,
      trains,
    })
  })

  return solutions
}
