const express = require("express");
const route = express.Router();
import currencyController from "../controller/currency/currency-converter-controller";


route.get('/convertCurrency', currencyController.convertCurrency);
route.get('/convertCurrency2', currencyController.convertCurrency2);

export default route;