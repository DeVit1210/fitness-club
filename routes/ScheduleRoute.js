import {add, takePeriod} from "../controllers/ScheduleController.js";
import express from "express";

export const ScheduleRoute = express.Router();

ScheduleRoute.post('/add/:trainerId', add)
ScheduleRoute.post('/update', takePeriod);