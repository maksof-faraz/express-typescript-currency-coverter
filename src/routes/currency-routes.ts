const express = require("express");
const route = express.Router();
const currencyController = require("../controller/currency/currency-converter-controller");


var router = function() {

    route.get('/convertCurrency', currencyController.convertCurrency);
    return route
}

module.exports = router;