import express, { json } from "express"
import dotenv from 'dotenv'
import morgan from "morgan"
import helmet from "helmet"
import mongoSanitize from 'express-mongo-sanitize'
import cookieParser from "cookie-parser"
import compression from "compression"
import fileUpload from "express-fileupload"
import cors from 'cors'

//dotenv config
dotenv.config()

const app = express()

//Morgan
if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"))
}

//Helmet
app.use(helmet())

//json
app.use(express.json())

//parse json requesr body
app.use(express.urlencoded({ extended: true }))

//sanitize request data
app.use(mongoSanitize())

//parse cookie
app.use(cookieParser())

//gzip compression
app.use(compression())

//file upload
app.use(fileUpload({
    useTempFiles: true
}))

//cors
app.use(cors({
    origin: 'http://localhost:3000'
}))




app.post('/test', (req, res) => {
    res.send(req.body)
})


export default app