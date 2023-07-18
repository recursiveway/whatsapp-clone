
import app from './app.js'




//env variables
const port = process.env.PORT || 7000

console.log(process.env.NODE_ENV);

app.listen(port, () => {
    console.log(`listining on port ${port}`);
})