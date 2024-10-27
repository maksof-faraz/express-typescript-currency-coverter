const express = require("express");
const route = express.Router();
import { validateQueryParams} from "../middleware/validateQueryParams";
import currencyController from "../controller/currency/currency-converter-controller";


route.get('/countryName', currencyController.countryName);
route.get('/currencyConverter',  validateQueryParams ,currencyController.currencyConverter);

export default route;