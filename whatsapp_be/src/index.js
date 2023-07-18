
import app from './app.js'
import logger from './configs/logger.js';



//env variables
const port = process.env.PORT || 7000

console.log(process.env.NODE_ENV);



app.listen(port, () => {
    logger.info(`listining on port ${port}`);
})