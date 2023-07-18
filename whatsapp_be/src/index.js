
import app from './app.js'
import logger from './configs/logger.js';
import mongoose from 'mongoose'



//env variables
const port = process.env.PORT || 7000

// console.log(process.env.NODE_ENV);

const DATABASE_URL = process.env.MONGO_URI
// logger.info(DATABASE_URL)

//mongodb connection
mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    logger.info('connected to mongodb')
})



let server = app.listen(port, () => {
    logger.info(`listining on port ${port}`);
    // throw new Error("error is rrrr faslkf")
    logger.info(`${process.pid}`)
})

//handle error

const exitHandler = () => {
    if (server) {
        logger.info("server closed")
        process.exit(1)
    }
}

const unexpectedErrorHandler = (error) => {
    logger.error(error)
    exitHandler()
}
process.on("uncaughtException", unexpectedErrorHandler)
process.on("unhandledRejection", unexpectedErrorHandler)

//SIGTERM
process.on("SIGTERM", () => {
    if (server) {
        logger.info("server closed")
        process.exit(1)
    }
})