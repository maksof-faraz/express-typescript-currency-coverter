import express, { Request, Response } from "express";
import axios from 'axios';
const cors = require('cors');
import dotenv from 'dotenv';

dotenv.config(); // Load .env file
import routes from './src/routes';

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

app.listen(PORT, () => {
  return console.log(`Server is listening on ${PORT}`)
})

module.exports = app;