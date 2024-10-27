import express, { Request, Response } from "express";
import axios from 'axios';
import dotenv from 'dotenv';
import { QueryParams } from "../../middleware/validateQueryParams";

dotenv.config(); // Load .env file

const API_KEY = process.env.API_KEY;

const countryName = async(req : Request, res : Response)=>{

    try {
        const response = await axios.get(`https://api.freecurrencyapi.com/v1/currencies?apikey=${API_KEY}`);
        return res.status(200).json({status : "OK" , data : response.data})
        
      } catch (error) {
        console.error(error);
        return res.status(500).json({error : 'Error fetching country currency list'});
      }
    return res.status(200).send({ status: "OK", message: "Converted" });

}

const currencyConverter = async(req : Request<QueryParams>, res : Response)=>{
    const { base_currency, currencies , type , date} = req.query;
    let currencyApi = `https://api.freecurrencyapi.com/v1/`;
    
    currencyApi += (type== 'latest') ? `latest?apikey=${API_KEY}&base_currency=${base_currency}&currencies=${currencies}`
                  : `historical?apikey=${API_KEY}&base_currency=${base_currency}&currencies=${currencies}&date=${date}`
    try {
      const response = await axios.get(`${currencyApi}`);
      return res.status(200).json({status : "OK" , data : response.data}); 
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({error : 'Error fetching currency data'});
    }

}

export default {countryName , currencyConverter}