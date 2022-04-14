import FindAllTodosService from "@modules/users/services/FindAllTodosService";
import UsersRepository from "@shared/infra/database/mongoose/repositories/implementations/UsersRepository";
import { Request, Response } from "express";

export default class TodosController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { username } = request.headers;

    const usersRepository = new UsersRepository();
    const findAllTodosService = new FindAllTodosService(usersRepository);

    const todos = await findAllTodosService.execute(String(username));

    return response.status(200).json(todos);
  }
}
