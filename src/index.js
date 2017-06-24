// @flow

import express from 'express'
import type { $Response } from 'express'

import './error-handler'
import graphql from './graphql'


const app = express()

app.use('/graphql', graphql)

app.get('/*', (req, res: $Response) => res.redirect('/graphql'))


export default app
