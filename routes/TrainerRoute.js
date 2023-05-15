import {find, add, findAll, destroy} from "../controllers/TrainerController.js";
import express from "express";

export const TrainerRoute = express.Router();

TrainerRoute.get("/", findAll);
TrainerRoute.get("/:id", find);
TrainerRoute.post("/add", add);
TrainerRoute.delete("/:id", destroy)