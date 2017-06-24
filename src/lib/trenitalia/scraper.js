// @flow

import cheerio from 'cheerio'

import { ScrapeError } from './errors'


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


export function scrapeSolutions(htmlStr: string): SolutionObject[] {
  const $ = createSelector(htmlStr)

  const solutions: SolutionObject[] = []

  const $solutionRow = $('.solutionRow')
  if ($solutionRow.length === 0) throw new ScrapeError(`'.solutionRow' HTML Elements not found`)

  $solutionRow.each((index, node) => {
    const $node = $(node)

    const $tableCells = $node.find('td')
    if ($tableCells.length !== 6) throw new ScrapeError(`Expected to find 6 columns in a '.solutionRow'`)

    const $firstCell = $($tableCells.get(0))
    const fromTime = $firstCell.find('.time').text().trim()
    if (!fromTime) throw new ScrapeError('Departure time not found')

    const from = $firstCell.find('.station').text().trim()
    if (!from) throw new ScrapeError('Departure station not found')

    const $thirdCell = $($tableCells.get(2))
    const toTime = $thirdCell.find('.time').text().trim()
    if (!toTime) throw new ScrapeError('Arrival time not found')

    const to = $thirdCell.find('.station').text().trim()
    if (!to) throw new ScrapeError('Arrival station not found')

    const $fourthCell = $($tableCells.get(3))
    const duration = $fourthCell.find('.duration').text().trim()
    if (!duration) throw new ScrapeError('Duration not found')

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
