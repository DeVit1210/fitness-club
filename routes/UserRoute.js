import {register, login, update, findByUsername, findAll} from "../controllers/UserController";
import express from "express";
export const UserRoute = express.Router();

UserRoute.post('/register', register);
UserRoute.post('/login', login);
UserRoute.post('/update', update);
UserRoute.get('/findByUsername', findByUsername);
UserRoute.get("/", findAll);
