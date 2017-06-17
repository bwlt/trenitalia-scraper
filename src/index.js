// @flow

import express from 'express'

import './error-handler'
import graphql from './graphql'


const app = express()

app.use('/graphql', graphql)


export default app
