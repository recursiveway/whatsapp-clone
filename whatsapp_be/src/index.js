import dotenv from 'dotenv'
import app from './app.js'

//dotenv config
dotenv.config()

const port = dotenv.PORT || 8000
app.listen(port, () => {
    console.log(`listining on port ${port}`);
})