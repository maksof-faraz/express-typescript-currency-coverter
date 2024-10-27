import express, { Request, Response } from "express";
import axios from 'axios';
const cors = require('cors');
import dotenv from 'dotenv';

dotenv.config(); // Load .env file
import routes from './src/routes';

// import { validateQueryParams, QueryParams } from './src/middleware/validateQueryParams';
const app = express();
const PORT =  process.env.PORT || 3000;


app.use(cors());
app.options('*', cors());
app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/", (req: Request, res: Response) => {
  res.send(`Server is responding`);
})


app.use('/api', routes);

// app.get('/countryName' , async (req: Request, res: Response) : Promise<any> => {

//     try {
//       const response = await axios.get(`https://api.freecurrencyapi.com/v1/currencies?apikey=${API_KEY}`);
//       return res.status(200).json({status : "OK" , data : response.data})
      
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({error : 'Error fetching country currency list'});
//     }
//   });



// app.get('/currencyConverter',validateQueryParams , async (req: Request<QueryParams>, res: Response) : Promise<any> => {
//     const { base_currency, currencies , type , date} = req.query;
//     let currencyApi = `https://api.freecurrencyapi.com/v1/`;
    
//     currencyApi += (type== 'latest') ? `latest?apikey=${API_KEY}&base_currency=${base_currency}&currencies=${currencies}`
//                   : `historical?apikey=${API_KEY}&base_currency=${base_currency}&currencies=${currencies}&date=${date}`
//     try {
//       const response = await axios.get(`${currencyApi}`);
//       return res.status(200).json({status : "OK" , data : response.data}); 
      
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({error : 'Error fetching currency data'});
//     }
//   });



app.listen(PORT, () => {
  return console.log(`Server is listening on ${PORT}`)
})

module.exports = app;