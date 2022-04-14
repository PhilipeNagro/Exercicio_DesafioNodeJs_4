import todosRouter from "@modules/users/infra/http/routes/todos.routes";
import { Router } from "express";
import userRouter from "../../../../modules/users/infra/http/routes/users.routes";

const routes = Router();

routes.use("/users", userRouter);
routes.use("/todos", todosRouter);

export default routes;
