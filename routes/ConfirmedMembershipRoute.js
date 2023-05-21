import {add, findAll, findByType, findAllSorted} from "../controllers/ConfirmedMembershipController.js";
import {findBetweenWithTypeTotalValue, findWithUserAndType} from "../controllers/ConfirmedMembershipController.js";
import {findBetweenWithType, decreaseQuantity} from "../controllers/ConfirmedMembershipController.js";
import express from "express";
export const ConfirmedMembershipRoute = express.Router();

ConfirmedMembershipRoute.post('/add/:membershipId', add);
ConfirmedMembershipRoute.get('/', findAll);
ConfirmedMembershipRoute.get('/:type', findByType);
ConfirmedMembershipRoute.post("/", findAllSorted);
ConfirmedMembershipRoute.post("/filter", findBetweenWithType);
ConfirmedMembershipRoute.post("/total", findBetweenWithTypeTotalValue);
ConfirmedMembershipRoute.post('/find', findWithUserAndType);
ConfirmedMembershipRoute.put('/decrease', decreaseQuantity)