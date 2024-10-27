import express, { Request, Response } from "express";
const app = express();


var currencyRoute = require('./routes/currency-routes')();
app.use('/currency', currencyRoute);

module.exports = app;