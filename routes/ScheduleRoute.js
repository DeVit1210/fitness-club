import {add, freePeriod, takePeriod} from "../controllers/ScheduleController.js";
import express from "express";

export const ScheduleRoute = express.Router();

ScheduleRoute.post('/add/:trainerId', add)

// TODO: check both following endpoints
ScheduleRoute.post('/update/take', takePeriod);
ScheduleRoute.post('/update/free', freePeriod);
