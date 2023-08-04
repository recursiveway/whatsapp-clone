import express, { json } from "express"
import dotenv from 'dotenv'
import morgan from "morgan"
import helmet from "helmet"
import mongoSanitize from 'express-mongo-sanitize'
import cookieParser from "cookie-parser"
import compression from "compression"
import fileUpload from "express-fileupload"
import cors from 'cors'
import createHttpErrors from 'http-errors'
import routes from './routes/index.js'


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


//routes
app.use("/api/v1", routes)


app.use(async (rew, res, next) => {
    next(createHttpErrors.NotFound('This route does not exit'))
})

//error handling

app.use(async (err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: "this route has a error"
        }
    }
    )
})
export default app