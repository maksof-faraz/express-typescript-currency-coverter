import express, { Request, Response } from "express";
import axios from 'axios';
const cors = require('cors');

import { validateQueryParams, QueryParams } from './middleware/validateQueryparams';
const app = express();
const port = 3000;

const API_KEY = "4E0VK7BnkdeUuh1vegAt808v2IUjzUR6lxcvBMT2";

app.use(cors());
app.options('*', cors());
app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/", (req: Request, res: Response) => {
  res.send("Server is responding");
})


app.get('/countryName' , async (req: Request, res: Response) : Promise<any> => {

    try {
      const response = await axios.get(`https://api.freecurrencyapi.com/v1/currencies?apikey=${API_KEY}`);
      return res.status(200).send({status : "OK" , data : response.data})
      
    } catch (error) {
      console.error(error);
      return res.status(500).send({error : 'Error fetching country currency list'});
    }
  });



app.get('/currencyConverter',validateQueryParams , async (req: Request<QueryParams>, res: Response) : Promise<any> => {
    const { base_currency, currencies , type , date} = req.query;
    let currencyApi = `https://api.freecurrencyapi.com/v1/`;
    
    currencyApi += (type== 'latest') ? `latest?apikey=${API_KEY}&base_currency=${base_currency}&currencies=${currencies}`
                  : `historical?apikey=${API_KEY}&base_currency=${base_currency}&currencies=${currencies}&date=${date}`
    try {
      const response = await axios.get(`${currencyApi}`);
      return res.status(200).send({status : "OK" , data : response.data}); 
      
    } catch (error) {
      console.error(error);
      return res.status(500).send({error : 'Error fetching currency data'});
    }
  });



app.listen(port, () => {
  return console.log(`Server is listening on ${port}`)
})