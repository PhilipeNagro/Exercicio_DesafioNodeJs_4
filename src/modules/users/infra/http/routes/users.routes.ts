import { Router } from "express";
import UsersController from "../controllers/UsersController";

const userRouter = Router();
const usersController = new UsersController();

userRouter.post("/", usersController.store);

export default userRouter;
