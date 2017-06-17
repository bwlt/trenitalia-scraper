// @flow

import cheerio from 'cheerio'

import { ScrapeError } from './errors'


export type Solution = {|
  departureTime:    string,
  departureStation: string,
  arrivalTime:      string,
  arrivalStation:   string,
  duration:         string,
  price:            string,
  trains:           string[],
|}


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



const createSelector = (htmlStr: string) => {
  const $ = cheerio.load(htmlStr)

  return (input: SelectorType): Selection => {
    return $(input)
  }
}


export function scrapeSolutions(htmlStr: string): Solution[] {
  const $ = createSelector(htmlStr)

  const solutions: Solution[] = []

  const $solutionRow = $('.solutionRow')
  if ($solutionRow.length === 0) throw new ScrapeError(`'.solutionRow' HTML Elements not found`)

  $solutionRow.each((index, node) => {
    const $node = $(node)

    const $tableCells = $node.find('td')
    if ($tableCells.length !== 6) throw new ScrapeError(`Expected to find 6 columns in a '.solutionRow'`)

    const $firstCell = $($tableCells.get(0))
    const departureTime = $firstCell.find('.time').text().trim()
    if (!departureTime) throw new ScrapeError('Departure time not found')

    const departureStation = $firstCell.find('.station').text().trim()
    if (!departureStation) throw new ScrapeError('Departure station not found')

    const $thirdCell = $($tableCells.get(2))
    const arrivalTime = $thirdCell.find('.time').text().trim()
    if (!arrivalTime) throw new ScrapeError('Arrival time not found')

    const arrivalStation = $thirdCell.find('.station').text().trim()
    if (!arrivalStation) throw new ScrapeError('Arrival station not found')

    const $fourthCell = $($tableCells.get(3))
    const duration = $fourthCell.find('.duration').text().trim()
    if (!duration) throw new ScrapeError('Duration not found')

    const $fifthCell = $($tableCells.get(4))

    const $trainOffers = $fifthCell.find('.trainOffer')
    if ($trainOffers.length === 0) throw new Error(`'.trainOffer' HTML Elements not found`)
    const trains: $PropertyType<Solution, 'trains'> = []
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
      departureTime,
      departureStation,
      arrivalTime,
      arrivalStation,
      duration,
      price,
      trains,
    })
  })

  return solutions
}
