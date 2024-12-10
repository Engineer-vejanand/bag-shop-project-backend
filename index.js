const express = require('express');
const app  = express();

const path = require('path');
const cookieParser = require('cookie-parser');

require("dotenv").config();

const expressSession = require("express-session");
const flash = require("connect-flash");

const db = require('./config/mongoose.connection.js');
const ownersRouter = require('./routes/ownersRouter.js');
const usersRouter = require('./routes/usersRouter.js');
const productsRouter = require('./routes/productsRouter.js');
const indexrouter = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.use(cookieParser());

app.use(
    expressSession({
        resave:false,
        saveUninitialized:false,
        secret:process.env.EXPRESS_SESSION_SECRET,
    })
);
app.use(flash());

app.set("view engine", "ejs");
app.set('views', './views');

app.use("/",indexrouter)
app.use("/owners",ownersRouter);
app.use("/users",usersRouter);
app.use("/products",productsRouter);


app.listen(3000);
