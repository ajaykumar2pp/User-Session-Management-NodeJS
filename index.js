const express = require('express')
const path = require('path');
const session = require('express-session');
const flash = require('express-flash')
const MongoStore = require('connect-mongo');
const { ConnectDB } = require("./src/config/db.config")
const authRoutes = require("./src/routes/authRoutes")
const userInfoRoutes = require("./src/routes/user-InfoRoutes")

// Initialize Express app
const app = express();

// *********   Set Template Engine  *********//

app.set("view engine", "ejs")
app.set('views', path.join(__dirname, 'views'))


// ********  serve the static file from the 'public' directory *********//
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//  *****   Database Connection   *******//
ConnectDB();


//  *****   Set up the session middleware  *******//
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.DATABASE_URL,
        collection: 'sessions'
    }),
    cookie: {
        secure: false,    // Set to true if using HTTPS
        maxAge: 24 * 60 * 60 * 1000 // 1 day
        // maxAge: 24 * 60 * 1000  // 1 minutes
        // maxAge: 30 * 60 * 1000  // 30 minutes
    }
}));


//***************** Express Flash  ******************//
app.use(flash())


app.use((req, res, next) => {
    console.log("User ID:", req.session); // Logs the user ID for every request
    // req.flash('error', 'Session expired! ');
    next();
});



app.get('/', (req, res) => {
    res.redirect('/register');
});

// ********  Route Setup ***********//
app.use('/', authRoutes);
app.use('/', userInfoRoutes);

//*****   404 Error Handling   *******/ 
app.use((req, res) => {
    res.status(404).render('errors/404', { title: 'Page Not Found' })
})



const PORT = process.env.PORT || 8000
app.listen(PORT, (err) => {
    if (err) {
        console.error(err)
    }
    console.log(`Server running on port http://localhost:${PORT}`)
})
