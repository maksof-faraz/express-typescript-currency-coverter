import express, { Request, Response } from "express";

exports.convertCurrency = async(req : Request, res : Response)=>{
    return res.status(200).send({ status: "OK", message: "Converted" });

}