import {register, login, update, findByUsername, findAll, findMemberships} from "../controllers/UserController.js";
import {findMembershipsWithStatus} from "../controllers/UserController.js";
import express from "express";
export const UserRoute = express.Router();

UserRoute.post('/register', register);
UserRoute.post('/login', login);
UserRoute.post('/update', update);
UserRoute.get('/findByUsername', findByUsername);
UserRoute.get("/", findAll);
UserRoute.get('/findMemberships', findMemberships)
UserRoute.get('/findMemberships/:status', findMembershipsWithStatus)
