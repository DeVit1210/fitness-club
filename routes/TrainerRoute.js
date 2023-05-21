import {find, add, findAll, destroy, update} from "../controllers/TrainerController.js";
import {getFreePeriods, getBusyPeriods, findDecreaseSort, findIncreaseSort} from "../controllers/TrainerController.js";
import express from "express";
import {upload} from "../functions/upload.js";

export const TrainerRoute = express.Router();

TrainerRoute.get("/", findAll);
TrainerRoute.get("/sorted/decrease", findDecreaseSort)
TrainerRoute.get("/sorted/increase", findIncreaseSort)
TrainerRoute.put('/:id', update)
TrainerRoute.get("/:id", find);
TrainerRoute.post("/add", upload.any(), add);
TrainerRoute.delete("/:id", destroy)
TrainerRoute.get('/periods/free', getFreePeriods);
TrainerRoute.get('/periods/busy', getBusyPeriods);