import express, { Request, Response } from "express";
const app = express();


import currencyRoute from './routes/currency-routes';
app.use('/currency', currencyRoute);

export default app; 