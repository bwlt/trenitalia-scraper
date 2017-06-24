require('dotenv').load()

const { NODE_ENV } = process.env,
      isProduction = NODE_ENV === 'production'

let app


if (isProduction) {
  app = require('../build').default
}
else {
  require('babel-register')
  app = require('../src').default
}


module.exports = app
