import * as userController from '../controller/userController.js';
import express from "express";

const userRoutes = express.Router();


userRoutes.post('/new', userController.register)


export default userRoutes;