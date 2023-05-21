import express from "express";
import {findAll, add, destroy} from "../controllers/ConsultationController.js";

export const ConsultationRoute = express.Router();

ConsultationRoute.get('/', findAll);
ConsultationRoute.post('/add', add);
ConsultationRoute.delete('/:id', destroy);

