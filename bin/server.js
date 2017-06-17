require('dotenv').load()


let app
const port = process.env.PORT || 3000


if (process.env.NODE_ENV === 'production') {
  throw new Error('unimplemented')
}
else {
  require('babel-register')
  app = require('../src').default
}


app.listen(port, () => {
  console.log(`🌍 Server started on: http://localhost:${port}`) // eslint-disable-line no-console
})
