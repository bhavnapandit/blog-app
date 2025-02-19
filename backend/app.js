import express from "express";
import mongoose from "mongoose";
const app = express();

mongoose
    .connect(
        "mongodb+srv://admin:12345@cluster0.8cjrn.mongodb.net/Blog?retryWrites=true&w=majority"
    )
    .then(() => {
        app.listen(5000);
    })
    .then(() => {
        console.log("Connected to database");
    }).catch((err) => {
       console.log(err);
       
    });
