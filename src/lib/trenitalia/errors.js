// @flow

export function ScrapeError(message?: string) {
  this.name = 'ScrapeError'
  this.message = message || 'Scrape error'
  this.stack = (new Error()).stack
}

ScrapeError.prototype = Object.create(Error.prototype)
ScrapeError.prototype.constructor = ScrapeError
