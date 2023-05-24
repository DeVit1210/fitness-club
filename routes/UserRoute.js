import {register, login, update, findByUsername, findAll, find} from "../controllers/UserController.js";
import {findMembershipsWithStatus, changePassword} from "../controllers/UserController.js";
import express from "express";
export const UserRoute = express.Router();

UserRoute.post('/register', register);
UserRoute.post('/login', login);
UserRoute.post('/update', update);
UserRoute.get('/findByUsername', findByUsername);
UserRoute.get("/", findAll);
UserRoute.get('/find', find);
UserRoute.get('/findMemberships/:status', findMembershipsWithStatus)
UserRoute.post('/change-password', changePassword)
