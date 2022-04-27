import { Router } from "express";
import TodosController from "../controllers/TodosController";
import checksExistsUserAccount from "../middlewares/checksExistsUserAccount";

const todosRouter = Router();

const todosController = new TodosController();

todosRouter.get("/", checksExistsUserAccount, todosController.index);
todosRouter.post("/", checksExistsUserAccount, todosController.store);
// todosRouter.put("/:id", checksExistsUserAccount, todosController.newmetodo)
export default todosRouter;
