const express = require("express");
const app = express();
const path = require("path");
const method_override = require("method-override");

const DB = require("./DB/db");

// middlewares
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

const logins = require("./router/login");
app.use("/login", logins);
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