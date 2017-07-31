// @flow

type DataJson = { stations: string[] }

const data: DataJson = require('./data.json')

export const dataList = data.stations

export const dataMap = data.stations.reduce((acc, station) => {
  acc[station] = station
  return acc
}, {})
