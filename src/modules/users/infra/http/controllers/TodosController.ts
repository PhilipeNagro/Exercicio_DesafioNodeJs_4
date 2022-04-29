import CheckTodoService from "@modules/users/services/CheckTodoService";
import CreateTodoService from "@modules/users/services/CreateTodoService";
import FindAllTodosService from "@modules/users/services/FindAllTodosService";
import UpdateTodoService from "@modules/users/services/UpdateTodoService";
import UsersRepository from "@shared/infra/database/mongoose/repositories/implementations/UsersRepository";

import { Request, Response } from "express";

export default class TodosController {
  //
  public async delete(request: Request, response: Response) {
    const { username } = request.headers;
    const { id } = request.params;
    const usersRepository = new UsersRepository();
    // const deleteTodo = new DeleteTodoService(usersRepository);
  }

  public async updateCheck(request: Request, response: Response) {
    const { username } = request.headers;
    const { id } = request.params;
    const { done } = request.body;
    const usersRepository = new UsersRepository();
    const findTodoCheck = new CheckTodoService(usersRepository);
    const CheckTodo = await findTodoCheck.execute({
      username: String(username),
      id,
      done,
    });

    return response.status(200).json(CheckTodo);
  }

  public async update(request: Request, response: Response) {
    const { username } = request.headers;
    const { deadline, title } = request.body;
    const { id } = request.params;

    const usersRepository = new UsersRepository();
    const findTodo = new UpdateTodoService(usersRepository);
    const updateTodo = await findTodo.execute({
      username: String(username),
      title,
      deadline,
      id,
    });
    return response.status(200).json(updateTodo);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { username } = request.headers;

    const usersRepository = new UsersRepository();
    const findAllTodosService = new FindAllTodosService(usersRepository);

    const todos = await findAllTodosService.execute(String(username));

    return response.status(200).json(todos);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { username } = request.headers;
    const { deadline, title } = request.body;

    const usersRepository = new UsersRepository();
    const newTodo = new CreateTodoService(usersRepository);

    const todo = await newTodo.execute({
      username: String(username),
      deadline,
      title,
    });

    return response.status(200).json(todo);
  }
}
