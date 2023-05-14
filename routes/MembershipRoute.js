import {findAll, add, findById, findByType, update, destroy} from "../controllers/MembershipController.js";
import express from "express";
import {Membership} from "../models/Membership.js";
export const MembershipRoute = express.Router();

MembershipRoute.post("/add/:type", add);
MembershipRoute.get("/", findAll);
MembershipRoute.get("/:id", findById);
MembershipRoute.get("/find/:type", findByType);
MembershipRoute.put("/:id", update);
MembershipRoute.delete("/:id", destroy)