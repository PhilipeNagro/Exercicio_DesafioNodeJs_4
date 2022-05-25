import todosRouter from "@modules/users/infra/http/routes/todos.routes";
import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import userRouter from "../../../../modules/users/infra/http/routes/users.routes";
import swaggerDocs from "../swagger.json";

const routes = Router();

routes.use("/users", userRouter);
routes.use("/todos", todosRouter);
routes.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default routes;
