import {add, findAll, findByType} from "../controllers/ConfirmedMembershipController.js";
import express from "express";
export const ConfirmedMembershipRoute = express.Router();

ConfirmedMembershipRoute.post('/add/:membershipId', add);
ConfirmedMembershipRoute.get('/', findAll);
ConfirmedMembershipRoute.get('/:type', findByType);