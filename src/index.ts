import express, { Request, Response } from "express";
import axios from 'axios';

import { validateQueryParams, QueryParams } from './middleware/validateQueryparams';
const app = express();
const port = 3000;

const API_KEY = "4E0VK7BnkdeUuh1vegAt808v2IUjzUR6lxcvBMT2";

app.get("/", (req: Request, res: Response) => {
  res.send("Server is responding");
})


app.get('/currencyList' , async (req: Request, res: Response) : Promise<any> => {

    try {
      const response = await axios.get(`https://api.freecurrencyapi.com/v1/currencies?apikey=${API_KEY}`);
      return res.json(response.data); // Send the response data to the client
      
    } catch (error) {
      console.error(error);
      return res.status(500).send({error : 'Error fetching currency list'});
    }
  });



app.get('/currencyConverter',validateQueryParams , async (req: Request<QueryParams>, res: Response) : Promise<any> => {
    const { base_currency, currencies , type , date} = req.query;
    let currencyApi = `https://api.freecurrencyapi.com/v1/`;
    
    currencyApi += (type== 'latest') ? `latest?apikey=${API_KEY}&base_currency=${base_currency}&currencies=${currencies}`
                  : `historical?apikey=${API_KEY}&base_currency=${base_currency}&currencies=${currencies}&date=${date}`
    try {
      const response = await axios.get(`${currencyApi}`);
      return res.json(response.data); // Send the response data to the client
      
    } catch (error) {
      console.error(error);
      return res.status(500).send({error : 'Error fetching currency data'});
    }
  });



app.listen(port, () => {
  return console.log(`Server is listening on ${port}`)
})