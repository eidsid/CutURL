const express = require("express");
const app = express();
const path = require("path");
const method_override = require("method-override");
const DB = require("./DB/db");
const flash = require('express-flash')
const session = require('express-session')
const passport = require('passport')

// middlewares

// call passport Config 
const passportConfig = require('./Config/passportConfig');
passportConfig(passport)


// express session 
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())


// connect flash
app.use(flash())

// call flash message config
const flashConfig = require('./Config/flashConfig')
app.use(flashConfig)

require("dotenv").config();

app.set("view engine", "ejs");

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use(
    express.urlencoded({
        extended: false,
    })
);

app.use(method_override("_method"));

const users = require("./router/users");
app.use("/users", users);

const url = require("./router/url");
app.use("/", url);


const port = process.env.PORT || 9000;
const start = async() => {
    await DB();
    app.listen(port, () => {
        console.log(`you are listen in port ${port}`);
    });
};
start();