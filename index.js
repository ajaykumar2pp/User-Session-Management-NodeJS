const express = require('express')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { ConnectDB } = require("./src/config/db.config")

const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//  Database Connection
ConnectDB();






const PORT = process.env.PORT || 8000
app.listen(PORT, (err) => {
    if (err) {
        console.error(err)
    }
    console.log(`Server running on port http://localhost:${PORT}`)
})
