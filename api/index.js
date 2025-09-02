const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");
require("dotenv").config();

const db = require("../config/mongoose-connection");

const ownerRouter = require("../routes/ownerRouter");
const usersRouter = require("../routes/usersRouter");
const productsRouter = require("../routes/productsRouter");
const indexRouter = require("../routes/indexRouter");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET || "default_secret",
  })
);
app.use(flash());

// paths
app.set("views", path.join(process.cwd(), "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(process.cwd(), "public")));

// routes
app.use("/", indexRouter);
app.use("/owner", ownerRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

module.exports = app;





const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running on port " + port);
});