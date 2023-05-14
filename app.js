import express from "express";
import bodyParser from "body-parser";
import cors from "cors"

import {UserRoute} from "./routes/UserRoute.js";

import mongoose from "mongoose";
mongoose.connect('mongodb://127.0.0.1:27017/fitness-club-db');
const db = mongoose.connection;
db.on('error', (err) => {
    console.log(err);
})
db.once('open', () => {
    console.log("Database connection established!");
})

const app= express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(cors());

app.use('/user', UserRoute);

app.listen(8080, () => {
    console.log("Server is on!")
})

