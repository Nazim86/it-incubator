import express, {Request, Response} from 'express'
import bodyParser from "body-parser"
import {videoRouter} from "./videos"

const app = express()
const port = process.env.PORT || 3000

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

app.use('/videos', videoRouter)
app.use('/testing/all-data', videoRouter) // using router for delete all

app.listen(port, () => {
    console.log(`example app listening on port ${port}`)
})