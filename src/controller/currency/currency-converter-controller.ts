import express, { Request, Response } from "express";

const convertCurrency = async(req : Request, res : Response)=>{
    return res.status(200).send({ status: "OK", message: "Converted" });

}

const convertCurrency2 = async(req : Request, res : Response)=>{
    return res.status(200).send({ status: "OK", message: "Converted2" });

}

export default {convertCurrency , convertCurrency2}